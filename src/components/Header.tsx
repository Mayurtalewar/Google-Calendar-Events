import React from 'react';
import { Calendar, LogOut } from 'lucide-react';
import { User } from '../types';
import { Button } from './ui/button';
import { ThemeToggle } from './ui/theme-toggle';
import { motion } from 'framer-motion';

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

export function Header({ user, onLogin, onLogout }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-background border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="ml-2 text-xl font-semibold text-foreground">Calendar Events</h1>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <img
                  src={user.picture}
                  alt={user.name}
                  className="h-8 w-8 rounded-full ring-2 ring-primary"
                />
                <span className="text-sm font-medium text-foreground">{user.name}</span>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onLogin}
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary to-primary/80"
                >
                  <img
                    src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                    alt="Google"
                    className="h-5 w-5"
                  />
                  <span>Sign in with Google</span>
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}