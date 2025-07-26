"use client";

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  LogOut, 
  Sparkles, 
  MessageCircle,
  Target,
  TrendingUp,
  BarChart3,
  Menu,
  X,
  Home
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useState } from 'react';

interface NavbarProps {
  className?: string;
}

export default function Navbar({
  className = ""
}: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Determine page type
  const isLandingPage = pathname === '/';
  const isAuthPage = pathname === '/auth';
  const isAppPage = !isLandingPage && !isAuthPage;
  
  // Get current page info
  const getCurrentPageInfo = () => {
    switch (pathname) {
      case '/': return { title: '', showTitle: false };
      case '/auth': return { title: 'Sign In', showTitle: false };
      case '/connect': return { title: 'Connect Accounts', showTitle: true };
      case '/onboarding': return { title: 'Setup Profile', showTitle: true };
      case '/chat': return { title: 'Chat', showTitle: true };
      case '/actions': return { title: 'Action Center', showTitle: true };
      case '/scenarios': return { title: 'Scenarios', showTitle: true };
      case '/progress': return { title: 'Progress', showTitle: true };
      case '/profile': return { title: 'Profile', showTitle: true };
      default: return { title: 'Financial Future', showTitle: true };
    }
  };

  const currentPage = getCurrentPageInfo();

  // Navigation items for authenticated users
  const appNavItems = [
    { path: '/chat', label: 'Chat', icon: MessageCircle, active: pathname === '/chat' },
    { path: '/actions', label: 'Actions', icon: Target, active: pathname === '/actions' },
    { path: '/scenarios', label: 'Scenarios', icon: BarChart3, active: pathname === '/scenarios' },
    { path: '/progress', label: 'Progress', icon: TrendingUp, active: pathname === '/progress' },
  ];

  // Landing page navigation items
  const landingNavItems = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How it Works' },
    { href: '#testimonials', label: 'Reviews' },
    { href: '#pricing', label: 'Pricing' },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const handleAuthAction = (action: 'login' | 'signup') => {
    router.push('/auth');
  };

  return (
    <header className={`sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 ${className}`}>
      <div className="container mx-auto px-4 lg:px-6">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Left Side */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={() => handleNavigation('/')}
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-[#725BF4] to-[#5d47d9] rounded-xl flex items-center justify-center shadow-lg p-1">
                <img 
                  src="/ff_logo.png" 
                  alt="Future Self Logo" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg lg:text-xl font-bold text-gray-900">
                  Future Self
                </span>
                {currentPage.showTitle && (
                  <span className="text-xs text-gray-500 -mt-1 hidden sm:block">
                    {currentPage.title}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Center - Navigation Links */}
          {isLandingPage && (
            <div className="hidden lg:flex items-center space-x-8">
              {landingNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}

          {/* App Navigation for authenticated users */}
          {isAppPage && auth.isAuthenticated && (
            <div className="hidden lg:flex items-center space-x-2">
              {appNavItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    variant={item.active ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center space-x-2 rounded-xl ${
                      item.active 
                        ? 'bg-[#725BF4] text-white shadow-md' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden xl:inline">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {auth.isAuthenticated ? (
              /* Authenticated User - Only Profile Dropdown */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-10 w-10 rounded-full hover:bg-gray-100"
                  >
                    <Avatar className="h-8 w-8 lg:h-9 lg:w-9">
                      <AvatarImage src={auth.user?.avatar} alt={auth.user?.name} />
                      <AvatarFallback className="bg-gradient-to-br from-[#725BF4] to-[#5d47d9] text-white text-sm font-semibold">
                        {auth.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  <div className="flex items-center justify-start gap-3 p-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={auth.user?.avatar} alt={auth.user?.name} />
                      <AvatarFallback className="bg-gradient-to-br from-[#725BF4] to-[#5d47d9] text-white">
                        {auth.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm">{auth.user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[150px]">
                        {auth.user?.email || 'user@example.com'}
                      </p>
                      {auth.hasProfile && (
                        <Badge variant="secondary" className="text-xs w-fit mt-1">
                          Profile Complete
                        </Badge>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  
                  {/* Quick Navigation */}
                  {isAppPage && (
                    <>
                      <DropdownMenuItem onClick={() => handleNavigation('/chat')}>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        <span>Chat with Future Self</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleNavigation('/progress')}>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        <span>View Progress</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  <DropdownMenuItem onClick={() => handleNavigation('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile & Settings</span>
                  </DropdownMenuItem>
                  
                  {!isLandingPage && (
                    <DropdownMenuItem onClick={() => handleNavigation('/')}>
                      <Home className="mr-2 h-4 w-4" />
                      <span>Home</span>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={auth.logout} className="text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Unauthenticated User */
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => handleAuthAction('login')}
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 font-medium rounded-xl hover:bg-gray-100"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => handleAuthAction('signup')}
                  size="sm"
                  className="bg-gradient-to-r from-[#725BF4] to-[#5d47d9] hover:from-[#5d47d9] hover:to-[#4b39c7] text-white font-semibold px-4 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            {(isAppPage && auth.isAuthenticated) || isLandingPage ? (
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden rounded-xl"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            ) : null}
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 space-y-2">
            {isLandingPage && (
              <>
                {landingNavItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </>
            )}
            
            {isAppPage && auth.isAuthenticated && (
              <>
                {appNavItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        item.active 
                          ? 'bg-[#725BF4] text-white' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}