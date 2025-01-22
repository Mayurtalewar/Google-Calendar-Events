export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  location?: string;
  creator: {
    email: string;
    displayName: string;
  };
}

export interface User {
  email: string;
  name: string;
  picture: string;
}