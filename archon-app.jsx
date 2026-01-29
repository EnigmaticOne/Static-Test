import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Lock, Eye, Shield, TrendingUp, Clock, FileText, Download, Share2, Users, Zap, Crown, Check, X, ChevronRight, Upload, Image, Award, AlertCircle, Mail, Key, User, ChevronDown, ExternalLink, Database, Smartphone, Globe, Archive, BookOpen, Briefcase, Building2, LogOut, Settings, Plus } from 'lucide-react';

// Initialize Supabase client
const supabaseUrl = 'https://jcyoxdtdihgpxsrpfufs.supabase.co';
const supabaseAnonKey = 'sb_publishable_aQnzeBSvUyKV12v2aaGMzQ_vwq2Zkce';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ARCHONApp = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('landing'); // landing, vault, asset
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [signupStep, setSignupStep] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [assets, setAssets] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    vaultType: ''
  });

  // Check for existing session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id);
        loadUserAssets(session.user.id);
        setView('vault');
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id);
        loadUserAssets(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (data) setUserProfile(data);
  };

  const loadUserAssets = async (userId) => {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (data) setAssets(data);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email || !formData.password || !formData.name) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            vault_type: formData.vaultType
          }
        }
      });

      if (authError) throw authError;

      // Create profile entry
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              full_name: formData.name,
              vault_type: formData.vaultType,
              plan_tier: 'starter',
              asset_count: 0,
              storage_used: 0
            }
          ]);

        if (profileError && profileError.code !== '23505') { // Ignore duplicate key error
          console.error('Profile creation error:', profileError);
        }
      }

      setSuccess('Account created! Please check your email to verify your account.');
      setSignupStep(3);
      
      // Auto-login after a short delay if email confirmation is disabled
      setTimeout(() => {
        setShowSignup(false);
        setView('vault');
      }, 2000);

    } catch (err) {
      setError(err.message || 'An error occurred during signup');
      console.error('Signup error:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setShowLogin(false);
      setView('vault');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
    setAssets([]);
    setView('landing');
  };

  const canUploadMore = () => {
    if (!userProfile) return false;
    const limit = userProfile.plan_tier === 'starter' ? 5 : 999999;
    return assets.length < limit;
  };

  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for getting started',
      cta: 'Start Free',
      popular: false,
      features: [
        '5 assets maximum',
        'Standard resolution images',
        'Basic documentation',
        'Private vault only',
        'Email support',
        'ARCHON watermark on exports'
      ]
    },
    {
      name: 'Professional',
      price: '$19',
      period: 'per month',
      description: 'For serious creators and collectors',
      cta: 'Start 14-Day Trial',
      popular: true,
      features: [
        'Unlimited assets',
        'High-resolution image uploads (up to 50MB)',
        'Advanced documentation suite',
        'Private and shared galleries',
        'Provenance timeline',
        'Custom metadata fields',
        'Export to PDF (watermark-free)',
        'Priority email support',
        'Version history (30 days)',
        'Collaboration (up to 2 people)',
        'Mobile app access',
        'API access (basic)'
      ]
    },
    {
      name: 'Collector',
      price: '$69',
      period: 'per month',
      description: 'Asset-grade legacy preservation',
      cta: 'Start 14-Day Trial',
      popular: false,
      features: [
        'Everything in Professional, plus:',
        'Valuation tracking & history',
        'Insurance documentation suite',
        'Estate planning tools',
        'Heir/beneficiary access controls',
        'Certificate of authenticity generator',
        'Condition reports',
        'Purchase & appraisal records',
        'Tax documentation exports',
        'Advanced provenance timeline',
        'Unlimited collaborators',
        'White-glove onboarding',
        'Priority phone & email support',
        'Version history (unlimited)',
        'Advanced API access',
        'Custom domain option',
        '250GB storage',
        'Encrypted backup to external location'
      ]
    }
  ];

  const useCases = [
    {
      title: 'Fine Art Photographers',
      icon: Image,
      description: 'Maintain a museum-grade digital archive of your life\'s work. Track exhibitions, sales, and provenance for each piece.',
      benefits: ['Professional portfolio', 'Exhibition history', 'Sales tracking', 'Client galleries']
    },
    {
      title: 'Art Collectors',
      icon: Award,
      description: 'Document your collection with insurance-ready records, provenance tracking, and valuation history.',
      benefits: ['Insurance documentation', 'Valuation tracking', 'Provenance records', 'Estate planning']
    },
    {
      title: 'Watch Collectors',
      icon: Clock,
      description: 'Track your timepiece collection with service records, purchase receipts, and current market valuations.',
      benefits: ['Service history', 'Market tracking', 'Authentication docs', 'Legacy planning']
    },
    {
      title: 'Galleries & Dealers',
      icon: Building2,
      description: 'Manage inventory, artist portfolios, and client collections in one professional platform.',
      benefits: ['Inventory management', 'Client portals', 'Sales documentation', 'White-label option']
    }
  ];

  const SignupModal = () => (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-white/10 max-w-md w-full relative">
        <button 
          onClick={() => {
            setShowSignup(false);
            setSignupStep(1);
            setFormData({ name: '', email: '', password: '', vaultType: '' });
            setError('');
            setSuccess('');
          }}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              {success}
            </div>
          )}

          {signupStep === 1 && (
            <>
              <h2 className="text-2xl font-light mb-2 tracking-wide">Create Your Account</h2>
              <p className="text-white/50 text-sm mb-8">Start preserving your assets today. Free forever.</p>

              <form onSubmit={(e) => { e.preventDefault(); setSignupStep(2); }} className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Password</label>
                  <div className="relative">
                    <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="Minimum 8 characters"
                      required
                      minLength={8}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-white text-black hover:bg-white/90 transition-colors text-sm tracking-wide mt-6"
                >
                  Continue
                </button>

                <p className="text-xs text-white/40 text-center mt-4">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </>
          )}

          {signupStep === 2 && (
            <>
              <h2 className="text-2xl font-light mb-2 tracking-wide">Choose Your Vault Type</h2>
              <p className="text-white/50 text-sm mb-8">This helps us customize your experience. You can change this later.</p>

              <form onSubmit={handleSignup} className="space-y-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, vaultType: 'creator'})}
                  className={`w-full p-6 border ${formData.vaultType === 'creator' ? 'border-white/30 bg-white/5' : 'border-white/10 hover:border-white/20'} transition-colors text-left`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-light">Creator Vault</h3>
                    {formData.vaultType === 'creator' && <Check className="w-5 h-5" />}
                  </div>
                  <p className="text-sm text-white/60">
                    For artists, photographers, designers, and creative professionals documenting their work.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({...formData, vaultType: 'collector'})}
                  className={`w-full p-6 border ${formData.vaultType === 'collector' ? 'border-white/30 bg-white/5' : 'border-white/10 hover:border-white/20'} transition-colors text-left`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-light">Collector Vault</h3>
                    {formData.vaultType === 'collector' && <Check className="w-5 h-5" />}
                  </div>
                  <p className="text-sm text-white/60">
                    For collectors of art, watches, wine, memorabilia, and other valuable assets.
                  </p>
                </button>

                <button 
                  type="submit"
                  disabled={!formData.vaultType}
                  className="w-full py-3 bg-white text-black hover:bg-white/90 transition-colors text-sm tracking-wide mt-6 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Create My Vault
                </button>

                <button 
                  type="button"
                  onClick={() => setSignupStep(1)}
                  className="w-full py-3 border border-white/10 hover:bg-white/5 transition-colors text-sm tracking-wide"
                >
                  Back
                </button>
              </form>
            </>
          )}

          {signupStep === 3 && (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-light mb-2 tracking-wide">Welcome to ARCHON</h2>
                <p className="text-white/50 text-sm">Your vault is ready. Time to preserve what matters.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 mb-6">
                <h3 className="text-sm font-light mb-4 tracking-wide">Your Free Account Includes:</h3>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 text-white/40 flex-shrink-0" />
                    <span>5 assets with permanent storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 text-white/40 flex-shrink-0" />
                    <span>Private vault with password-protected sharing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 text-white/40 flex-shrink-0" />
                    <span>Basic documentation and provenance tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 text-white/40 flex-shrink-0" />
                    <span>3 PDF exports per month</span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const LoginModal = () => (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-white/10 max-w-md w-full relative">
        <button 
          onClick={() => { setShowLogin(false); setError(''); }}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-light mb-2 tracking-wide">Welcome Back</h2>
          <p className="text-white/50 text-sm mb-8">Sign in to access your vault.</p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  name="email"
                  className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Password</label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  name="password"
                  className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-white text-black hover:bg-white/90 transition-colors text-sm tracking-wide mt-6"
            >
              Sign In
            </button>

            <p className="text-sm text-white/50 text-center mt-4">
              Don't have an account?{' '}
              <button 
                type="button"
                onClick={() => { setShowLogin(false); setShowSignup(true); }}
                className="text-white hover:text-white/80 transition-colors"
              >
                Sign up free
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );

  const VaultView = () => (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-light tracking-wider">ARCHON</h1>
          
          <div className="flex items-center gap-6">
            <span className="text-sm text-white/50">
              {userProfile?.full_name || user?.email}
            </span>
            <button 
              onClick={handleLogout}
              className="text-white/60 hover:text-white transition-colors text-sm tracking-wide flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Vault Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-light tracking-wide mb-2">
              {userProfile?.vault_type === 'creator' ? 'Creative Vault' : 'Collection Vault'}
            </h2>
            <p className="text-white/50 text-sm">
              {assets.length} of {userProfile?.plan_tier === 'starter' ? '5' : '∞'} assets · 
              <span className="ml-2 text-white/70">{userProfile?.plan_tier?.toUpperCase() || 'STARTER'} Plan</span>
            </p>
          </div>
          
          {canUploadMore() ? (
            <button className="px-6 py-3 bg-white text-black hover:bg-white/90 transition-all flex items-center gap-2 text-sm tracking-wide">
              <Plus className="w-4 h-4" />
              NEW ASSET
            </button>
          ) : (
            <button 
              onClick={() => setView('landing')}
              className="px-6 py-3 border border-white/30 hover:bg-white/5 transition-all flex items-center gap-2 text-sm tracking-wide"
            >
              <Crown className="w-4 h-4" />
              UPGRADE TO ADD MORE
            </button>
          )}
        </div>

        {assets.length === 0 ? (
          <div className="border border-white/10 border-dashed p-16 text-center">
            <Upload className="w-16 h-16 mx-auto mb-4 text-white/20" />
            <h3 className="text-xl font-light mb-2">Your vault is empty</h3>
            <p className="text-white/50 mb-6">Upload your first asset to get started</p>
            <button className="px-8 py-3 bg-white text-black hover:bg-white/90 transition-colors text-sm tracking-wide">
              UPLOAD FIRST ASSET
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assets.map(asset => (
              <div key={asset.id} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-zinc-900 mb-4 overflow-hidden relative">
                  {asset.image_url && (
                    <img 
                      src={asset.image_url} 
                      alt={asset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-3 right-3">
                    <Lock className="w-4 h-4 text-white/60" />
                  </div>
                </div>
                
                <h3 className="text-lg font-light mb-1">{asset.title}</h3>
                <p className="text-sm text-white/50">{asset.year} · {asset.medium}</p>
              </div>
            ))}
          </div>
        )}

        {/* Upgrade CTA if on free plan */}
        {userProfile?.plan_tier === 'starter' && assets.length >= 3 && (
          <div className="mt-12 border border-white/20 p-8 bg-white/[0.02]">
            <div className="max-w-2xl mx-auto text-center">
              <Crown className="w-12 h-12 mx-auto mb-4 text-white/40" />
              <h3 className="text-2xl font-light mb-3">Ready for More?</h3>
              <p className="text-white/60 mb-6">
                You've used {assets.length} of your 5 free assets. Upgrade to Professional for unlimited storage, 
                high-res uploads, and advanced features.
              </p>
              <button 
                onClick={() => setView('landing')}
                className="px-8 py-3 bg-white text-black hover:bg-white/90 transition-colors text-sm tracking-wide"
              >
                VIEW PLANS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const LandingView = () => (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-light tracking-[0.3em]">ARCHON</h1>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button 
                  onClick={() => setView('vault')}
                  className="text-sm tracking-wide text-white/60 hover:text-white transition-colors"
                >
                  My Vault
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-6 py-2 border border-white/30 hover:bg-white/5 transition-colors text-sm tracking-wide"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setShowLogin(true)}
                  className="text-sm tracking-wide text-white/60 hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setShowSignup(true)}
                  className="px-6 py-2 bg-white text-black hover:bg-white/90 transition-colors text-sm tracking-wide"
                >
                  Start Free
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 border border-white rotate-45" />
          <div className="absolute bottom-40 right-32 w-[500px] h-[500px] border border-white/50 rotate-12" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/30" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="mb-8 inline-block">
            <div className="flex items-center gap-3 px-4 py-2 border border-white/20 bg-white/5 backdrop-blur-sm">
              <Lock className="w-4 h-4 text-white/60" />
              <span className="text-sm tracking-wide text-white/80">Private by Default · Asset-Grade Documentation</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-wider mb-6">
            Where Art, Value,<br />and Legacy Are Preserved
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 mb-4 max-w-3xl mx-auto leading-relaxed font-light">
            The first digital vault built for creative works and valuable collections.
          </p>
          
          <p className="text-lg text-white/50 mb-12 max-w-2xl mx-auto">
            Not social media. Not cloud storage. A permanent, professional record of what matters most.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => setShowSignup(true)}
              className="px-8 py-4 bg-white text-black hover:bg-white/90 transition-all duration-300 tracking-wider text-sm font-light min-w-[200px]"
            >
              Start Free — 5 Assets
            </button>
            <button 
              className="px-8 py-4 border border-white/30 hover:bg-white/5 transition-all duration-300 tracking-wider text-sm font-light min-w-[200px]"
            >
              View Pricing
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>14-day trial on paid plans</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 px-6 border-t border-white/10 bg-gradient-to-b from-transparent to-zinc-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-4">Built Different</h2>
            <p className="text-white/50 text-lg">Professional tools for assets that deserve better than folders and files</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-white/60" />
              </div>
              <h3 className="text-xl font-light mb-4 tracking-wide">Private by Default</h3>
              <p className="text-white/60 leading-relaxed">
                Your vault remains completely private until you choose to share. No public feeds, no algorithms, no data mining.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white/60" />
              </div>
              <h3 className="text-xl font-light mb-4 tracking-wide">Digital Provenance</h3>
              <p className="text-white/60 leading-relaxed">
                Immutable creation timestamps, ownership records, and exportable documentation for insurance and estate planning.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white/60" />
              </div>
              <h3 className="text-xl font-light mb-4 tracking-wide">Asset-Grade Records</h3>
              <p className="text-white/60 leading-relaxed">
                Track valuations, document provenance, and maintain professional records worthy of your most valuable assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-4">Who Uses ARCHON</h2>
            <p className="text-white/50 text-lg">Built for creators and collectors who take their work seriously</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, idx) => (
              <div key={idx} className="border border-white/10 p-8 hover:border-white/20 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/5 rounded flex items-center justify-center flex-shrink-0">
                    <useCase.icon className="w-6 h-6 text-white/60" />
                  </div>
                  <div>
                    <h3 className="text-xl font-light mb-2">{useCase.title}</h3>
                    <p className="text-white/60 text-sm">{useCase.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 mt-4">
                  {useCase.benefits.map((benefit, bidx) => (
                    <li key={bidx} className="flex items-center gap-2 text-sm text-white/50">
                      <Check className="w-4 h-4 text-white/30" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 border-t border-white/10 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-4">Choose Your Plan</h2>
            <p className="text-white/50 text-lg mb-8">Start free, upgrade when you need more</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan, idx) => (
              <div 
                key={idx}
                className={`border ${plan.popular ? 'border-white/30 relative' : 'border-white/10'} p-6 hover:border-white/20 transition-colors flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 text-xs tracking-wider">
                    MOST POPULAR
                  </div>
                )}
                
                <h3 className="text-2xl font-light mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-light">{plan.price}</span>
                  {plan.period && <span className="text-white/50 text-sm"> /{plan.period}</span>}
                </div>
                <p className="text-sm text-white/50 mb-6">{plan.description}</p>
                
                <button 
                  onClick={() => {
                    if (plan.name === 'Starter') {
                      setShowSignup(true);
                    } else {
                      alert('Stripe integration coming soon! For now, start with the free plan.');
                    }
                  }}
                  className={`w-full py-3 ${plan.popular ? 'bg-white text-black hover:bg-white/90' : 'border border-white/20 hover:bg-white/5'} transition-colors text-sm tracking-wide mb-6`}
                >
                  {plan.cta}
                </button>

                <div className="border-t border-white/10 pt-6 flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-2 text-sm text-white/70">
                        <Check className="w-4 h-4 mt-0.5 text-white/40 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-light tracking-wide mb-6">
            Start Preserving Your Legacy Today
          </h2>
          <p className="text-xl text-white/60 mb-12 leading-relaxed">
            Join creators and collectors who trust ARCHON with their most valuable assets.
          </p>
          
          <button 
            onClick={() => setShowSignup(true)}
            className="px-10 py-4 bg-white text-black hover:bg-white/90 transition-all duration-300 tracking-wider text-sm font-light"
          >
            Create Free Account
          </button>
        </div>
      </section>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Archive className="w-12 h-12 mx-auto mb-4 text-white/40 animate-pulse" />
          <p className="text-white/60">Loading ARCHON...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased">
      {showSignup && <SignupModal />}
      {showLogin && <LoginModal />}
      
      {view === 'landing' && <LandingView />}
      {view === 'vault' && user && <VaultView />}
    </div>
  );
};

export default ARCHONApp;