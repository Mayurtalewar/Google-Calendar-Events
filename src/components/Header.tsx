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
      className="bg-background border-b border-border backdrop-blur-sm bg-background/80 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="h-8 w-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent" />
            <h1 className="ml-2 text-xl font-semibold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Calendar Events
            </h1>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <motion.img
                  src={user.picture}
                  alt={user.name}
                  className="h-8 w-8 rounded-full ring-2 ring-purple-500"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
                <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  {user.name}
                </span>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="flex items-center space-x-2 border-purple-500/20 hover:bg-purple-500/10"
                >
                  <LogOut className="h-4 w-4 text-purple-500" />
                  <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Sign Out</span>
                </Button>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onLogin}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600"
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