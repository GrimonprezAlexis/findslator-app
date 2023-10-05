export type UserRole = 'client' | 'translator' | 'both';

enum ServiceOptions {
  TraductionGenerale = 'service1',
  TraductionTechnique = 'service2',
  TraductionLitteraire = 'service3',
  TraductionAssermentee = 'service4',
  Interpretation = 'service5',
  // Add other options as needed
  Autres = 'serviceN',
}

export interface Confirmation {
  isInformationAccurate: boolean;
  acceptTermsAndConditions: boolean;
}

export interface Diploma {
  hasDiploma: boolean;
  diplomaDetails: string;
  diplomaName?: string;
  graduationYear?: number;
  issuedBy?: string;
}

export interface Tariffs {
  service: ServiceOptions;
  unit: 'source word' | 'target word' | 'hour' | 'page' | 'day';
  price: number;
  currency: string;
  minPrice: number;
}
export interface ProfessionalExperiances {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Documents {
  documentType: 'diploma' | 'professionalCertificate' | 'other';
  documentName: string;
  file: File;
}

// From Auth0
export interface UserBase<T> {
  roles: UserRole[];
  email?: string;
  picture?: string;
  auth0Id?: string;
  updated_at: string;
  profile?: T;
}

// The user from Mongo
export interface User<T> extends UserBase<T> {
  email: string;
  picture: string;
  auth0Id: string;
  profile: T;
}

// When we get the user from Auth0 some property is optionnal
export interface UserAuth<T> extends UserBase<T> {}

// Personal Information
export interface UserProfile extends ProfessionalInfo {
  lastName: string;
  firstName: string;
  picture?: string;
  gender: 'men' | 'women' | 'other';
  nationality?: string;
  countryOfResidence: string;
  city?: string;
  linkedin?: string;
  website?: string;
  bio?: string;
}

// Professional Information
export interface ProfessionalInfo {
  services?: string;
  status: 'independent' | 'company';
  companySize?:
    | '0-5 employees'
    | '5-10 employees'
    | '10-25 employees'
    | '25-50 employees'
    | '50+ employees';
  nativeLanguage?: string[];
  workingLanguages?: string[];
  experienceYear?: number;
  specializations?: string[];
  translationTools?: boolean;
  translationToolsDetails?: string;

  // tariffs
  tariffs?: Tariffs[];

  // Academic Background
  hasDiploma: boolean;
  diplomaDetails?: string;
  diplomaName?: string;
  graduationYear?: number;
  issuedBy?: string;
  otherDiplomas?: Diploma[];

  // Professional Experience
  experience?: ProfessionalExperiances[];

  // Documents
  documents?: Documents[];

  // Confirmation
  confirmation: Confirmation;
}
