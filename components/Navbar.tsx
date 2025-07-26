"use client";

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowLeft, User, Settings, LogOut, Sparkles, Bell, HelpCircle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface NavbarProps {
  user?: User | null;
  showNavLinks?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
  onProfile?: () => void;
  onNavigate?: (screen: string) => void;
}

export default function Navbar({
  user,
  showNavLinks = false,
  showBackButton = false,
  onBack,
  onLogin,
  onSignup,
  onLogout,
  onProfile,
  onNavigate
}: NavbarProps) {
  return (
    <header className="sticky top-0 bg-white border-b border-gray-100 z-50">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center space-x-4">
            {/* Back Button */}
            {showBackButton && onBack && (
              <Button 
                onClick={onBack}
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 rounded-xl"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
            )}
            
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate?.('landing')}>
              <div className="w-10 h-10 bg-[#725BF4] rounded-xl flex items-center justify-center">
                <img src="/ff_logo.png" alt="Future Self Logo" className="w-10 h-10 rounded-xl" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Future Self
              </span>
            </div>
          </div>

          {/* Center - Navigation Links (only for home page) */}
          {showNavLinks && (
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                How it Works
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Reviews
              </a>
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {user ? (
              /* Authenticated User */
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">2</span>
                  </div>
                </Button>

                {/* Help */}
                <Button variant="ghost" className="h-10 w-10 rounded-full">
                  <HelpCircle className="w-5 h-5 text-gray-600" />
                </Button>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-[#725BF4] text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="w-[200px] truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    {onProfile && (
                      <DropdownMenuItem onClick={onProfile}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => onNavigate?.('settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {onLogout && (
                      <DropdownMenuItem onClick={onLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              /* Unauthenticated User */
              <div className="flex items-center space-x-3">
                {onLogin && (
                  <Button
                    onClick={onLogin}
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-900 font-medium rounded-xl"
                  >
                    Sign In
                  </Button>
                )}
                {onSignup && (
                  <Button
                    onClick={onSignup}
                    className="bg-[#725BF4] hover:bg-[#5d47d9] text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200"
                  >
                    Get Started
                  </Button>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}