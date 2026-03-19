export interface Category {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  totalStudents: number;
  level: string;
  createdAt: string;
  categoryId: string;
  category?: Category;
}

export interface SearchSuggestionResponse {
  keywords: string[];
  courses: Course[];
}
