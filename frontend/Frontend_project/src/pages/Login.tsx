import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthCard } from '@/components/auth/AuthCard';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Login_api } from '@/services/login_api';
import validator from "validator";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  // const isValid = validator.isEmail(email);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    // if (!isValid){
    //   toast.error("Please enter valid email");
    //   return;
    // }
    setIsLoading(true);
    try {
      const success = await Login_api(email, password);
      
      if (success.token) {
        localStorage.setItem("token", success.token);
        toast.success('Welcome back!');
        const suc = await login(email, password);

        navigate('/dashboard');
      }
      if (success.error){
        toast.error(success.error);
        return;
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | StringArt Generator</title>
        <meta name="description" content="Sign in to your StringArt account and start creating beautiful string art from your photos." />
      </Helmet>

      <AuthCard
        title="Welcome Back"
        subtitle="Sign in to continue creating beautiful art"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Input
              type="text"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <PasswordInput
              value={password}
              onChange={setPassword}
              placeholder="Password"
            />
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </AuthCard>
    </>
  );
};

export default Login;
