import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Header } from './components/Header';
import { EventList } from './components/EventList';
import { User, CalendarEvent } from './types';
import { fetchCalendarEvents, getUserProfile } from './lib/googleCalendar';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

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
      
      <AnimatePresence mode="wait">
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
                <motion.h2 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-semibold bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent"
                >
                  Your Calendar Events
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-2 text-sm text-muted-foreground"
                >
                  A list of all your upcoming calendar events and meetings.
                </motion.p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16">
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="block w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                />
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
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
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute inset-0 bg-gradient-radial from-purple-500/20 to-transparent -z-10"
            />
            <div className="text-center space-y-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <Calendar className="h-16 w-16 mx-auto text-purple-500 mb-4" />
                <h2 className="text-base font-semibold tracking-wide uppercase bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  Calendar App
                </h2>
                <p className="mt-1 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
                  <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                    Welcome to Your Calendar
                  </span>
                </p>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-xl mt-5 mx-auto text-xl text-muted-foreground"
              >
                Streamline your schedule with our intuitive calendar integration.
                Access your events, meetings, and reminders in one place.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={login}
                    className="group relative px-8 py-3 overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transition-all duration-300 hover:shadow-purple-500/25"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <span className="relative flex items-center gap-2">
                      <img
                        src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                        alt="Google"
                        className="h-5 w-5"
                      />
                      Sign in with Google
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3"
              >
                {['Easy Integration', 'Real-time Sync', 'Smart Notifications'].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.2 }}
                    className="relative rounded-2xl border border-purple-100 dark:border-purple-900 bg-white/5 p-6 backdrop-blur-sm"
                  >
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                      {feature}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {index === 0 && "Connect with Google Calendar seamlessly"}
                      {index === 1 && "Stay updated with real-time calendar changes"}
                      {index === 2 && "Never miss important events with smart alerts"}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;