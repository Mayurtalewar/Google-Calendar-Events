import { CalendarEvent } from '../types';

const GOOGLE_CALENDAR_API = 'https://www.googleapis.com/calendar/v3';

export async function fetchCalendarEvents(accessToken: string): Promise<CalendarEvent[]> {
  try {
    const response = await fetch(
      `${GOOGLE_CALENDAR_API}/calendars/primary/events?orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch calendar events');
    }

    const data = await response.json();
    
    return data.items.map((event: any) => ({
      id: event.id,
      summary: event.summary,
      description: event.description,
      start: {
        dateTime: event.start.dateTime || event.start.date,
        timeZone: event.start.timeZone || 'UTC',
      },
      end: {
        dateTime: event.end.dateTime || event.end.date,
        timeZone: event.end.timeZone || 'UTC',
      },
      location: event.location,
      creator: {
        email: event.creator.email,
        displayName: event.creator.displayName || event.creator.email,
      },
    }));
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error;
  }
}

export async function getUserProfile(accessToken: string) {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    
    return {
      email: data.email,
      name: data.name,
      picture: data.picture,
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}