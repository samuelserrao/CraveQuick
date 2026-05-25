import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { FaUtensils, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuthStore();

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const result = signup(name, email, password);
      if (result.success) {
        toast.success('Account created successfully! Please login.');
        navigate('/login');
      } else {
        toast.error(result.error || 'Failed to create account');
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
      
      <h1 className="text-3xl font-bold text-center mb-2">Create an Account</h1>
      <p className="text-muted-foreground text-center mb-8">Join CraveQuick today</p>
      
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <FaUser />
          </div>
          <Input type="text" placeholder="Full Name" className="pl-10" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <FaEnvelope />
          </div>
          <Input type="email" placeholder="Email address" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <FaLock />
          </div>
          <Input type="password" placeholder="Password" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        </div>

        <div className="text-sm">
          <label className="flex items-start gap-2 cursor-pointer mt-4">
            <input type="checkbox" className="rounded border-border text-primary focus:ring-primary accent-primary mt-1" required />
            <span className="text-muted-foreground text-xs leading-relaxed">
              I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </span>
          </label>
        </div>
        
        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </Button>
      </form>
      
      <div className="mt-8 text-center text-sm">
        <p className="text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
