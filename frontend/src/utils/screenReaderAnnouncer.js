/**
 * Utility to announce messages to screen readers
 */

// Create a visually hidden element for screen reader announcements
let announcementElement = null;

const createAnnouncementElement = () => {
  if (announcementElement) return announcementElement;
  
  announcementElement = document.createElement('div');
  announcementElement.setAttribute('aria-live', 'polite');
  announcementElement.setAttribute('aria-atomic', 'true');
  announcementElement.style.position = 'absolute';
  announcementElement.style.left = '-10000px';
  announcementElement.style.top = 'auto';
  announcementElement.style.width = '1px';
  announcementElement.style.height = '1px';
  announcementElement.style.overflow = 'hidden';
  
  document.body.appendChild(announcementElement);
  return announcementElement;
};

/**
 * Announce a message to screen readers
 * @param {string} message - The message to announce
 * @param {string} priority - 'polite' or 'assertive'
 */
export const announceToScreenReader = (message, priority = 'polite') => {
  if (!message) return;
  
  const element = createAnnouncementElement();
  element.setAttribute('aria-live', priority);
  
  // Clear previous content
  element.textContent = '';
  
  // Force a reflow to ensure the announcement is read
  element.offsetHeight;
  
  // Set new content
  element.textContent = message;
};

export default announceToScreenReader;