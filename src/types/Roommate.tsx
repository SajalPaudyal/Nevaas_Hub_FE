export interface RoommateOpening {
  id: number;
  ownerId: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  address: string;
  beds: number;
  baths: number;
  occupation: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  faculty: 'science' | 'management' | 'humanities' | 'others';
  education: 'high-school' | 'bachelor' | 'master' | 'phd' | 'undisclosable';
  isSmoker: boolean;
  hasPets: boolean;
  prefGender: 'male' | 'female' | 'other';
  prefMinAge: number;
  prefMaxAge: number;
  createdAt: string;
}