// Authentication utilities

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('user');
};

export const getUser = () => {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

export const getUserProfile = () => {
  if (typeof window === 'undefined') return null;
  const profileData = localStorage.getItem('userProfile');
  return profileData ? JSON.parse(profileData) : null;
};

export const getConnectedAccounts = (): string[] => {
  if (typeof window === 'undefined') return [];
  const accountsData = localStorage.getItem('connectedAccounts');
  return accountsData ? JSON.parse(accountsData) : [];
};

export const logout = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('user');
  localStorage.removeItem('userProfile');
  localStorage.removeItem('connectedAccounts');
};