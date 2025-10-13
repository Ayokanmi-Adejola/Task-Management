
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface RegisterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginClick: () => void;
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({ open, onOpenChange, onLoginClick }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(name.trim(), email.trim(), password);

      if (success) {
        toast.success('Account created successfully');
        onOpenChange(false);
      } else {
        toast.error('Email already exists');
      }
    } catch (error) {
      toast.error('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "sm:max-w-md p-0 gap-0 shadow-xl border-none bg-gradient-to-b from-background to-muted/20",
        "duration-200 transition-all max-h-[85vh] overflow-y-auto",
        isMobile && "w-[95%] max-w-[95%] rounded-2xl p-0"
      )}>
        <DialogHeader className="p-6 pb-2 sm:p-6 sm:pb-2">
          <DialogTitle className={cn(
            "text-xl font-semibold tracking-tight",
            isMobile && "text-lg"
          )}>Create an account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:p-6 pt-2">
          <div className="space-y-2">
            <Label htmlFor="name" className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>Name</Label>
            <Input
              id="name"
              autoFocus
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
              placeholder="Create a password"
              className={cn(
                "border-muted-foreground/20 bg-background/50 backdrop-blur-sm",
                "transition-all duration-200 focus:ring-offset-0 rounded-xl",
                isMobile && "h-9 text-sm"
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className={cn(
              "text-sm font-medium text-muted-foreground",
              isMobile && "text-xs"
            )}>Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
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
              {isLoading ? 'Creating account...' : 'Register'}
            </Button>
            <div className={cn(
              "text-center text-sm text-muted-foreground pt-2",
              isMobile && "text-xs"
            )}>
              Already have an account?{' '}
              <Button
                variant="link"
                className={cn(
                  "p-0 h-auto text-primary",
                  isMobile && "text-xs"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  onLoginClick();
                }}
              >
                Log in
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
