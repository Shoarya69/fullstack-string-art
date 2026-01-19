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
import validator from "validator";
import { Regi_api } from '@/services/regi_api';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const isValid = validator.isEmail(email);
  const isStrong = validator.isStrongPassword(password, {
      minLength: 6,      // 👈 yahin change
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
     if (!validator.isEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (isStrong) {
      toast.error('Password is not strong');
      return;
    }

    setIsLoading(true);
    try {
      const data = await Regi_api(email,password);
      if (data.token) {
        toast.success('Account created successfully!');
        localStorage.setItem("token", data.token)
        const success = await register(name, email, password);

        navigate('/dashboard');
      }
      if (data.error){
        toast.error(data.error);
        return;
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Account | StringArt Generator</title>
        <meta name="description" content="Create your free StringArt account and start transforming photos into beautiful string art masterpieces." />
      </Helmet>

      <AuthCard
        title="Create Account"
        subtitle="Start creating beautiful string art today"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div>
            <Input
              type="email"
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
              placeholder="Create password"
            />
          </div>

          <p className="text-xs text-muted-foreground">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </p>

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
                Create Account
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </AuthCard>
    </>
  );
};

export default Signup;
