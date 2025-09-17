import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegisterClick: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onOpenChange, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(email.trim(), password);

      if (success) {
        toast.success('Logged in successfully');
        onOpenChange(false);
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
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
          )}>Log in to your account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 p-6 pt-2">
          <div className="space-y-2">
            <Label htmlFor="email" className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>Email</Label>
            <Input
              id="email"
              type="email"
              autoFocus
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
          <div className="space-y-2">
            <Label htmlFor="password" className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={cn(
                "border-muted-foreground/20 bg-background/50 backdrop-blur-sm",
                "transition-all duration-200 focus:ring-offset-0 rounded-xl",
                isMobile && "h-9 text-sm"
              )}
            />
          </div>
          <div className="flex flex-col space-y-2 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "rounded-xl bg-gradient-to-r from-primary to-primary/80",
                "hover:opacity-90 transition-opacity",
                isMobile && "h-9 text-sm"
              )}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
            <div className={cn(
              "text-center text-sm text-muted-foreground pt-2",
              isMobile && "text-xs"
            )}>
              Don't have an account?{' '}
              <Button
                variant="link"
                className={cn(
                  "p-0 h-auto text-primary",
                  isMobile && "text-xs"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  onRegisterClick();
                }}
              >
                Register
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegisterClick: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onOpenChange, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(email.trim(), password);

      if (success) {
        toast.success('Logged in successfully');
        onOpenChange(false);
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
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
          )}>Log in to your account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 p-6 pt-2">
          <div className="space-y-2">
            <Label htmlFor="email" className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>Email</Label>
            <Input
              id="email"
              type="email"
              autoFocus
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
          <div className="space-y-2">
            <Label htmlFor="password" className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={cn(
                "border-muted-foreground/20 bg-background/50 backdrop-blur-sm",
                "transition-all duration-200 focus:ring-offset-0 rounded-xl",
                isMobile && "h-9 text-sm"
              )}
            />
          </div>
          <div className="flex flex-col space-y-2 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "rounded-xl bg-gradient-to-r from-primary to-primary/80",
                "hover:opacity-90 transition-opacity",
                isMobile && "h-9 text-sm"
              )}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
            <div className={cn(
              "text-center text-sm text-muted-foreground pt-2",
              isMobile && "text-xs"
            )}>
              Don't have an account?{' '}
              <Button
                variant="link"
                className={cn(
                  "p-0 h-auto text-primary",
                  isMobile && "text-xs"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  onRegisterClick();
                }}
              >
                Register
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
