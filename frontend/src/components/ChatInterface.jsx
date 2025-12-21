import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { send } from "../assets/icons";
import { man } from "../assets/images";

// Import the focus trap hook
import { useFocusTrap } from "../hooks";

// Import screen reader announcer
import { announceToScreenReader } from "../utils";
// Import API utility
import { getApiBaseUrl } from "../utils/api";

// Import the extracted components from the new ChatComponents folder
import MeResponse from "./ChatComponents/MeResponse";
import ProjectsResponse from "./ChatComponents/ProjectsResponse";
import SkillsResponse from "./ChatComponents/SkillsResponse";
import ExperienceResponse from "./ChatComponents/ExperienceResponse";
import ContactResponse from "./ChatComponents/ContactResponse";
import ResearchResponse from "./ChatComponents/ResearchResponse";
// Import the CSS file
import "./ChatInterface.css";

// Add CSS to hide scrollbar
const hideScrollbarStyles = `
  .chat-options-container::-webkit-scrollbar {
    display: none;
  }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.textContent = hideScrollbarStyles;
document.head.appendChild(styleSheet);

// Import images for experience logos
import {
  Turing,
  pi,
  bracu,
  craft,
  pranrfl
} from "../assets/images";

const ChatInterface = ({ isVisible, onClose }) => {
  const navigate = useNavigate();
  
  // Constants for animation delays (in milliseconds)
  const ANIMATION_DELAYS = useMemo(() => ({
    TYPING_INDICATOR_DOT_1: 200,     // 0.2s
    TYPING_INDICATOR_DOT_2: 400,     // 0.4s
    AI_RESPONSE_DELAY: 1000           // 1s
  }), []);
  
  const [message, setMessage] = useState("");
  
  // Custom setter with logging
  const setMessageWithLogging = useCallback((value) => {
    console.log('Setting message to:', value);
    setMessage(value);
  }, []);
  
  // Store the element that had focus before chat opened
  const previousFocusedElementRef = useRef(null);
  
  // Refs for handling async operations and preventing race conditions
  const isComponentMounted = useRef(true);
  const pendingOperations = useRef(new Set());
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]); // Store all messages in conversation
  const [chatStarted, setChatStarted] = useState(false); // Track if user has started chatting
  const [projects, setProjects] = useState([]);
  const [skillsCategories, setSkillsCategories] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projectsDescription, setProjectsDescription] = useState("");
  const [contactInfo, setContactInfo] = useState([]); // Store contact information
  const [researchWorks, setResearchWorks] = useState([]); // Store research works
  const [blogs, setBlogs] = useState([]); // Store blogs
  const [showOptions, setShowOptions] = useState(true); // Control visibility of options row
  const [focusedCardIndex, setFocusedCardIndex] = useState(-1); // Track focused card index for keyboard navigation
  const chatInputRef = useRef(null); // Ref for chat input field
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null); // Ref for the chat container

  // Use the focus trap hook with comprehensive focusable elements configuration
  const focusableElements = [
    'button:not([disabled]):not([aria-hidden="true"])',
    'input:not([disabled]):not([aria-hidden="true"])',
    'textarea:not([disabled]):not([aria-hidden="true"])',
    'select:not([disabled]):not([aria-hidden="true"])',
    'a[href]:not([aria-hidden="true"])',
    '[tabindex]:not([tabindex="-1"]):not([aria-hidden="true"])',
    '[contenteditable]:not([contenteditable="false"]):not([aria-hidden="true"])'
  ];
  const { containerRef } = useFocusTrap(isVisible, focusableElements); // Enable focus trap when chat is visible
  
  // Custom onClose handler that resets chat state
  const handleClose = useCallback(() => {
    // Reset chat started state when closing
    setChatStarted(false);
    // Call the original onClose function
    onClose();
  }, [onClose]);

  // Card data for quick actions
  const cards = useMemo(() => [
    { id: 1, title: "Me😄" },
    { id: 2, title: "Experience💼" },
    { id: 3, title: "Skills🛠️" },
    { id: 4, title: "Projects📒" },
    { id: 5, title: "Contact✉️" },
    { id: 6, title: "Research Work And Blogs📚" }
  ], []);

  // Map image names to actual image components for experiences
  const experienceImageMap = useMemo(() => ({
    pranrfl,
    craft,
    pi,
    bracu,
    Turing
  }), []);

  // Function to get image by name for experiences
  const getExperienceImageByName = useCallback((imageName) => {
    return experienceImageMap[imageName] || experienceImageMap['pranrfl']; // fallback to pranrfl if not found
  }, [experienceImageMap]);

  // Implement a simple in-memory cache for data
  const dataCache = useRef(new Map());
  const cacheTimeout = 5 * 60 * 1000; // 5 minutes cache timeout

  // Function to get data from cache or fetch new data
  const getCachedData = useCallback((key, fetchFn) => {
    const cached = dataCache.current.get(key);
    const now = Date.now();
    
    // If cached data exists and hasn't expired, return it
    if (cached && (now - cached.timestamp) < cacheTimeout) {
      return Promise.resolve(cached.data);
    }
    
    // Otherwise fetch new data
    return fetchFn().then(data => {
      // Cache the new data
      dataCache.current.set(key, {
        data,
        timestamp: now
      });
      return data;
    });
  }, []);

  // State for tracking data loading errors
  const [dataLoadingError, setDataLoadingError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);

  // Optimized data fetching with useCallback and caching
  const fetchData = useCallback(async (controller, isRetry = false) => {
    try {
      // Reset error state
      setDataLoadingError(null);
      if (isRetry) setIsRetrying(true);
      
      // Check if all data is already cached
      const allCached = 
        dataCache.current.has('projects') &&
        dataCache.current.has('projects-description') &&
        dataCache.current.has('skills-categories') &&
        dataCache.current.has('experiences') &&
        dataCache.current.has('contact-info') &&
        dataCache.current.has('research-works') &&
        dataCache.current.has('blogs');
      
      if (allCached) {
        // All data is cached, no need to fetch
        const cachedProjects = dataCache.current.get('projects').data;
        const cachedProjectsDescription = dataCache.current.get('projects-description').data;
        const cachedSkillsCategories = dataCache.current.get('skills-categories').data;
        const cachedExperiences = dataCache.current.get('experiences').data;
        const cachedContactInfo = dataCache.current.get('contact-info').data;
        const cachedResearchWorks = dataCache.current.get('research-works').data;
        const cachedBlogs = dataCache.current.get('blogs').data;
        
        // Check if component is still mounted before updating state
        if (isComponentMounted.current) {
          setProjects(cachedProjects);
          setProjectsDescription(cachedProjectsDescription.description);
          setSkillsCategories(cachedSkillsCategories);
          setExperiences(cachedExperiences);
          setContactInfo(cachedContactInfo);
          setResearchWorks(cachedResearchWorks);
          setBlogs(cachedBlogs);
        }
        
        if (isRetry) setIsRetrying(false);
        return;
      }

      // Fetch all data in parallel for better performance
      const baseUrl = getApiBaseUrl();
      const [
        projectsData,
        descriptionData,
        skillsCategoriesData,
        experiencesData,
        contactData,
        researchWorksData,
        blogsData
      ] = await Promise.all([
        getCachedData('projects', () => fetch(`${baseUrl}/api/data/projects`, { signal: controller.signal }).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status} ${res.statusText}`);
          return res.json();
        })),
        getCachedData('projects-description', () => fetch(`${baseUrl}/api/data/projects-description`, { signal: controller.signal }).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch projects description: ${res.status} ${res.statusText}`);
          return res.json();
        })),
        getCachedData('skills-categories', () => fetch(`${baseUrl}/api/data/skills-categories`, { signal: controller.signal }).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch skills categories: ${res.status} ${res.statusText}`);
          return res.json();
        })),
        getCachedData('experiences', () => fetch(`${baseUrl}/api/data/experiences`, { signal: controller.signal }).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch experiences: ${res.status} ${res.statusText}`);
          return res.json();
        })),
        getCachedData('contact-info', () => fetch(`${baseUrl}/api/data/contact-info`, { signal: controller.signal }).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch contact info: ${res.status} ${res.statusText}`);
          return res.json();
        })),
        getCachedData('research-works', () => fetch(`${baseUrl}/api/data/research-works`, { signal: controller.signal }).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch research works: ${res.status} ${res.statusText}`);
          return res.json();
        })),
        getCachedData('blogs', () => fetch(`${baseUrl}/api/data/blogs`, { signal: controller.signal }).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
          return res.json();
        }))
      ]);

      // Update state with fetched data
      // Check if component is still mounted before updating state
      if (isComponentMounted.current) {
        setProjects(projectsData);
        setProjectsDescription(descriptionData.description);
        setSkillsCategories(skillsCategoriesData);
        setExperiences(experiencesData);
        setContactInfo(contactData);
        setResearchWorks(researchWorksData);
        setBlogs(blogsData);
      }
      
      if (isRetry) setIsRetrying(false);
    } catch (error) {
      // Ignore abort errors as they're expected when component unmounts
      if (error.name !== 'AbortError') {
        console.error('Error fetching data:', error);
        // Update error state for UI feedback
        if (isComponentMounted.current) {
          setDataLoadingError('Failed to load portfolio data. Please check your network connection and try again.');
          if (isRetry) setIsRetrying(false);
        }
      }
    }
  }, [getCachedData]);

  useEffect(() => {
    if (!isVisible) return;

    let isMounted = true; // Flag to track component mount status
    const controller = new AbortController(); // For aborting fetch requests
    
    // Fetch data when chat becomes visible
    if (isMounted) {
      fetchData(controller, false);
    }
    
    // Cleanup function
    return () => {
      isMounted = false; // Set flag to false when component unmounts
      isComponentMounted.current = false; // Update ref for async operations
      controller.abort(); // Abort all pending fetch requests
    };
  }, [isVisible, fetchData]);

  // Handle keyboard navigation for quick action buttons
  const handleCardKeyDown = useCallback((event, card, index) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        const messageToSend = card.title === "Me😄" ? "Who is Ahib?" : 
                 card.title === "Experience💼" ? "Tell me about your work experience" :
                 card.title === "Skills🛠️" ? "What are your technical skills?" :
                 card.title === "Projects📒" ? "Show me your projects" :
                 card.title === "Contact✉️" ? "How can I contact you?" :
                 "Tell me about your research work and blogs";
        setMessage(messageToSend);
        const fakeEvent = { preventDefault: () => {} };
        handleSubmit(fakeEvent, messageToSend);
        // Focus management is now handled by the focus trap hook
        // The focus trap will automatically manage focus within the chat interface
        break;
      case 'ArrowRight':
        event.preventDefault();
        {
          const nextIndex = (index + 1) % cards.length;
          setFocusedCardIndex(nextIndex);
          // Focus management is now handled by the focus trap hook
          // The focus trap will automatically manage focus within the chat interface
        }
        break;
      case 'ArrowLeft':
        event.preventDefault();
        {
          const prevIndex = (index - 1 + cards.length) % cards.length;
          setFocusedCardIndex(prevIndex);
          // Focus management is now handled by the focus trap hook
          // The focus trap will automatically manage focus within the chat interface
        }
        break;
      case 'Escape':
        event.preventDefault();
        setFocusedCardIndex(-1);
        // Focus management is now handled by the focus trap hook
        // The focus trap will automatically manage focus within the chat interface
        break;
      case 'Tab':
        // Allow default tab behavior for focus navigation
        break;
      default:
        // Prevent default for other keys to avoid unexpected behavior
        event.preventDefault();
        break;
    }
  }, [cards]);

  // Scroll to bottom when messages change and handle showOptions/focus logic
  // Consolidated this effect with the screen reader effect to reduce re-renders
  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    
    // Handle showOptions and focus logic
    if (!isAiThinking) {
      setShowOptions(true);
      // Focus management is now handled by the focus trap hook
      // The focus trap will automatically manage focus within the chat interface
    }
    
    // Announce new messages to screen readers
    if (conversationHistory.length > 0) {
      const lastMessage = conversationHistory[conversationHistory.length - 1];
      if (lastMessage.type === 'ai') {
        announceToScreenReader(`AI assistant: ${lastMessage.content}`);
        
        // Additional announcement for special responses
        if (lastMessage.content === 'experience_response') {
          announceToScreenReader('Displaying work experience information.');
        } else if (lastMessage.content === 'skills_response') {
          announceToScreenReader('Displaying technical skills information.');
        } else if (lastMessage.content === 'me_response') {
          announceToScreenReader('Displaying personal information.');
        } else if (lastMessage.content === 'projects_response') {
          announceToScreenReader('Displaying projects information.');
        } else if (lastMessage.content === 'contact_response') {
          announceToScreenReader('Displaying contact information.');
        }
      } else {
        announceToScreenReader(`You: ${lastMessage.content}`);
      }
    }
  }, [conversationHistory, isAiThinking]); // Combined dependencies

  // Consolidated effect for card focus management and initial options display
  useEffect(() => {
    // Reset focused card index when options are hidden
    if (!showOptions) {
      // Only announce when options are actually hidden, not on every render
      if (focusedCardIndex !== -1) {
        setFocusedCardIndex(-1);
        announceToScreenReader('Quick action options hidden.', 'polite');
      }
      return;
    }
    
    // Focus the first card when options are shown and no card is currently focused
    if (showOptions && focusedCardIndex === -1 && cards.length > 0) {
      setFocusedCardIndex(0);
      // Focus management is now handled by the focus trap hook
      // The focus trap will automatically manage focus within the chat interface
      announceToScreenReader('Quick action options available. Use arrow keys to navigate between options.', 'polite');
    }
  }, [showOptions, focusedCardIndex, cards.length]); // Consolidated dependencies

  const handleSubmit = useCallback(async (e, messageOverride = null) => {
    e.preventDefault();
    const actualMessage = messageOverride !== null ? messageOverride : message;
    console.log('handleSubmit called with message:', actualMessage);
    if (actualMessage.trim()) {
      // Set chat started when user sends first message
      if (!chatStarted) {
        setChatStarted(true);
      }
      // Add user message to conversation history
      const userMessage = actualMessage.trim();
      setConversationHistory(prev => [...prev, { type: 'user', content: userMessage }]);
      // Hide options when user sends a message
      setShowOptions(false);
      
      // Announce user message
      announceToScreenReader(`You: ${userMessage}`, 'polite');
      
      // Convert to lowercase for easier matching
      const lowerMessage = userMessage.toLowerCase();
      
      // Enhanced experience detection logic (check this first to avoid conflicts)
      // Prioritize experience questions that contain specific key phrases
      const isExperienceQuestion = 
        lowerMessage.includes("work experience") ||
        lowerMessage.includes("work history") ||
        lowerMessage.includes("what experience does") ||
        lowerMessage.includes("what jobs have you") ||
        lowerMessage.includes("give me an overview of your work background") ||
        lowerMessage.includes("can you explain your professional background") ||
        lowerMessage.includes("how much experience does") ||
        lowerMessage.includes("tell me about the jobs you") ||
        lowerMessage.includes("can you talk about your past roles") ||
        lowerMessage.includes("what experience do you bring") ||
        lowerMessage.includes("what is your background in the tech industry") ||
        lowerMessage.includes("what professional journey") ||
        lowerMessage.includes("professional journey") ||
        (lowerMessage.includes("experience") && (
          lowerMessage.includes("ai") || 
          lowerMessage.includes("software") ||
          lowerMessage.includes("tech") ||
          lowerMessage.includes("industry") ||
          lowerMessage.includes("professional") ||
          lowerMessage.includes("career") ||
          lowerMessage.includes("job") ||
          lowerMessage.includes("worked") ||
          lowerMessage.includes("background") ||
          lowerMessage.includes("field") ||
          lowerMessage.includes("companies") ||
          lowerMessage.includes("positions") ||
          lowerMessage.includes("roles") ||
          lowerMessage.includes("past") ||
          lowerMessage.includes("previous") ||
          lowerMessage.includes("journey")
        )) ||
        lowerMessage.includes("what companies have you worked for") ||
        lowerMessage.includes("how experienced are you") ||
        lowerMessage.includes("what roles has") ||
        lowerMessage.includes("what positions has") ||
        lowerMessage.includes("where have you worked") ||
        lowerMessage.includes("tell me about your experience") ||
        // More flexible pattern matching for experience questions
        (lowerMessage.includes("tell me about") && lowerMessage.includes("experience")) ||
        (lowerMessage.includes("what is") && lowerMessage.includes("experience"));
      
      if (isExperienceQuestion) {
        setIsAiThinking(true);
        announceToScreenReader('AI assistant is thinking...', 'polite');
        
        // Set chat started when user asks about experience
        if (!chatStarted) {
          setChatStarted(true);
        }
        
        // Generate a unique ID for this operation to prevent race conditions
        const operationId = Date.now() + Math.random();
        pendingOperations.current.add(operationId);
        
        // Simulate AI thinking delay
        setTimeout(() => {
          // Check if component is still mounted and operation is still valid
          if (isComponentMounted.current && pendingOperations.current.has(operationId)) {
            setConversationHistory(prev => [...prev, { type: 'ai', content: 'experience_response' }]);
            setIsAiThinking(false);
            pendingOperations.current.delete(operationId);
          }
        }, ANIMATION_DELAYS.AI_RESPONSE_DELAY);
        // Clear input after submission
        setMessageWithLogging("");
        return;
      }
      
      // Enhanced skills detection logic (check this before about me to avoid conflicts)
      // Prioritize skills questions that contain specific key phrases
      const isSkillsQuestion = 
        lowerMessage.includes("technical skills") ||
        lowerMessage.includes("what skills") ||
        lowerMessage.includes("what are your skills") ||
        (lowerMessage.includes("your skills") && !lowerMessage.includes("projects") && !lowerMessage.includes("project")) ||
        lowerMessage.includes("skills does ahib have") ||
        lowerMessage.includes("tell me about your skills") ||
        lowerMessage.includes("technical abilities") ||
        lowerMessage.includes("what can you do in terms of skills") ||
        lowerMessage.includes("what programming skills") ||
        lowerMessage.includes("what development skills") ||
        lowerMessage.includes("what coding skills") ||
        lowerMessage.includes("software skills") ||
        lowerMessage.includes("ai/ml skills") ||
        lowerMessage.includes("technical areas are you skilled") ||
        lowerMessage.includes("technical expertise") ||
        lowerMessage.includes("skills have you developed") ||
        lowerMessage.includes("skills make you stand out") ||
        lowerMessage.includes("strongest technical abilities") ||
        lowerMessage.includes("skills do you bring") ||
        lowerMessage.includes("technical competencies") ||
        lowerMessage.includes("skill set do you offer") ||
        lowerMessage.includes("technologies are you skilled") ||
        lowerMessage.includes("practical skills") ||
        lowerMessage.includes("advanced skills") ||
        lowerMessage.includes("areas are you highly skilled") ||
        lowerMessage.includes("list your skills") ||
        lowerMessage.includes("specialized skills") ||
        lowerMessage.includes("what are your main skills") ||
        lowerMessage.includes("what skills are you good at") ||
        lowerMessage.includes("what tools and technologies") ||
        lowerMessage.includes("what are your core skills") ||
        lowerMessage.includes("what skills is ahib known for") ||
        lowerMessage.includes("strengths in tech") ||
        (lowerMessage.includes("skills") && !lowerMessage.includes("projects") && !lowerMessage.includes("project") && (
          lowerMessage.includes("ahib") || 
          lowerMessage.includes("technical") ||
          lowerMessage.includes("programming") ||
          lowerMessage.includes("development") ||
          lowerMessage.includes("coding") ||
          lowerMessage.includes("software") ||
          lowerMessage.includes("ai") ||
          lowerMessage.includes("ml") ||
          lowerMessage.includes("machine learning") ||
          lowerMessage.includes("expertise") ||
          lowerMessage.includes("abilities") ||
          lowerMessage.includes("competencies") ||
          lowerMessage.includes("strengths") ||
          lowerMessage.includes("tools") ||
          lowerMessage.includes("technologies") ||
          lowerMessage.includes("practical") ||
          lowerMessage.includes("advanced") ||
          lowerMessage.includes("specialized") ||
          lowerMessage.includes("core") ||
          lowerMessage.includes("main")
        )) ||
        (lowerMessage.includes("expertise") && (
          lowerMessage.includes("ahib") || 
          lowerMessage.includes("technical") ||
          lowerMessage.includes("domain") ||
          lowerMessage.includes("area")
        )) ||
        // Exclude project-related skills questions
        (lowerMessage.includes("skills") && !lowerMessage.includes("projects") && !lowerMessage.includes("project") && lowerMessage.includes("expertise")) ||
        // More flexible pattern matching for skills questions
        (lowerMessage.includes("tell me about") && lowerMessage.includes("skills")) ||
        (lowerMessage.includes("what are") && lowerMessage.includes("skills")) ||
        // Exclude any skills question that also mentions projects
        false;
      
      if (isSkillsQuestion) {
        setIsAiThinking(true);
        announceToScreenReader('AI assistant is thinking...', 'polite');
        
        // Set chat started when user asks about skills
        if (!chatStarted) {
          setChatStarted(true);
        }
        
        // Generate a unique ID for this operation to prevent race conditions
        const operationId = Date.now() + Math.random();
        pendingOperations.current.add(operationId);
        
        // Simulate AI thinking delay
        setTimeout(() => {
          // Check if component is still mounted and operation is still valid
          if (isComponentMounted.current && pendingOperations.current.has(operationId)) {
            setConversationHistory(prev => [...prev, { type: 'ai', content: 'skills_response' }]);
            setIsAiThinking(false);
            pendingOperations.current.delete(operationId);
          }
        }, ANIMATION_DELAYS.AI_RESPONSE_DELAY);
        // Clear input after submission
        setMessageWithLogging("");
        return;
      }
      
      // Research work and blogs detection logic (check this before about me to avoid conflicts)
      const isResearchAndBlogsQuestion = 
        lowerMessage.includes("research work") ||
        lowerMessage.includes("research papers") ||
        lowerMessage.includes("academic research") ||
        lowerMessage.includes("blogs") ||
        lowerMessage.includes("blog posts") ||
        lowerMessage.includes("blog articles") ||
        lowerMessage.includes("publications") ||
        lowerMessage.includes("papers") ||
        lowerMessage.includes("research") ||
        lowerMessage.includes("academic work") ||
        (lowerMessage.includes("research") && lowerMessage.includes("work")) ||
        (lowerMessage.includes("blog") && lowerMessage.includes("writing")) ||
        lowerMessage.includes("tell me about your research work and blogs") ||
        // More flexible pattern matching for research and blogs questions
        (lowerMessage.includes("tell me about") && (lowerMessage.includes("research") || lowerMessage.includes("blogs"))) ||
        (lowerMessage.includes("show me") && (lowerMessage.includes("research") || lowerMessage.includes("blogs"))) ||
        (lowerMessage.includes("what") && (lowerMessage.includes("research") || lowerMessage.includes("blogs")));

      if (isResearchAndBlogsQuestion) {
        setIsAiThinking(true);
        announceToScreenReader('AI assistant is thinking...', 'polite');
        
        // Set chat started when user asks about research and blogs
        if (!chatStarted) {
          setChatStarted(true);
        }
        
        // Generate a unique ID for this operation to prevent race conditions
        const operationId = Date.now() + Math.random();
        pendingOperations.current.add(operationId);
        
        // Simulate AI thinking delay
        setTimeout(() => {
          // Check if component is still mounted and operation is still valid
          if (isComponentMounted.current && pendingOperations.current.has(operationId)) {
            setConversationHistory(prev => [...prev, { type: 'ai', content: 'research_response' }]);
            setIsAiThinking(false);
            pendingOperations.current.delete(operationId);
          }
        }, ANIMATION_DELAYS.AI_RESPONSE_DELAY);
        // Clear input after submission
        setMessageWithLogging("");
        return;
      }
      
      // More comprehensive pattern matching for identity questions (check after experience and skills)
      const identityKeywords = ['ahib', 'afnan', 'siam', 'ahib afnan', 'ahib afnan siam'];
      const questionPatterns = [
        'who is', 'tell me about', 'what can you tell me about', 'give me a', 'describe',
        'introduce', 'identify', 'explain', 'who exactly is', 'what is the story',
        'short intro', 'quick summary', 'basic information', 'know about'
      ];
      
      // Check if message contains any identity keywords
      const hasIdentityKeyword = identityKeywords.some(keyword => lowerMessage.includes(keyword));
      
      // Check if message matches question patterns
      const hasQuestionPattern = questionPatterns.some(pattern => lowerMessage.includes(pattern));
      
      // Direct identity questions
      const directQuestions = [
        'me', 'about me', 'about ahib', 'who is this', 'tell me who'
      ];
      
      const isDirectQuestion = directQuestions.some(q => lowerMessage.includes(q));
      
      // Special cases
      const isSpecialCase = 
        lowerMessage.includes('should i know') && hasIdentityKeyword ||
        lowerMessage.includes('kind of person') && hasIdentityKeyword ||
        lowerMessage.includes('sentence') && hasIdentityKeyword ||
        lowerMessage.includes('identity') && hasIdentityKeyword;
      
      // Prevent false positives for project-related questions
      const isProjectQuestion = (lowerMessage.includes('project') || lowerMessage.includes('projects')) && !lowerMessage.includes('ahib');
      
      const isAboutMeQuestion = 
        userMessage === "Me😄" ||
        (hasQuestionPattern && hasIdentityKeyword && !isProjectQuestion) ||
        (isDirectQuestion && !isProjectQuestion) ||
        (isSpecialCase && !isProjectQuestion) ||
        // Handle variations with spaces and punctuation
        (lowerMessage.replace(/[^a-z0-9]/g, '').includes('ahib') && (
          lowerMessage.includes('who') || lowerMessage.includes('about') || 
          lowerMessage.includes('intro') || lowerMessage.includes('summary')
        ) && !isProjectQuestion) ||
        // More flexible pattern matching for about me questions
        (lowerMessage.includes("tell me about") && (lowerMessage.includes("you") || lowerMessage.includes("yourself"))) ||
        (lowerMessage.includes("who are you")) ||
        (lowerMessage.includes("introduce yourself"));
      
      if (isAboutMeQuestion) {
        setIsAiThinking(true);
        announceToScreenReader('AI assistant is thinking...', 'polite');
        
        // Set chat started when user asks about me
        if (!chatStarted) {
          setChatStarted(true);
        }
        
        // Generate a unique ID for this operation to prevent race conditions
        const operationId = Date.now() + Math.random();
        pendingOperations.current.add(operationId);
        
        // Simulate AI thinking delay
        setTimeout(() => {
          // Check if component is still mounted and operation is still valid
          if (isComponentMounted.current && pendingOperations.current.has(operationId)) {
            setConversationHistory(prev => [...prev, { type: 'ai', content: 'me_response' }]);
            setIsAiThinking(false);
            pendingOperations.current.delete(operationId);
          }
        }, ANIMATION_DELAYS.AI_RESPONSE_DELAY);
        // Clear input after submission
        setMessageWithLogging("");
        return;
      }
      
      // Enhanced projects detection logic (check this before about me to avoid conflicts)
      // Prioritize projects questions that contain specific key phrases
      const isProjectsQuestion = 
        lowerMessage.includes("what projects have you worked on") ||
        lowerMessage.includes("can you show me your projects") ||
        lowerMessage.includes("tell me about your projects") ||
        lowerMessage.includes("what major projects have you done") ||
        lowerMessage.includes("what kind of projects have you worked on") ||
        lowerMessage.includes("can you list your past projects") ||
        lowerMessage.includes("what are your main projects") ||
        lowerMessage.includes("which projects have you completed") ||
        lowerMessage.includes("what projects are you working on now") ||
        lowerMessage.includes("what notable projects have you done") ||
        lowerMessage.includes("show me a list of your projects") ||
        lowerMessage.includes("show me your projects") ||
        lowerMessage.includes("describe your projects") ||
        lowerMessage.includes("what types of projects have you built") ||
        lowerMessage.includes("what programming projects have you done") ||
        lowerMessage.includes("what ai projects have you completed") ||
        lowerMessage.includes("what web development projects have you done") ||
        lowerMessage.includes("what are your ongoing projects") ||
        lowerMessage.includes("what important projects have you worked on") ||
        lowerMessage.includes("which of your projects are relevant to ai") ||
        (lowerMessage.includes("which of your projects demonstrate your skills") && !lowerMessage.includes("what skills")) ||
        lowerMessage.includes("give me a summary of your projects") ||
        lowerMessage.includes("can you share details about your projects") ||
        lowerMessage.includes("what are the notable features of your projects") ||
        lowerMessage.includes("which projects have you done during your studies") ||
        lowerMessage.includes("what personal projects have you built") ||
        lowerMessage.includes("which projects have you done professionally") ||
        lowerMessage.includes("what side-projects do you have") ||
        lowerMessage.includes("what portfolio projects have you built") ||
        lowerMessage.includes("what are your favorite projects you worked on") ||
        lowerMessage.includes("show me your best projects") ||
        (lowerMessage.includes("projects") && !lowerMessage.includes("skills") && (
          lowerMessage.includes("ahib") || 
          lowerMessage.includes("major") ||
          lowerMessage.includes("notable") ||
          lowerMessage.includes("important") ||
          lowerMessage.includes("significant") ||
          lowerMessage.includes("key") ||
          lowerMessage.includes("main") ||
          lowerMessage.includes("favorite") ||
          lowerMessage.includes("best") ||
          lowerMessage.includes("personal") ||
          lowerMessage.includes("professional") ||
          lowerMessage.includes("portfolio") ||
          lowerMessage.includes("side") ||
          lowerMessage.includes("web") ||
          lowerMessage.includes("ai") ||
          lowerMessage.includes("machine learning") ||
          lowerMessage.includes("programming") ||
          lowerMessage.includes("built") ||
          lowerMessage.includes("completed") ||
          lowerMessage.includes("done") ||
          lowerMessage.includes("working on") ||
          lowerMessage.includes("developed")
        )) ||
        (lowerMessage.includes("project") && !lowerMessage.includes("skills") && (
          lowerMessage.includes("ahib") || 
          lowerMessage.includes("major") ||
          lowerMessage.includes("notable") ||
          lowerMessage.includes("important") ||
          lowerMessage.includes("significant") ||
          lowerMessage.includes("key") ||
          lowerMessage.includes("main") ||
          lowerMessage.includes("favorite") ||
          lowerMessage.includes("best") ||
          lowerMessage.includes("personal") ||
          lowerMessage.includes("professional") ||
          lowerMessage.includes("portfolio") ||
          lowerMessage.includes("side") ||
          lowerMessage.includes("web") ||
          lowerMessage.includes("ai") ||
          lowerMessage.includes("machine learning") ||
          lowerMessage.includes("programming") ||
          lowerMessage.includes("built") ||
          lowerMessage.includes("completed") ||
          lowerMessage.includes("done") ||
          lowerMessage.includes("working on") ||
          lowerMessage.includes("developed")
        )) ||
        // More flexible pattern matching for projects questions
        (lowerMessage.includes("tell me about") && (lowerMessage.includes("projects") || lowerMessage.includes("project"))) ||
        (lowerMessage.includes("show me") && (lowerMessage.includes("projects") || lowerMessage.includes("project")));
      
      if (isProjectsQuestion) {
        setIsAiThinking(true);
        announceToScreenReader('AI assistant is thinking...', 'polite');
        
        // Set chat started when user asks about projects
        if (!chatStarted) {
          setChatStarted(true);
        }
        
        // Generate a unique ID for this operation to prevent race conditions
        const operationId = Date.now() + Math.random();
        pendingOperations.current.add(operationId);
        
        // Simulate AI thinking delay
        setTimeout(() => {
          // Check if component is still mounted and operation is still valid
          if (isComponentMounted.current && pendingOperations.current.has(operationId)) {
            setConversationHistory(prev => [...prev, { type: 'ai', content: 'projects_response' }]);
            setIsAiThinking(false);
            pendingOperations.current.delete(operationId);
          }
        }, ANIMATION_DELAYS.AI_RESPONSE_DELAY);
        // Clear input after submission
        setMessageWithLogging("");
        return;
      }
      
      // Enhanced contact information detection logic (check this before about me to avoid conflicts)
      // Prioritize contact info questions that contain specific key phrases
      const isContactInfoQuestion = 
        lowerMessage.includes("how can i contact you") ||
        lowerMessage.includes("what’s the best way to reach you") ||
        lowerMessage.includes("how do i get in touch with you") ||
        lowerMessage.includes("what is your contact information") ||
        lowerMessage.includes("how can someone contact ahib") ||
        lowerMessage.includes("do you have an email i can use to reach you") ||
        lowerMessage.includes("how can i message you") ||
        lowerMessage.includes("what’s your email address") ||
        lowerMessage.includes("what is the best way to contact ahib") ||
        lowerMessage.includes("how can i communicate with you") ||
        lowerMessage.includes("how do i reach out to you") ||
        lowerMessage.includes("what contact options do you offer") ||
        lowerMessage.includes("what’s the easiest way to contact you") ||
        lowerMessage.includes("how can i send you a message") ||
        lowerMessage.includes("how do i get in touch with ahib") ||
        lowerMessage.includes("can you share your contact details") ||
        lowerMessage.includes("how can i talk to you directly") ||
        lowerMessage.includes("how can someone connect with you") ||
        lowerMessage.includes("what’s your preferred contact method") ||
        lowerMessage.includes("do you have social media for contact") ||
        lowerMessage.includes("where can i contact you online") ||
        lowerMessage.includes("is there any way to reach you professionally") ||
        lowerMessage.includes("how can i contact you for work") ||
        lowerMessage.includes("how can i contact you for collaboration") ||
        lowerMessage.includes("how can a client reach you") ||
        lowerMessage.includes("what’s your official contact info") ||
        lowerMessage.includes("where should i send inquiries") ||
        lowerMessage.includes("how can i get your contact") ||
        lowerMessage.includes("how can i contact you personally") ||
        lowerMessage.includes("what is ahib’s contact info") ||
        (lowerMessage.includes("contact") && (
          lowerMessage.includes("ahib") || 
          lowerMessage.includes("reach") ||
          lowerMessage.includes("touch") ||
          lowerMessage.includes("information") ||
          lowerMessage.includes("email") ||
          lowerMessage.includes("message") ||
          lowerMessage.includes("communicate") ||
          lowerMessage.includes("connect") ||
          lowerMessage.includes("options") ||
          lowerMessage.includes("social") ||
          lowerMessage.includes("online") ||
          lowerMessage.includes("professionally") ||
          lowerMessage.includes("work") ||
          lowerMessage.includes("collaboration") ||
          lowerMessage.includes("client") ||
          lowerMessage.includes("official") ||
          lowerMessage.includes("inquiries") ||
          lowerMessage.includes("personally")
        )) ||
        (lowerMessage.includes("how can i") && (
          lowerMessage.includes("contact") || 
          lowerMessage.includes("reach") ||
          lowerMessage.includes("message") ||
          lowerMessage.includes("communicate") ||
          lowerMessage.includes("talk") ||
          lowerMessage.includes("send") ||
          lowerMessage.includes("get")
        )) ||
        // More flexible pattern matching for contact questions
        (lowerMessage.includes("how") && lowerMessage.includes("contact")) ||
        (lowerMessage.includes("contact") && lowerMessage.includes("info")) ||
        (lowerMessage.includes("contact") && lowerMessage.includes("details"));

      if (isContactInfoQuestion) {
        setIsAiThinking(true);
        announceToScreenReader('AI assistant is thinking...', 'polite');
        
        // Set chat started when user asks for contact info
        if (!chatStarted) {
          setChatStarted(true);
        }
        
        // Generate a unique ID for this operation to prevent race conditions
        const operationId = Date.now() + Math.random();
        pendingOperations.current.add(operationId);
        
        // Simulate AI thinking delay
        setTimeout(() => {
          // Check if component is still mounted and operation is still valid
          if (isComponentMounted.current && pendingOperations.current.has(operationId)) {
            setConversationHistory(prev => [...prev, { type: 'ai', content: 'contact_response' }]);
            setIsAiThinking(false);
            pendingOperations.current.delete(operationId);
          }
        }, ANIMATION_DELAYS.AI_RESPONSE_DELAY);
        // Clear input after submission
        setMessageWithLogging("");
        return;
      }
      
      // For other messages, call the AI API
      try {
        setIsAiThinking(true);
        announceToScreenReader('AI assistant is thinking...', 'polite');
        
        // Send message to backend AI API
        const baseUrl = getApiBaseUrl();
        const response = await fetch(`${baseUrl}/api/ai/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Set chat started when AI responds
          if (!chatStarted) {
            setChatStarted(true);
          }
          // Check if component is still mounted before updating state
          if (isComponentMounted.current) {
            setConversationHistory(prev => [...prev, { type: 'ai', content: data.response }]);
          }
        } else {
          // Set chat started even if there's an error
          if (!chatStarted) {
            setChatStarted(true);
          }
          // Check if component is still mounted before updating state
          if (isComponentMounted.current) {
            setConversationHistory(prev => [...prev, { type: 'ai', content: `Error: ${data.message || 'Unknown error occurred'}` }]);
          }
        }
      } catch (error) {
        console.error('Error sending message to AI:', error);
        // Check if component is still mounted before updating state
        if (isComponentMounted.current) {
          let errorMessage = 'Sorry, I encountered an error while processing your request.';
          
          // Provide more specific error messages based on error type
          if (error instanceof TypeError && error.message.includes('fetch')) {
            errorMessage += ' Please check your network connection and try again.';
          } else if (error.name === 'AbortError') {
            errorMessage += ' The request timed out. Please try again.';
          } else {
            errorMessage += ' Please try again later.';
          }
          
          setConversationHistory(prev => [...prev, { type: 'ai', content: errorMessage }]);
        }
      } finally {
        // Check if component is still mounted before updating state
        if (isComponentMounted.current) {
          setIsAiThinking(false);
          setShowOptions(true); // Show options again after AI response
          // Clear input after submission
          setMessageWithLogging("");
          // Focus management is now handled by the focus trap hook
          // The focus trap will automatically manage focus within the chat interface
        }
      }
    }
  }, [message, ANIMATION_DELAYS]);

  // Handle click outside to close chat and focus management
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isVisible && event.target.classList.contains('chat-overlay')) {
        // Check if the click is actually on the overlay background, not on child elements
        // Also ensure we're not clicking on interactive elements
        if (event.target === event.currentTarget) {
          console.log('Click outside detected');
          // Only close chat if it hasn't started or if it has started and user explicitly allows closing
          if (!chatStarted) {
            console.log('Chat not started, closing chat');
            handleClose();
          } else {
            console.log('Chat started, ignoring background click');
            // Do nothing - chat has started so background click should not close it
          }
        }
      }
    };

    const handleEscapeKey = (event) => {
      if (isVisible && event.key === 'Escape') {
        console.log('Escape key pressed, closing chat');
        handleClose();
      }
    };

    // Focus management when chat opens/closes
    if (isVisible) {
      // Store the element that had focus before chat opened
      previousFocusedElementRef.current = document.activeElement;
      
      // Announce that chat is open
      announceToScreenReader('Chat interface opened. Type your message or use the quick action buttons.', 'polite');
      
      // Show options when chat interface becomes visible
      setShowOptions(true);
          // Focus the chat input field when chat opens
      // This initial focus is complementary to the focus trap and helps with accessibility
      if (chatInputRef.current) {
        requestAnimationFrame(() => {
          if (chatInputRef.current && document.activeElement !== chatInputRef.current) {
            chatInputRef.current.focus();
          }
        });
      }
    } else {
      // Announce that chat is closed
      announceToScreenReader('Chat interface closed.', 'polite');
      
      // Return focus to the element that had focus before chat opened
      // This focus restoration complements the focus trap by properly managing focus
      // when the chat interface is closed
      if (previousFocusedElementRef.current) {
        previousFocusedElementRef.current.focus();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  // Create portal to render outside of Three.js context
  const chatElement = (
    <div 
      ref={(el) => {
        containerRef.current = el;
        chatContainerRef.current = el;
      }}
      className="chat-overlay fixed inset-0 z-50"
      onMouseDown={(e) => {
        // Only stop propagation for clicks directly on the overlay (background)
        // This prevents closing the chat when interacting with child elements
        if (e.target === e.currentTarget) {
          e.stopPropagation();
        }
      }}
      onKeyPress={(e) => {
        // Only stop propagation for keys directly on the overlay
        if (e.target === e.currentTarget) {
          e.stopPropagation();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-title"
      tabIndex="-1"
    >
      <h2 id="chat-title" className="sr-only">AI Chat Assistant</h2>
      
      {/* Semi-transparent overlay with reduced blur for better accessibility */}
      <div className="fixed inset-0 bg-white/20 z-30 opacity-100" style={{ backdropFilter: 'blur(5px)' }}></div>
      
      {/* Home button at top-left corner */}
      <button 
        onClick={() => {
          console.log('Home button clicked');
          // Navigate to homepage using SPA navigation
          navigate('/');
          // Close chat after navigation
          handleClose();
        }}
        className="absolute top-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
        style={{ opacity: 1 }}
        aria-label="Return to homepage"
        role="button"
        aria-controls="chat-container"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </button>
      
      {/* Chat bubbles container with scrolling - expanded area with no header line */}
      <div 
        id="chat-container"
        className="absolute top-16 left-0 right-0 bottom-40 z-40 overflow-y-auto px-4 py-2"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        <div className="max-w-2xl mx-auto">
          {/* Display data loading error if present */}
          {dataLoadingError && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="font-bold">Error Loading Data</p>
              <p>{dataLoadingError}</p>
              <button 
                onClick={() => {
                  if (!isRetrying) {
                    const controller = new AbortController();
                    fetchData(controller, true);
                  }
                }}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={isRetrying}
                aria-label="Retry loading portfolio data"
                role="button"
                aria-disabled={isRetrying}
              >
                {isRetrying ? 'Retrying...' : 'Try Again'}
              </button>
            </div>
          )}
          
          {/* Render conversation history */}
          {conversationHistory.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`} 
              style={{ opacity: 1 }}
              role="article"
              aria-label={`${msg.type === 'user' ? 'User message' : 'AI assistant message'}`}
            >
              {msg.type === 'ai' && (
                <div className="flex-shrink-0 mr-3" style={{ opacity: 1 }}>
                  <img src={man} alt="AI Assistant" className="w-10 h-10 rounded-full object-cover" />
                </div>
              )}
              <div 
                className={`${msg.type === 'user' ? 'bg-blue-500 text-white rounded-lg rounded-br-none max-w-full inline-block break-words whitespace-normal' : 'bg-white text-gray-800 rounded-lg rounded-bl-none w-full'} py-2 px-4 max-w-4xl shadow`} 
                style={{ opacity: 1 }}
                role="presentation"
              >
                {msg.content === 'me_response' ? (
                  <MeResponse />
                ) : msg.content === 'projects_response' ? (
                  <ProjectsResponse projects={projects} projectsDescription={projectsDescription} />
                ) : msg.content === 'skills_response' ? (
                  <SkillsResponse skillsCategories={skillsCategories} ANIMATION_DELAYS={ANIMATION_DELAYS} />
                ) : msg.content === 'experience_response' ? (
                  <ExperienceResponse experiences={experiences} getExperienceImageByName={getExperienceImageByName} />
                ) : msg.content === 'contact_response' ? (
                  <ContactResponse contactInfo={contactInfo} />
                ) : msg.content === 'research_response' ? (
                  <ResearchResponse researchWorks={researchWorks} blogs={blogs} />
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
              {msg.type === 'user' && (
                <div className="flex-shrink-0 ml-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    U
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* AI Thinking indicator - dynamic width with max constraints, shifted closer to left */}
          {isAiThinking && (
            <div 
              className="mb-4 flex justify-start" 
              style={{ opacity: 1, transform: 'scale(1)' }}
              role="status"
              aria-live="polite"
            >
              <div className="flex-shrink-0 mr-3" style={{ opacity: 1, transform: 'translateX(0)' }}>
                <img src={man} alt="AI Assistant" className="w-10 h-10 rounded-full object-cover" />
              </div>
              <div className='bg-white text-gray-800 rounded-lg rounded-bl-none py-2 px-4 max-w-4xl w-full shadow' style={{ opacity: 1, transform: 'translateX(0)' }}>
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2" role="img" aria-label="Thinking indicator"></div>
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Options row - appears right above input box */}
      <div 
        className="absolute bottom-24 left-0 right-0 flex justify-center items-center z-40 px-4" 
        style={{ height: '70px', overflow: 'visible', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '5px 0' }}
        role="region"
        aria-label="Quick action options"
      >
        <div 
          className="flex justify-center items-center gap-3 w-full max-w-4xl overflow-x-auto chat-options-container"
          style={{
            opacity: showOptions ? 1 : 0,
            transform: showOptions ? 'translateY(0)' : 'translateY(20px)',
            
            pointerEvents: showOptions ? 'auto' : 'none',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            willChange: 'opacity, transform',
            height: '100%'
          }}
          role="group"
          aria-label="Chat options"
        >
          {cards.map((card, index) => (
            <button
              key={card.id}
              className={`bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg shadow-md ${focusedCardIndex === index ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
              style={{
                opacity: showOptions ? 1 : 0,
                transform: showOptions ? 'translateY(0)' : 'translateY(20px)',
                willChange: 'opacity, transform',
                backfaceVisibility: 'hidden',
                // Maintain visibility for screen readers even when visually hidden
                visibility: showOptions ? 'visible' : 'hidden'
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const messageToSend = card.title === "Me😄" ? "Who is Ahib?" : 
                         card.title === "Experience💼" ? "Tell me about your work experience" :
                         card.title === "Skills🛠️" ? "What are your technical skills?" :
                         card.title === "Projects📒" ? "Show me your projects" :
                         card.title === "Contact✉️" ? "How can I contact you?" :
                         "Tell me about your research work and blogs";
                setMessageWithLogging(messageToSend);
                const fakeEvent = { preventDefault: () => {}, stopPropagation: () => {} };
                handleSubmit(fakeEvent, messageToSend);
                // Focus management is now handled by the focus trap hook
                // The focus trap will automatically manage focus within the chat interface
              }}
              onKeyDown={(event) => handleCardKeyDown(event, card, index)}
              onFocus={() => {
                // Set focused card index immediately
                setFocusedCardIndex(index);
              }}
              // Removed onBlur handler to prevent infinite loop
              aria-label={`Select option: ${card.title}`}
              tabIndex={showOptions ? 0 : -1} // Make buttons tabbable only when visible
              data-chat-card-button="true"
              role="button"
              aria-pressed={focusedCardIndex === index}
            >
              {card.title}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Box */}
      <div 
        className='absolute bottom-12 right-0 left-0 flex justify-center items-center z-40 px-4' 
        style={{ opacity: 1 }}
        role="region"
        aria-label="Message input area"
      >
        <div className='flex items-center w-full max-w-2xl'>
          <input
            ref={chatInputRef}
            type='text'
            value={message}
            onChange={(e) => {
              console.log('Chat input change event:', e.target.value);
              setMessageWithLogging(e.target.value);
            }}
            onBlur={() => {
              console.log('Chat input blurred');
              // Don't close the chat when the input loses focus
              // The chat should only close when explicitly closed by the user
            }}
            onKeyDown={(e) => {
              console.log('Key down event:', e.key);
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder='Ask me anything...'
            className='flex-grow py-3 px-4 rounded-l-lg border-0 focus:ring-2 focus:ring-blue-500 bg-white/90 shadow-lg'
            aria-label="Type your message here"
            aria-describedby="input-description"
            role="textbox"
            aria-multiline="false"
          />
          <div id="input-description" className="sr-only">Press Enter to send your message</div>
          <button
            type='button'
            className='bg-blue-600 hover:bg-blue-700 py-4 px-6 rounded-r-lg focus:outline-none focus:ring-0 shadow-lg'
            disabled={isAiThinking}
            aria-label="Send message"
            onClick={(e) => handleSubmit(e)}
            role="button"
            aria-disabled={isAiThinking}
          >
            {isAiThinking ? (
              <div 
                className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"
                role="img"
                aria-label="Sending message"
              ></div>
            ) : (
              <img src={send} alt='send' className='w-5 h-5 filter invert' />
            )}
          </button>
        </div>
      </div>
    </div>
  );
  
  // Use portal to render outside of Three.js context
  return createPortal(chatElement, document.body);
};

export default ChatInterface;