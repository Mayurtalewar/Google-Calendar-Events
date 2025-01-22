import React from 'react';
import { CalendarEvent } from '../types';
import { Clock, MapPin } from 'lucide-react';
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
          <p className="text-muted-foreground">No events found for the selected date.</p>
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold">Event</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold">Time</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold">Location</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold">Organizer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredEvents.map((event) => (
                  <motion.tr
                    key={event.id}
                    variants={item}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 pl-4 pr-3">
                      <div>
                        <div className="font-medium">{event.summary}</div>
                        {event.description && (
                          <div className="text-sm text-muted-foreground">{event.description}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formatDate(event.start.dateTime)}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      {event.location ? (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{event.location}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-3 py-4">
                      <div className="text-sm text-muted-foreground">{event.creator.displayName}</div>
                      <div className="text-sm text-muted-foreground/60">{event.creator.email}</div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}