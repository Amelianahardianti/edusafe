// API Client untuk connect ke backend EduSafe

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Helper untuk get token dari localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper untuk set token
export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Helper untuk remove token
export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// Fetch wrapper dengan auth
const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    
    // Handle 401 Unauthorized
    if (response.status === 401) {
      removeToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new Error('Unauthorized');
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.msg || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },
  
  me: async () => {
    return apiFetch('/auth/me');
  },
  
  changePassword: async (currentPassword, newPassword) => {
    return apiFetch('/auth/change-password', {
      method: 'PATCH',
      body: { currentPassword, newPassword },
    });
  },
};

// Users API (Admin only)
export const usersAPI = {
  list: async (role) => {
    const query = role ? `?role=${role}` : '';
    return apiFetch(`/users${query}`);
  },
  
  detail: async (id) => {
    return apiFetch(`/users/${id}`);
  },
  
  create: async (userData) => {
    return apiFetch('/users', {
      method: 'POST',
      body: userData,
    });
  },
  
  update: async (id, userData) => {
    return apiFetch(`/users/${id}`, {
      method: 'PATCH',
      body: userData,
    });
  },
  
  delete: async (id) => {
    return apiFetch(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// Children API
export const childrenAPI = {
  list: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/children${query ? `?${query}` : ''}`);
  },
  
  listMy: async () => {
    return apiFetch('/children/my');
  },
  
  detail: async (id) => {
    return apiFetch(`/children/${id}`);
  },
  
  create: async (childData) => {
    return apiFetch('/children', {
      method: 'POST',
      body: childData,
    });
  },
  
  update: async (id, childData) => {
    return apiFetch(`/children/${id}`, {
      method: 'PATCH',
      body: childData,
    });
  },
  
  transfer: async (id, classId) => {
    return apiFetch(`/children/${id}/transfer`, {
      method: 'PATCH',
      body: { classId },
    });
  },
  
  delete: async (id) => {
    return apiFetch(`/children/${id}`, {
      method: 'DELETE',
    });
  },
};

// Classes API
export const classesAPI = {
  list: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/classes${query ? `?${query}` : ''}`);
  },
  
  detail: async (id) => {
    return apiFetch(`/classes/${id}`);
  },
  
  create: async (classData) => {
    return apiFetch('/classes', {
      method: 'POST',
      body: classData,
    });
  },
  
  update: async (id, classData) => {
    return apiFetch(`/classes/${id}`, {
      method: 'PATCH',
      body: classData,
    });
  },
  
  addHomeroom: async (id, teacherId) => {
    return apiFetch(`/classes/${id}/homeroom`, {
      method: 'POST',
      body: { teacherId },
    });
  },
  
  removeHomeroom: async (id, teacherId) => {
    return apiFetch(`/classes/${id}/homeroom/${teacherId}`, {
      method: 'DELETE',
    });
  },
  
  delete: async (id) => {
    return apiFetch(`/classes/${id}`, {
      method: 'DELETE',
    });
  },
};

// Attendance API
export const attendanceAPI = {
  listByChild: async (childId) => {
    return apiFetch(`/attendance/child/${childId}`);
  },
  
  recapWeekly: async (childId, start) => {
    const query = start ? `?start=${start}` : '';
    return apiFetch(`/attendance/recap/weekly/${childId}${query}`);
  },
  
  create: async (attendanceData) => {
    return apiFetch('/attendance', {
      method: 'POST',
      body: attendanceData,
    });
  },
  
  update: async (id, attendanceData) => {
    return apiFetch(`/attendance/${id}`, {
      method: 'PUT',
      body: attendanceData,
    });
  },
};

// Activity Child API
export const activityAPI = {
  list: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/activitychild${query ? `?${query}` : ''}`);
  },
  
  detail: async (id) => {
    return apiFetch(`/activitychild/${id}`);
  },
  
  create: async (activityData) => {
    return apiFetch('/activitychild', {
      method: 'POST',
      body: activityData,
    });
  },
  
  update: async (id, activityData) => {
    return apiFetch(`/activitychild/${id}`, {
      method: 'PATCH',
      body: activityData,
    });
  },
  
  delete: async (id) => {
    return apiFetch(`/activitychild/${id}`, {
      method: 'DELETE',
    });
  },
};

// Broadcast API
export const broadcastAPI = {
  list: async () => {
    return apiFetch('/broadcasts');
  },
  
  create: async (broadcastData) => {
    return apiFetch('/broadcasts', {
      method: 'POST',
      body: broadcastData,
    });
  },
  
  update: async (id, broadcastData) => {
    return apiFetch(`/broadcasts/${id}`, {
      method: 'PUT',
      body: broadcastData,
    });
  },
  
  delete: async (id) => {
    return apiFetch(`/broadcasts/${id}`, {
      method: 'DELETE',
    });
  },
};

// Feedback API
export const feedbackAPI = {
  list: async () => {
    return apiFetch('/feedbacks');
  },
  
  create: async (message, childID) => {
    return apiFetch('/feedbacks', {
      method: 'POST',
      body: { message, childID },
    });
  },
};

// Weather API
export const weatherAPI = {
  getMidday: async (lat, lon) => {
    return apiFetch(`/weather/midday?lat=${lat}&lon=${lon}`);
  },
};

// Notifications API
export const notificationsAPI = {
  list: async () => {
    return apiFetch('/notifications');
  },
};

