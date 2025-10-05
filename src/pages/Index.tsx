import React, { useState } from 'react';
import KanbanBoard from '@/components/KanbanBoard';
import { Button } from '@/components/ui/button';
import { Bell, FileText, Menu, Moon, Search, Settings, Sun, User, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import LoginDialog from '@/components/LoginDialog';
import RegisterDialog from '@/components/RegisterDialog';
import SettingsDialog from '@/components/SettingsDialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

const Index = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isMobile = useIsMobile();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleNotificationClick = () => {
    toast('No new notifications', {
      description: 'You will be notified when there are updates.',
    });
  };

  const handleLoginClick = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  const handleRegisterClick = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border/70 px-4 sm:px-6 py-3 sticky top-0 z-10 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Mobile Menu Button - Only visible on mobile */}
          {isMobile && !showMobileSearch && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground mr-1"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          {/* Logo and Title - Hidden when search is active on mobile */}
          <div className={cn(
            "flex items-center gap-2",
            isMobile && showMobileSearch && "hidden"
          )}>
            <div className="bg-primary p-1.5 rounded text-white">
              <FileText className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">Task Management</h1>
            <h1 className="text-lg font-bold tracking-tight sm:hidden">Tasks</h1>
          </div>

          {/* Search Bar - Full width when active on mobile */}
          {(!isMobile || showMobileSearch) && (
            <div className={cn(
              "relative",
              isMobile && showMobileSearch ? "flex-1 mx-2" : "flex-1 max-w-md mx-6 hidden md:block"
            )}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full py-2 pl-10 pr-4 rounded-md border border-input bg-background text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isMobile && showMobileSearch && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowMobileSearch(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Button - Only visible on mobile when search is not active */}
            {isMobile && !showMobileSearch && (
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setShowMobileSearch(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* Notification Button - Hidden on smallest screens unless search is not active */}
            {(!isMobile || !showMobileSearch) && (
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground hidden sm:flex"
                onClick={handleNotificationClick}
              >
                <Bell className="h-5 w-5" />
              </Button>
            )}

            {/* Theme Toggle Button */}
            {(!isMobile || !showMobileSearch) && (
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground hidden sm:flex"
                onClick={toggleTheme}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}

            {/* Settings Button - Hidden on smallest screens unless search is not active */}
            {(!isMobile || !showMobileSearch) && (
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground hidden sm:flex"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className="h-5 w-5" />
              </Button>
            )}

            {/* User Profile/Login Button - Hidden when search is active on mobile */}
            {(!isMobile || !showMobileSearch) && (
              isAuthenticated ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="p-0 h-auto rounded-full" aria-label="User profile">
                      <Avatar>
                        <AvatarImage src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-2" align="end">
                    <div className="px-1 py-2 space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                      </div>

                      <div className="border-t pt-3 space-y-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-sm"
                          onClick={toggleTheme}
                        >
                          <div className="mr-2 relative w-4 h-4">
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute top-0 left-0" />
                            <Moon className="h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute top-0 left-0" />
                          </div>
                          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => setSettingsOpen(true)}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-destructive" onClick={logout}>
                          Log out
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <Button variant="default" onClick={handleLoginClick} className="text-sm sm:text-base px-3 sm:px-4">
                  Log in
                </Button>
              )
            )}
          </div>
        </div>

        {/* Mobile Menu - Shown when menu button is clicked */}
        {isMobile && showMobileMenu && (
          <div className="mt-3 pb-2 border-t pt-3 space-y-2 animate-slide-down">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-sm"
              onClick={handleNotificationClick}
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-sm"
              onClick={toggleTheme}
            >
              <div className="mr-2 relative w-4 h-4">
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute top-0 left-0" />
                <Moon className="h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute top-0 left-0" />
              </div>
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-sm"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sm text-destructive"
                onClick={logout}
              >
                Log out
              </Button>
            )}
          </div>
        )}
      </header>

      <main className="flex-1 px-3 sm:px-6 py-4 sm:py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full">
          <KanbanBoard searchQuery={searchQuery} onRequestLogin={handleLoginClick} />
        </div>
      </main>

      <footer className="mt-auto border-t border-border/70 py-3 sm:py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <div className="text-xs sm:text-sm text-muted-foreground order-2 sm:order-1 flex items-center gap-3">
            <img 
              src="Ayo1.png" 
              alt="Ayokanmi Adejola" 
              className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-full ring-2 ring-border shadow-sm hover:ring-primary transition-all duration-300"
              loading="lazy"
            />
            <span className="font-medium">Created by {'Ayokanmi Adejola'}</span>
          </div>
          <div className="text-xs sm:text-sm order-1 sm:order-2">
            {!isAuthenticated && (
              <span>
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm" onClick={handleLoginClick}>
                  Log in
                </Button>
                {' '} or {' '}
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm" onClick={handleRegisterClick}>
                  Register
                </Button>
              </span>
            )}
          </div>
        </div>
      </footer>

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onRegisterClick={handleRegisterClick}
      />

      <RegisterDialog
        open={registerOpen}
        onOpenChange={setRegisterOpen}
        onLoginClick={handleLoginClick}
      />

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </div>
  );
};

export default Index;
