import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
});

// src/api/projects.ts
export const projectsApi = {
  //  @router.get("/current-project-num")
  getCurrentProjectCount: () => api.get('/projects/current-project-num').then(res => res.data),

  //  @router.get("") 
  getAllProjects: () => api.get('/projects').then(res => res.data),

  // @router.get("/completed-project")
  getCompletedProjectCount: () => api.get('/projects/completed-project').then(res => res.data),

  //  @router.get("/delay-project")
  getDelayedProjects: () => api.get('/projects/delay-project').then(res => res.data),
};