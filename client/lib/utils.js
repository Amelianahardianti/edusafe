// Utility functions

// Format date to Indonesian format
export const formatDate = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format date with time
export const formatDateTime = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Format time only
export const formatTime = (time) => {
  if (!time) return '-';
  // Handle both Date object and string time (HH:MM)
  if (typeof time === 'string' && time.includes(':')) {
    return time;
  }
  const d = new Date(time);
  return d.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Get role display name
export const getRoleName = (role) => {
  const roles = {
    admin: 'Admin',
    teacher: 'Guru',
    parent: 'Orang Tua',
  };
  return roles[role] || role;
};

// Get attendance status display
export const getAttendanceStatus = (status) => {
  const statuses = {
    hadir: 'Hadir',
    sakit: 'Sakit',
    izin: 'Izin',
    alfa: 'Alfa',
  };
  return statuses[status] || status;
};

// Get attendance status color
export const getAttendanceStatusColor = (status) => {
  const colors = {
    hadir: 'bg-green-100 text-green-800',
    sakit: 'bg-yellow-100 text-yellow-800',
    izin: 'bg-blue-100 text-blue-800',
    alfa: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Validate email
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate ObjectId format
export const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

