export type UserRole = 'client' | 'translator' | 'both';

export interface UserAuth<T> {
  roles: UserRole[];
  email?: string;
  picture?: string;
  auth0Id?: string;
  updated_at: string;
  profile?: T;
}

export interface UserProfile extends ProfessionalInfo {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  nationality: string;
  countryOfResidence: string;
  city: string;
  linkedin: string;
  website: string;
  bio: string;
}

export interface ProfessionalInfo {
  // Professional Information
  services: string;
  status: 'independent' | 'company';
  companySize?:
    | '0-5 employees'
    | '5-10 employees'
    | '10-25 employees'
    | '25-50 employees'
    | '50+ employees';
  nativeLanguage: string[];
  workingLanguages: string[];
  experienceYear: number;
  specializations: string[];
  translationTools: boolean;
  translationToolsDetails?: string;

  // Pricing
  pricing: {
    service: string;
    unit: 'source word' | 'target word' | 'hour' | 'page' | 'day';
    price: number;
    currency: string;
    minPrice: number;
  }[];

  // Academic Background
  hasDiploma: boolean;
  diplomaName?: string;
  graduationYear?: number;
  issuedBy?: string;

  // Professional Experience
  experience: {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];

  // Documents
  documents: {
    documentType: 'diploma' | 'professionalCertificate' | 'other';
    documentName: string;
    file: File;
  }[];

  // Confirmation
  isInformationAccurate: boolean;
  acceptTermsAndConditions: boolean;
}
