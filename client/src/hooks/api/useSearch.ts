'use client';

import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/api/axiosClient';
import { Course, SearchSuggestionResponse } from '@/types';

/**
 * Hook to fetch search suggestions (keywords and mini-results)
 */
export const useSearchSuggestions = (q: string) => {
  return useQuery<SearchSuggestionResponse>({
    queryKey: ['search', 'suggestions', q],
    queryFn: () => axiosClient.get(`/search/suggestions?q=${q}`),
    enabled: !!q && q.trim().length > 0, // Only fetch if there is a query
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

/**
 * Hook to fetch top trending search terms (Hot Searches)
 */
export const useHotSearches = () => {
  return useQuery<string[]>({
    queryKey: ['search', 'hot-searches'],
    queryFn: () => axiosClient.get('/search/hot-searches'),
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
  });
};

/**
 * Hook to perform full course search with filters and pagination
 */
export const useSearchCourses = (params: { 
  q?: string; 
  categoryId?: string; 
  level?: string; 
  page?: number 
}) => {
  return useQuery<Course[]>({
    queryKey: ['search', 'courses', params],
    queryFn: () => axiosClient.get('/course/search', { params }),
    staleTime: 1 * 60 * 1000, // Cache for 1 minute
  });
};
