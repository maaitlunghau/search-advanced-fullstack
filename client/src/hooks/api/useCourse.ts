'use client';

import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/api/axiosClient';
import { Category, Course } from '@/types';

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => axiosClient.get('/category'),
    staleTime: 30 * 60 * 1000, // Cache 30 minutes - categories rarely change
  });
};

export const useFeaturedCourses = (limit: number = 4) => {
  return useQuery<Course[]>({
    queryKey: ['courses', 'featured', limit],
    queryFn: () => axiosClient.get(`/course/featured?limit=${limit}`),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCourseDetail = (id: string) => {
  return useQuery<Course>({
    queryKey: ['courses', id],
    queryFn: () => axiosClient.get(`/course/${id}`),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
