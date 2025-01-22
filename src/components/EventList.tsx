import React from 'react';
import { CalendarEvent } from '../types';
import { Clock, MapPin, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventListProps {
  events: CalendarEvent[];
  dateFilter: string;
}

export function EventList({ events, dateFilter }: EventListProps) {
  const filteredEvents = events.filter(event => {
    if (!dateFilter) return true;
    return event.start.dateTime.startsWith(dateFilter);
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="mt-6">
      {filteredEvents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Calendar className="h-16 w-16 mx-auto text-purple-500 mb-4" />
          <p className="text-lg font-medium bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            No events found for the selected date
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={item}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-lg border border-purple-100 dark:border-purple-900 bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    {event.summary}
                  </h3>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center space-x-2 text-sm text-purple-500"
                  >
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(event.start.dateTime)}</span>
                  </motion.div>
                </div>
                
                {event.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {event.description}
                  </p>
                )}
                
                <div className="mt-4 flex items-center space-x-6">
                  {event.location && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1 text-purple-500" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-4 w-4 mr-1 text-purple-500" />
                    <span>{event.creator.displayName}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}