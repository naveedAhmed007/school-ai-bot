export interface ContactInfoRequest {
  school_id: string;
  email: string;
  contact_number: string;
  social_links: string[];
}

export interface ContactOperationResponse {
  success: boolean;
  message: string;
  error?: string;
  data?: ContactInfoRequest;
}
