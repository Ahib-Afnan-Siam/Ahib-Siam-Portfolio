import { useEffect, useRef } from 'react';

/**
 * Custom hook to create a focus trap within a container element
 * @param {boolean} isActive - Whether the focus trap is active
 * @param {Array} focusableElementsSelectors - CSS selectors for focusable elements
 */
const useFocusTrap = (isActive, focusableElementsSelectors = []) => {
  const containerRef = useRef(null);
  const firstFocusableElementRef = useRef(null);
  const lastFocusableElementRef = useRef(null);

  // Default focusable elements if no selectors provided
  const defaultFocusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ];

  const focusableSelectors = focusableElementsSelectors.length 
    ? focusableElementsSelectors 
    : defaultFocusableSelectors;

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    
    // Get all focusable elements within the container
    const focusableElements = container.querySelectorAll(
      focusableSelectors.join(', ')
    );
    
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstFocusableElementRef.current = firstElement;
    lastFocusableElementRef.current = lastElement;

    // Only focus the first element when trap activates if no element already has focus
    // Special handling for when the container itself has focus
    if (!container.contains(document.activeElement) || document.activeElement === container) {
      // Ensure the element is focusable before focusing
      if (firstElement && typeof firstElement.focus === 'function') {
        firstElement.focus();
      }
    }

    const handleTabKey = (event) => {
      if (event.key !== 'Tab') return;

      // If shift + tab on first element, focus last element
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        if (lastElement && typeof lastElement.focus === 'function') {
          lastElement.focus();
        }
      }
      
      // If tab on last element, focus first element
      else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        if (firstElement && typeof firstElement.focus === 'function') {
          firstElement.focus();
        }
      }
    };

    // Listen for tab key events
    container.addEventListener('keydown', handleTabKey);

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive, focusableSelectors]);

  return { containerRef };
};

export default useFocusTrap;