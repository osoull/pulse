import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, Mail, Lock } from 'lucide-react';
import pkg from '../../../package.json';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@osoul.partners');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-primary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Logo */}
          <div className="w-full flex justify-center">
            <img 
              src="http://www.osoul.partners/wp-content/uploads/2024/04/basic-file-2.png" 
              alt="Osoul Capital Partners" 
              className="h-16 w-auto"
            />
          </div>

          {/* Platform Name */}
          <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-semibold text-gold uppercase">
              PULSE
            </h1>
            <div className="flex items-center justify-center">
              <div className="h-[1px] w-12 bg-gold/50"></div>
              <p className="mx-4 text-sm font-medium tracking-[0.2em] text-gold uppercase">
                Private Equity Management
              </p>
              <div className="h-[1px] w-12 bg-gold/50"></div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg shadow-2xl py-8 px-4 sm:px-10 border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-500/10 p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-300">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full bg-white/5 border border-white/10 rounded-lg py-3 text-white placeholder-white/60 focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="admin@osoul.partners"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full bg-white/5 border border-white/10 rounded-lg py-3 text-white placeholder-white/60 focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-primary bg-gold hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-colors duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative">
                <span className="px-6 py-2 bg-primary/50 text-white/60 text-sm font-light tracking-wider rounded-full backdrop-blur-sm">
                  v{pkg.version}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}