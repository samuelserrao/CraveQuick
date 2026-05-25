import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { FaUtensils, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        toast.success('Logged in successfully!');
        navigate('/');
      } else {
        toast.error(result.error || 'Login failed');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-card border border-border p-8 rounded-3xl shadow-xl w-full"
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
          <FaUtensils size={32} />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
      <p className="text-muted-foreground text-center mb-8">Sign in to your account to continue</p>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <FaEnvelope />
          </div>
          <Input 
            type="email" 
            placeholder="Email address" 
            className="pl-10" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <FaLock />
          </div>
          <Input 
            type="password" 
            placeholder="Password" 
            className="pl-10" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-border text-primary focus:ring-primary accent-primary" />
            <span className="text-muted-foreground">Remember me</span>
          </label>
          <a href="#" className="text-primary hover:underline font-medium">Forgot password?</a>
        </div>
        
        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
      
      <div className="mt-8 text-center text-sm">
        <p className="text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:underline font-medium">Sign up</Link>
        </p>
        <p className="mt-4 text-xs text-muted-foreground bg-muted p-2 rounded">
          Demo Accounts:<br/>
          john@example.com / password (Customer)<br/>
          admin@example.com / password (Admin)
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
