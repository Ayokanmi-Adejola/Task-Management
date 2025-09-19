
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Moon, Sun, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UserSettings {
  autoSave: boolean;
  theme: string;
  notifications: boolean;
  emailNotifications: boolean;
}

const DEFAULT_SETTINGS: UserSettings = {
  autoSave: true,
  theme: 'system',
  notifications: true,
  emailNotifications: false
};

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onOpenChange }) => {
  const { user, logout, updateUserAvatar } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<string>("account");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const [settings, setSettings] = useState<UserSettings>(() => {
    const savedSettings = localStorage.getItem('userSettings');
    return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;
  });

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  // Sync theme state with settings
  useEffect(() => {
    setSettings(prev => ({ ...prev, theme }));
  }, [theme]);

  const handleSaveSettings = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    // Apply theme change
    setTheme(settings.theme as 'light' | 'dark' | 'system');
    toast.success('Settings saved successfully');
  };

  const handleSaveProfile = () => {
    // In a real app, this would make an API call to update the user profile
    toast.success('Profile updated successfully');
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      if (imageUrl) {
        updateUserAvatar(imageUrl);
        toast.success('Profile picture updated successfully');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "sm:max-w-md p-0 gap-0 shadow-xl border-none bg-gradient-to-b from-background to-muted/20",
        "duration-200 transition-all",
        isMobile && "w-[95%] rounded-2xl"
      )}>
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className={cn(
            "text-xl font-semibold tracking-tight",
            isMobile && "text-lg"
          )}>Settings</DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account" className={cn(
                isMobile && "text-xs py-1.5"
              )}>Account</TabsTrigger>
              <TabsTrigger value="preferences" className={cn(
                isMobile && "text-xs py-1.5"
              )}>Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="pt-4 space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative cursor-pointer group" onClick={handleAvatarClick}>
                  <Avatar className={cn(
                    "border-2 border-primary",
                    isMobile ? "w-20 h-20" : "w-24 h-24"
                  )}>
                    <AvatarImage src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} />
                    <AvatarFallback className={cn(
                      isMobile ? "text-base" : "text-lg"
                    )}>
                      <User className={cn(
                        isMobile ? "h-6 w-6" : "h-8 w-8"
                      )} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className={cn(
                      isMobile ? "h-6 w-6" : "h-8 w-8",
                      "text-white"
                    )} />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>
              <p className={cn(
                "text-center text-muted-foreground",
                isMobile ? "text-xs" : "text-sm"
              )}>
                Click to change profile picture
              </p>

              <div className="space-y-2">
                <Label htmlFor="name" className={cn(
                  "text-sm font-medium text-muted-foreground",
                  isMobile && "text-xs"
                )}>Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className={cn(
                    "border-muted-foreground/20 bg-background/50 backdrop-blur-sm",
                    "transition-all duration-200 focus:ring-offset-0 rounded-xl",
                    isMobile && "h-9 text-sm"
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className={cn(
                  "text-sm font-medium text-muted-foreground",
                  isMobile && "text-xs"
                )}>Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={cn(
                    "border-muted-foreground/20 bg-background/50 backdrop-blur-sm",
                    "transition-all duration-200 focus:ring-offset-0 rounded-xl",
                    isMobile && "h-9 text-sm"
                  )}
                />
              </div>



              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  className={cn(
                    "text-destructive hover:bg-destructive/10",
                    "rounded-xl border-muted-foreground/20",
                    isMobile && "h-9 text-xs px-3"
                  )}
                  onClick={logout}
                >
                  Log out
                </Button>
                <Button
                  className={cn(
                    "rounded-xl bg-gradient-to-r from-primary to-primary/80",
                    "hover:opacity-90 transition-opacity",
                    isMobile && "h-9 text-xs px-3"
                  )}
                  onClick={handleSaveProfile}
                >
                  Update Profile
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="pt-4 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autosave" className={cn(
                      "text-sm font-medium",
                      isMobile && "text-xs"
                    )}>Auto-save Tasks</Label>
                    <p className={cn(
                      "text-sm text-muted-foreground",
                      isMobile && "text-xs"
                    )}>
                      Automatically save tasks when they're moved
                    </p>
                  </div>
                  <Switch
                    id="autosave"
                    checked={settings.autoSave}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, autoSave: checked }))
                    }
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <Label htmlFor="theme" className={cn(
                    "text-sm font-medium text-muted-foreground",
                    isMobile && "text-xs"
                  )}>Theme</Label>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <Select
                        value={settings.theme}
                        onValueChange={(value) => {
                          setSettings(prev => ({ ...prev, theme: value }));
                          setTheme(value as 'light' | 'dark' | 'system');
                        }}
                      >
                        <SelectTrigger id="theme" className={cn(
                          "border-muted-foreground/20 bg-background/50 backdrop-blur-sm",
                          "transition-all duration-200 focus:ring-offset-0 rounded-xl",
                          isMobile && "h-9 text-sm"
                        )}>
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light" className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            <span>Light</span>
                          </SelectItem>
                          <SelectItem value="dark" className="flex items-center gap-2">
                            <Moon className="h-4 w-4" />
                            <span>Dark</span>
                          </SelectItem>
                          <SelectItem value="system" className="flex items-center gap-2">
                            <span className="flex h-4 w-4 items-center justify-center">
                              <Sun className="h-3 w-3 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                              <Moon className="absolute h-3 w-3 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            </span>
                            <span>System</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex h-9 items-center justify-center rounded-md border border-input p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-7 w-7 rounded-sm",
                          settings.theme === "light" && "bg-muted"
                        )}
                        onClick={() => {
                          setSettings(prev => ({ ...prev, theme: "light" }));
                          setTheme('light');
                        }}
                      >
                        <Sun className="h-4 w-4" />
                        <span className="sr-only">Light</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-7 w-7 rounded-sm",
                          settings.theme === "dark" && "bg-muted"
                        )}
                        onClick={() => {
                          setSettings(prev => ({ ...prev, theme: "dark" }));
                          setTheme('dark');
                        }}
                      >
                        <Moon className="h-4 w-4" />
                        <span className="sr-only">Dark</span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications" className={cn(
                      "text-sm font-medium",
                      isMobile && "text-xs"
                    )}>Browser Notifications</Label>
                    <p className={cn(
                      "text-sm text-muted-foreground",
                      isMobile && "text-xs"
                    )}>
                      Get notified about task updates
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={settings.notifications}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, notifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications" className={cn(
                      "text-sm font-medium",
                      isMobile && "text-xs"
                    )}>Email Notifications</Label>
                    <p className={cn(
                      "text-sm text-muted-foreground",
                      isMobile && "text-xs"
                    )}>
                      Receive email updates about your tasks
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>
                <Button
                  className={cn(
                    "w-full mt-4 rounded-xl bg-gradient-to-r from-primary to-primary/80",
                    "hover:opacity-90 transition-opacity",
                    isMobile && "h-9 text-sm"
                  )}
                  onClick={handleSaveSettings}
                >
                  Save Settings
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
