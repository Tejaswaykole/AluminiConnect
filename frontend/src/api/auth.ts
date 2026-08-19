import { apiClient } from './client';

export const login = async (email: string, password: string) => {
  const response: any = await apiClient.post('/auth/login', { email, password });
  return response.data; // Backend returns StandardResponse with token in data
};

export const registerStudent = async (data: any) => {
  const response = await apiClient.post('/auth/register/student', data);
  return response.data;
};

export const registerAlumni = async (data: any) => {
  const response = await apiClient.post('/auth/register/alumni', data);
  return response.data;
};

export const devLogin = async (role: 'student' | 'alumni' | 'institute' | 'admin') => {
  const email = role + '@test.com';
  const password = 'Password123!';
  
  try {
    // Try to login first
    return await login(email, password);
  } catch (error) {
    // If login fails, try to register them
    const data = {
      email,
      password,
      first_name: 'Test',
      last_name: role.toUpperCase()
    };
    
    if (role === 'student') {
      await registerStudent({...data, graduation_year: 2025, enrollment_number: 'STU12345', academic_year: '3rd Year'});
    } else if (role === 'alumni') {
      await registerAlumni({...data, graduation_year: 2020, current_company: 'TechCorp'});
    } else {
      // For institute and admin, fallback
      await apiClient.post('/auth/register/alumni', {...data, graduation_year: 2015, current_company: 'AdminCorp'}); 
    }
    
    // Login after registering
    return await login(email, password);
  }
};
