import { CalendarType } from './enums';
export interface CalendarConfig {
  school_id: string;
  calendar_id: string;
  type: string;
  api_key?: string;
  enabled: boolean;
  label: string;
  created_at?: string;
  updated_at?: string;
}

export interface CalendarPayload {
  school_id: string;
  calendar_id: string;
  api_key: string;
  calendar_type: CalendarType;
}

export interface CalendarResponse {
  success: boolean;
  message: string;
  error?: string;
}