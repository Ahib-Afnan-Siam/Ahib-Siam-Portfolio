const path = require('path');
const fs = require('fs').promises;

// Helper function to read JSON files
const readDataFile = async (filename) => {
  try {
    const filePath = path.join(__dirname, '../data', filename);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    throw error;
  }
};

// Helper function to read Markdown files
const readMarkdownFile = async (filename) => {
  try {
    const filePath = path.join(__dirname, '../data', filename);
    const data = await fs.readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    throw error;
  }
};

// Get experiences data
const getExperiences = async (req, res) => {
  try {
    const experiences = await readDataFile('experiences.json');
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experiences data', error: error.message });
  }
};

// Get achievements data
const getAchievements = async (req, res) => {
  try {
    const achievements = await readDataFile('achievements.json');
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching achievements data', error: error.message });
  }
};

// Get projects data
const getProjects = async (req, res) => {
  try {
    const projects = await readDataFile('projects.json');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects data', error: error.message });
  }
};

// Get projects description
const getProjectsDescription = async (req, res) => {
  try {
    const description = await readMarkdownFile('projectsDescription.md');
    res.status(200).json({ description });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects description', error: error.message });
  }
};

// Get skills data
const getSkills = async (req, res) => {
  try {
    const skills = await readDataFile('skills.json');
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills data', error: error.message });
  }
};

// Get skills categories data
const getSkillsCategories = async (req, res) => {
  try {
    const skillsCategories = await readDataFile('skillsCategories.json');
    res.status(200).json(skillsCategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills categories data', error: error.message });
  }
};

// Get extracurricular activities data
const getExtracurricularActivities = async (req, res) => {
  try {
    const activities = await readDataFile('extracurricularActivities.json');
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching extracurricular activities data', error: error.message });
  }
};

// Get certificates data
const getCertificates = async (req, res) => {
  try {
    const certificates = await readDataFile('certificates.json');
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certificates data', error: error.message });
  }
};

// Get social links data
const getSocialLinks = async (req, res) => {
  try {
    const socialLinks = await readDataFile('socialLinks.json');
    res.status(200).json(socialLinks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching social links data', error: error.message });
  }
};

// Get contact information
const getContactInfo = async (req, res) => {
  try {
    const contactInfo = await readDataFile('contactInfo.json');
    res.status(200).json(contactInfo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact information', error: error.message });
  }
};

// Get research works data
const getResearchWorks = async (req, res) => {
  try {
    const researchWorks = await readDataFile('researchWorks.json');
    res.status(200).json(researchWorks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching research works data', error: error.message });
  }
};

// Get blogs data
const getBlogs = async (req, res) => {
  try {
    const blogs = await readDataFile('blogs.json');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs data', error: error.message });
  }
};
module.exports = {
  getExperiences,
  getAchievements,
  getProjects,
  getProjectsDescription,
  getSkills,
  getSkillsCategories,
  getExtracurricularActivities,
  getCertificates,
  getSocialLinks,
  getContactInfo,
  getResearchWorks,
  getBlogs
};