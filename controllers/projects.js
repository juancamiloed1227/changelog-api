const jwt = require('jsonwebtoken');
const Project = require('../models/projects');
const projects = require('../data/projects');
const moment = require('moment-timezone');
moment.tz.setDefault('America/Bogota');

const createProject = (req, res) => {
    // Validate the request and return a 401 Unauthorized error if the user is not authenticated
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const userId = jwt.verify(token, "secret").id;
    
    // Create a new project and add it to the list of projects
    const project = new Project(
        req.body.name,
        userId,
        req.body.updates
    );

    projects.push(project);

    res.json(project);
}

const getProjects = (req, res) => {
    // Validate the request and return a 401 Unauthorized error if the user is not authenticated
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const userId = jwt.verify(token, "secret").id;

    // Filter the list of projects based on the query parameters
    let results = projects;
    if (req.query.date) results = results.filter((p) => moment(p.date).isSameOrAfter(moment(req.query.date)));
    if (req.query.creator) results = results.filter((p) => p.creator == req.query.creator);
    if (req.query.name) results = results.filter((p) => p.name.includes(req.query.name));

    // Paginate the results
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const totalPages = Math.ceil(results.length / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const items = results.slice(startIndex, endIndex);

    // Return the paginated results
    res.json({
        items,
        page,
        pageSize,
        totalPages,
    });
}

const getProject = (req, res) => {
    // Validate the request and return a 401 Unauthorized error if the user is not authenticated
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const userId = jwt.verify(token, "secret").id;

    // Find the project with the given ID
    const project = projects.find((p) => p.id == req.params.id);

    // If the project exists, return it to the user
    if (project) {
        res.json(project);
    } else {
        // If the project does not exist, return a 404 Not Found error
        res.status(404).json({ message: "Project not found" });
    }
}

const updateProject = (req, res) => {
    // Validate the request and return a 401 Unauthorized error if the user is not authenticated
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const userId = jwt.verify(token, "secret").id;

    // Find the project with the given ID
    const project = projects.find((p) => p.id == req.params.id);

    // If the project exists, update its fields and return the updated project to the user
    if (project) {
        project.name = req.body.name || project.name;
        project.updates = req.body.updates || project.updates;
        res.json(project);
    } else {
        // If the project does not exist, return a 404 Not Found error
        res.status(404).json({ message: "Project not found" });
    }
}

const deleteProject = (req, res) => {
    // Validate the request and return a 401 Unauthorized error if the user is not authenticated
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const userId = jwt.verify(token, "secret").id;

    // Find the project with the given ID and delete it
    const index = projects.findIndex((p) => p.id == req.params.id);
    if (index >= 0) {
        projects.splice(index, 1);
        res.json({ message: "Project deleted" });
    } else {
        // If the project does not exist, return a 404 Not Found error
        res.status(404).json({ message: "Project not found" });
    }
}

module.exports = {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
}