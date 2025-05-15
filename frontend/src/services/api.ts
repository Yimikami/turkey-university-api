import axios from 'axios';
import { University, SearchFacultyResult, SearchProgramResult } from '../types';

const API_URL = 'http://localhost:3000';

export const getUniversities = async (): Promise<University[]> => {
  const response = await axios.get<University[]>(`${API_URL}/api/universities`);
  return response.data;
};

export const getUniversityById = async (id: number): Promise<University> => {
  const response = await axios.get<University>(`${API_URL}/api/universities/${id}`);
  return response.data;
};

export const getUniversitiesByCity = async (city: string): Promise<University[]> => {
  const response = await axios.get<University[]>(`${API_URL}/api/universities/city/${city}`);
  return response.data;
};

export const getUniversitiesByType = async (type: string): Promise<University[]> => {
  const response = await axios.get<University[]>(`${API_URL}/api/universities/type/${type}`);
  return response.data;
};

export const searchFaculties = async (name: string): Promise<SearchFacultyResult[]> => {
  const response = await axios.get<SearchFacultyResult[]>(`${API_URL}/api/search/faculty`, {
    params: { name },
  });
  return response.data;
};

export const searchPrograms = async (name: string): Promise<SearchProgramResult[]> => {
  const response = await axios.get<SearchProgramResult[]>(`${API_URL}/api/search/program`, {
    params: { name },
  });
  return response.data;
};
