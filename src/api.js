import axios from 'axios';
import { buildQueryFromLPRMatrix, buildAHPResultQuery } from './helpers';

//const basePath = 'http://localhost:3000/api';
const basePath = 'http://golah30.ru:3000/api';
const LOG_IN = `${basePath}/login`;
const CATEGORIES = `${basePath}/categories`;
const POSTS = `${basePath}/posts`;
const MATH = 'http://golah30.ru:8080';
//const MATH = 'http://localhost:8080';
// const MATH2 = 'http://nootron.nmetau.edu.ua:8080/nootron.server';

export const getLocalPriorities = payload => {
  return axios(buildQueryFromLPRMatrix(MATH, payload));
};
export const getAHPResult = data => {
  return axios(buildAHPResultQuery(MATH, data));
};
export const getQuery = payload => {
  return axios(payload);
};

export const loginQuery = payload => {
  return axios.post(LOG_IN, payload);
};
export const putCategory = (id, token, data) => {
  return axios.put(`${CATEGORIES}/${id}`, data, {
    headers: { Authorization: token }
  });
};

export const putPost = (id, token, data) => {
  return axios.put(`${POSTS}/${id}`, data, {
    headers: { Authorization: token }
  });
};

export const deletePost = (id, token) => {
  return axios.delete(`${POSTS}/${id}`, {
    headers: { Authorization: token }
  });
};

export const deleteCategory = (id, token) => {
  return axios.delete(`${CATEGORIES}/${id}`, {
    headers: { Authorization: token }
  });
};

export const addCategory = (title, token) => {
  return axios.post(
    CATEGORIES,
    { title: title },
    {
      headers: { Authorization: token }
    }
  );
};

export const addPost = (data, token) => {
  return axios.post(POSTS, data, {
    headers: { Authorization: token }
  });
};

export { LOG_IN, CATEGORIES, POSTS };
