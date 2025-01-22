import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Header } from './components/Header';
import { EventList } from './components/EventList';
import { User, CalendarEvent } from './types';
import { fetchCalendarEvents, getUserProfile } from './lib/googleCalendar';
import { motion, AnimatePresence } from 'framer-motion';
//import { Button } from './components/ui/button';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    onSuccess: async (response) => {
      try {
        setLoading(true);
        setError(null);
        
        const userProfile = await getUserProfile(response.access_token);
        setUser(userProfile);
        
        const calendarEvents = await fetchCalendarEvents(response.access_token);
        setEvents(calendarEvents);
      } catch (err) {
        setError('Failed to fetch user data or calendar events');
        console.error('Error during login:', err);
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError('Failed to sign in with Google');
    },
  });

  const handleLogout = () => {
    setUser(null);
    setEvents([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header user={user} onLogin={login} onLogout={handleLogout} />
      
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto py-4 px-4"
          >
            <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
              <p className="text-destructive">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {user ? (
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"
        >
          <div className="px-4 sm:px-0">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Your Calendar Events
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  A list of all your upcoming calendar events and meetings.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16">
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="block w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <EventList events={events} dateFilter={dateFilter} />
            )}
          </div>
        </motion.main>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <h2 className="text-base font-semibold text-primary tracking-wide uppercase">Calendar App</h2>
              <p className="mt-1 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Welcome to Your Calendar
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-muted-foreground">
                Sign in with your Google account to view and manage your calendar events.
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;