const express = require('express');
const router = express.Router();
const { 
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
} = require('../controllers/dataController');
// GET /api/data/experiences
router.get('/experiences', getExperiences);

// GET /api/data/achievements
router.get('/achievements', getAchievements);

// GET /api/data/projects
router.get('/projects', getProjects);

// GET /api/data/projects-description
router.get('/projects-description', getProjectsDescription);

// GET /api/data/skills
router.get('/skills', getSkills);

// GET /api/data/skills-categories
router.get('/skills-categories', getSkillsCategories);

// GET /api/data/extracurricular-activities
router.get('/extracurricular-activities', getExtracurricularActivities);

// GET /api/data/certificates
router.get('/certificates', getCertificates);

// GET /api/data/social-links
router.get('/social-links', getSocialLinks);

// GET /api/data/contact-info
router.get('/contact-info', getContactInfo);

// GET /api/data/research-works
router.get('/research-works', getResearchWorks);

// GET /api/data/blogs
router.get('/blogs', getBlogs);

module.exports = router;