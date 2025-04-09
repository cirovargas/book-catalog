import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Subjects API
export const reportsApi = {
  booksByAuthor: () => api.get('/reports/books-by-author', { responseType: 'blob' })
};


// Subjects API
export const subjectsApi = {
  getAll: () => api.get('/subjects'),
  create: (data: { description: string }) => api.post('/subjects', data),
  update: (id: string, data: { description: string }) => api.put(`/subjects/${id}`, data),
  delete: (id: string) => api.delete(`/subjects/${id}`),
};

// Authors API
export const authorsApi = {
  getAll: () => api.get('/authors'),
  create: (data: { name: string }) => api.post('/authors', data),
  update: (id: string, data: { name: string }) => api.put(`/authors/${id}`, data),
  delete: (id: string) => api.delete(`/authors/${id}`),
};

// Books API
export const booksApi = {
  getAll: () => api.get('/books'),
  create: (data: {
    title: string;
    edition: number;
    publish_year: number;
    subjectIds: string[];
    authorIds: string[];
    price: number;
    publisher: string;
  }) => api.post('/books', data),
  update: (id: string, data: {
    title: string;
    edition: number;
    publish_year: number;
    subjectIds: string[];
    authorIds: string[];
    price: number;
    publisher: string;
  }) => api.put(`/books/${id}`, data),
  delete: (id: string) => api.delete(`/books/${id}`),
};