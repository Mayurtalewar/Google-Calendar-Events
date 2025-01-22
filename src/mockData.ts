import { CalendarEvent } from './types';

export const mockUser = {
  email: 'user@example.com',
  name: 'John Doe',
  picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces'
};

export const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    summary: 'Team Weekly Sync',
    description: 'Weekly team sync to discuss progress and blockers',
    start: {
      dateTime: '2024-03-20T10:00:00',
      timeZone: 'UTC'
    },
    end: {
      dateTime: '2024-03-20T11:00:00',
      timeZone: 'UTC'
    },
    location: 'Virtual Meeting Room',
    creator: {
      email: 'lead@example.com',
      displayName: 'Team Lead'
    }
  },
  {
    id: '2',
    summary: 'Client Presentation',
    description: 'Quarterly review with client',
    start: {
      dateTime: '2024-03-21T14:00:00',
      timeZone: 'UTC'
    },
    end: {
      dateTime: '2024-03-21T15:30:00',
      timeZone: 'UTC'
    },
    location: 'Conference Room A',
    creator: {
      email: 'manager@example.com',
      displayName: 'Project Manager'
    }
  },
  {
    id: '3',
    summary: 'Product Launch Planning',
    description: 'Planning session for Q2 product launch',
    start: {
      dateTime: '2024-03-22T09:00:00',
      timeZone: 'UTC'
    },
    end: {
      dateTime: '2024-03-22T10:30:00',
      timeZone: 'UTC'
    },
    creator: {
      email: 'product@example.com',
      displayName: 'Product Owner'
    }
  }
];