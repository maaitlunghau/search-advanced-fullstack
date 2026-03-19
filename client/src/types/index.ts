export interface Category {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  durationMinutes: number;
  totalStudents: number;
  price: number;
  level: string;
  language: string;
  status: string;
  createdAt: string;
  categoryId: string;
  category?: Category;
}

export interface SearchSuggestionResponse {
  keywords: string[];
  courses: Course[];
}

export interface SearchParams {
  q?: string;
  categoryId?: string;
  level?: string;
  page?: number;
  pageSize?: number;
}
