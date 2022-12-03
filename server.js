const express = require('express');
const router = express.Router();
const controllerUsers = require('./controllers/users');
const controllerProjects = require('./controllers/projects');

// Define the routes and their handlers
router.post('/users', controllerUsers.createUser);
router.post('/auth', controllerUsers.authenticateUser);
router.post('/projects', controllerProjects.createProject);
router.get('/projects', controllerProjects.getProjects);
router.get('/projects/:id', controllerProjects.getProject);
router.put('/projects/:id', controllerProjects.updateProject);
router.delete('/projects/:id', controllerProjects.deleteProject);
router.post('/projects/:id/updates', controllerProjects.createUpdate);

module.exports = router;