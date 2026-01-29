import React, { useState } from 'react';
import { Lock, Eye, Shield, TrendingUp, Clock, FileText, Download, Share2, Users, Zap, Crown, Check, X, ChevronRight, Upload, Image, Award, AlertCircle, Mail, Key, User, ChevronDown, ExternalLink, Database, Smartphone, Globe, Archive, BookOpen, Briefcase, Building2 } from 'lucide-react';

const ARCHONLanding = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [signupStep, setSignupStep] = useState(1); // 1: info, 2: verification, 3: vault type
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showFeatures, setShowFeatures] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    vaultType: '' // 'creator' or 'collector'
  });

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
      ],
      limits: {
        assets: 5,
        storage: '500MB',
        exports: '3 per month',
        sharing: 'Private links only'
      }
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
      ],
      limits: {
        assets: 'Unlimited',
        storage: '50GB',
        exports: 'Unlimited',
        sharing: 'Public & private galleries'
      }
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
      ],
      limits: {
        assets: 'Unlimited',
        storage: '250GB',
        exports: 'Unlimited',
        sharing: 'Full control + custom domains'
      },
      badge: 'Most Popular for Serious Collectors'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For galleries, museums, and institutions',
      cta: 'Contact Sales',
      popular: false,
      features: [
        'Everything in Collector, plus:',
        'White-label platform',
        'Custom branding',
        'SSO/SAML authentication',
        'Unlimited team members',
        'Role-based access control',
        'Advanced security (SOC 2, ISO 27001)',
        'Dedicated account manager',
        '24/7 priority support',
        'Custom integrations',
        'Data migration assistance',
        'Training & workshops',
        'SLA guarantee (99.9% uptime)',
        'Custom storage limits',
        'Advanced analytics dashboard',
        'Blockchain provenance (optional)',
        'Multi-location backup'
      ],
      limits: {
        assets: 'Unlimited',
        storage: 'Custom',
        exports: 'Unlimited',
        sharing: 'Enterprise features'
      }
    }
  ];

  const featureCategories = [
    {
      category: 'Asset Management',
      icon: Archive,
      features: [
        {
          name: 'Asset Upload & Storage',
          free: '5 assets, 500MB',
          pro: 'Unlimited, 50GB',
          collector: 'Unlimited, 250GB',
          enterprise: 'Unlimited, Custom'
        },
        {
          name: 'Image Resolution',
          free: 'Standard (up to 5MB)',
          pro: 'High-res (up to 50MB)',
          collector: 'High-res (up to 50MB)',
          enterprise: 'Ultra high-res (unlimited)'
        },
        {
          name: 'Supported File Types',
          free: 'JPG, PNG',
          pro: 'JPG, PNG, TIFF, RAW, PDF',
          collector: 'All formats + 3D models',
          enterprise: 'All formats + custom'
        },
        {
          name: 'Batch Upload',
          free: false,
          pro: 'Up to 50 at once',
          collector: 'Up to 200 at once',
          enterprise: 'Unlimited + API'
        },
        {
          name: 'Version History',
          free: false,
          pro: '30 days',
          collector: 'Unlimited',
          enterprise: 'Unlimited + audit log'
        }
      ]
    },
    {
      category: 'Documentation & Provenance',
      icon: FileText,
      features: [
        {
          name: 'Basic Metadata',
          free: 'Title, year, medium',
          pro: 'Full metadata suite',
          collector: 'Full + custom fields',
          enterprise: 'Full + custom + bulk edit'
        },
        {
          name: 'Provenance Timeline',
          free: 'Basic log',
          pro: 'Detailed timeline',
          collector: 'Advanced with documents',
          enterprise: 'Blockchain-verified (optional)'
        },
        {
          name: 'Story & Description',
          free: 'Up to 500 characters',
          pro: 'Unlimited',
          collector: 'Unlimited + rich media',
          enterprise: 'Unlimited + multimedia'
        },
        {
          name: 'Document Attachments',
          free: false,
          pro: 'Up to 10 per asset',
          collector: 'Unlimited',
          enterprise: 'Unlimited + OCR search'
        },
        {
          name: 'Certificate Generator',
          free: false,
          pro: false,
          collector: 'Included',
          enterprise: 'Custom templates'
        },
        {
          name: 'Condition Reports',
          free: false,
          pro: false,
          collector: 'Included',
          enterprise: 'Included + AI analysis'
        }
      ]
    },
    {
      category: 'Valuation & Financial',
      icon: TrendingUp,
      features: [
        {
          name: 'Purchase Price Tracking',
          free: false,
          pro: 'Basic',
          collector: 'Advanced with history',
          enterprise: 'Advanced + portfolio analytics'
        },
        {
          name: 'Current Value Tracking',
          free: false,
          pro: 'Manual entry',
          collector: 'Manual + appraisal docs',
          enterprise: 'Manual + market integration'
        },
        {
          name: 'Value History Chart',
          free: false,
          pro: false,
          collector: 'Included',
          enterprise: 'Advanced analytics'
        },
        {
          name: 'Insurance Documentation',
          free: false,
          pro: 'Basic exports',
          collector: 'Full suite + templates',
          enterprise: 'Direct insurer integration'
        },
        {
          name: 'Tax Documentation',
          free: false,
          pro: false,
          collector: 'Export ready',
          enterprise: 'CPA integration ready'
        },
        {
          name: 'Portfolio Valuation',
          free: false,
          pro: false,
          collector: 'Total value tracking',
          enterprise: 'Advanced portfolio analytics'
        }
      ]
    },
    {
      category: 'Sharing & Presentation',
      icon: Share2,
      features: [
        {
          name: 'Private Vault',
          free: true,
          pro: true,
          collector: true,
          enterprise: true
        },
        {
          name: 'Private Share Links',
          free: 'Password protected',
          pro: 'Advanced permissions',
          collector: 'Advanced + expiration',
          enterprise: 'Advanced + tracking'
        },
        {
          name: 'Public Galleries',
          free: false,
          pro: 'Up to 5 galleries',
          collector: 'Unlimited galleries',
          enterprise: 'Unlimited + white-label'
        },
        {
          name: 'Custom Domain',
          free: false,
          pro: false,
          collector: 'Optional add-on',
          enterprise: 'Included'
        },
        {
          name: 'Presentation Mode',
          free: 'Basic slideshow',
          pro: 'Advanced slideshow',
          collector: 'Advanced + curator notes',
          enterprise: 'Custom presentation tools'
        },
        {
          name: 'QR Code Generation',
          free: false,
          pro: 'Included',
          collector: 'Included',
          enterprise: 'Included + custom branding'
        }
      ]
    },
    {
      category: 'Export & Backup',
      icon: Download,
      features: [
        {
          name: 'PDF Reports',
          free: '3/month (watermarked)',
          pro: 'Unlimited (no watermark)',
          collector: 'Professional templates',
          enterprise: 'Custom templates'
        },
        {
          name: 'Data Export',
          free: 'CSV only',
          pro: 'CSV, JSON',
          collector: 'All formats + images',
          enterprise: 'All formats + API'
        },
        {
          name: 'Bulk Download',
          free: false,
          pro: 'Included',
          collector: 'Included',
          enterprise: 'Included'
        },
        {
          name: 'Automatic Backup',
          free: false,
          pro: 'Daily backup',
          collector: 'Multi-location backup',
          enterprise: 'Custom backup strategy'
        },
        {
          name: 'Print-Ready Outputs',
          free: false,
          pro: 'Standard quality',
          collector: 'Museum quality',
          enterprise: 'Museum + custom specs'
        }
      ]
    },
    {
      category: 'Collaboration & Access',
      icon: Users,
      features: [
        {
          name: 'Additional Users',
          free: 'Solo only',
          pro: 'Up to 2 collaborators',
          collector: 'Unlimited',
          enterprise: 'Unlimited + teams'
        },
        {
          name: 'Role Permissions',
          free: false,
          pro: 'View / Edit',
          collector: 'Custom roles',
          enterprise: 'Advanced RBAC'
        },
        {
          name: 'Estate Planning',
          free: false,
          pro: false,
          collector: 'Beneficiary access',
          enterprise: 'Advanced succession'
        },
        {
          name: 'Activity Log',
          free: false,
          pro: '30 days',
          collector: 'Unlimited',
          enterprise: 'Unlimited + audit trail'
        },
        {
          name: 'Comments & Notes',
          free: 'Personal notes only',
          pro: 'Team comments',
          collector: 'Team + curator notes',
          enterprise: 'Advanced collaboration'
        }
      ]
    },
    {
      category: 'Security & Privacy',
      icon: Shield,
      features: [
        {
          name: 'Encryption',
          free: 'In transit',
          pro: 'In transit + at rest',
          collector: 'In transit + at rest',
          enterprise: 'End-to-end + HSM'
        },
        {
          name: 'Two-Factor Auth',
          free: 'Optional',
          pro: 'Optional',
          collector: 'Recommended',
          enterprise: 'Required + SSO'
        },
        {
          name: 'Privacy Controls',
          free: 'Basic',
          pro: 'Advanced',
          collector: 'Advanced',
          enterprise: 'Enterprise-grade'
        },
        {
          name: 'Compliance',
          free: 'GDPR',
          pro: 'GDPR, CCPA',
          collector: 'GDPR, CCPA',
          enterprise: 'SOC 2, ISO 27001'
        },
        {
          name: 'Data Deletion',
          free: 'Standard',
          pro: 'Immediate',
          collector: 'Immediate + verified',
          enterprise: 'Custom retention policy'
        }
      ]
    },
    {
      category: 'Support & Services',
      icon: Briefcase,
      features: [
        {
          name: 'Support Channel',
          free: 'Email only',
          pro: 'Priority email',
          collector: 'Email + phone',
          enterprise: '24/7 dedicated team'
        },
        {
          name: 'Response Time',
          free: '48 hours',
          pro: '24 hours',
          collector: '4 hours',
          enterprise: '1 hour SLA'
        },
        {
          name: 'Onboarding',
          free: 'Self-service',
          pro: 'Email guide',
          collector: 'White-glove setup',
          enterprise: 'Dedicated onboarding'
        },
        {
          name: 'Training',
          free: 'Help docs',
          pro: 'Help docs + videos',
          collector: 'Personal training session',
          enterprise: 'Custom workshops'
        },
        {
          name: 'Account Manager',
          free: false,
          pro: false,
          collector: false,
          enterprise: 'Dedicated manager'
        }
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

  const faqs = [
    {
      q: 'What happens to my 5 free assets if I upgrade?',
      a: 'Your free assets are fully preserved and become part of your paid account with all premium features unlocked. Nothing is lost or degraded.'
    },
    {
      q: 'Can I export my data if I decide to leave?',
      a: 'Absolutely. You maintain complete ownership of your data. Export everything in multiple formats (CSV, JSON, high-res images, PDFs) at any time, even after canceling.'
    },
    {
      q: 'How is this different from Google Drive or Dropbox?',
      a: 'ARCHON treats your items as assets, not files. We provide structured documentation, provenance tracking, valuation records, and presentation-grade interfaces that cloud storage cannot offer.'
    },
    {
      q: 'Is my data secure and private?',
      a: 'Yes. All data is encrypted in transit and at rest. Your vault is private by default. You control exactly what is shared and with whom. We never sell or monetize your data.'
    },
    {
      q: 'What image quality can I upload?',
      a: 'Free accounts support standard resolution. Professional accounts support high-resolution up to 50MB per image. Collector accounts support all formats including RAW, TIFF, and 3D models.'
    },
    {
      q: 'Can I use this for insurance claims?',
      a: 'Yes. Collector tier includes insurance documentation templates and export formats specifically designed for insurance companies. Many of our users have successfully used ARCHON documentation for claims.'
    },
    {
      q: 'What is digital provenance?',
      a: 'Every asset in ARCHON receives an immutable timestamp and change log. This creates a permanent, verifiable record of creation, ownership, and modifications—critical for authenticity and value.'
    },
    {
      q: 'Can I share specific items without making my entire vault public?',
      a: 'Yes. You can create private, password-protected links for individual assets or curated galleries. Control exactly who sees what, with optional expiration dates.'
    },
    {
      q: 'Do you offer refunds?',
      a: 'Yes. We offer a 14-day money-back guarantee on all paid plans. If ARCHON isn\'t right for you, we\'ll refund your payment, no questions asked.'
    },
    {
      q: 'What happens if I exceed my asset limit on the free plan?',
      a: 'You\'ll be prompted to upgrade to continue adding assets. Your existing 5 assets remain fully accessible. We\'ll never hold your data hostage.'
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
          }}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {signupStep === 1 && (
            <>
              <h2 className="text-2xl font-light mb-2 tracking-wide">Create Your Account</h2>
              <p className="text-white/50 text-sm mb-8">Start preserving your assets today. Free forever.</p>

              <div className="space-y-4">
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
                    />
                  </div>
                </div>

                <button 
                  onClick={() => setSignupStep(2)}
                  className="w-full py-3 bg-white text-black hover:bg-white/90 transition-colors text-sm tracking-wide mt-6"
                >
                  Continue
                </button>

                <p className="text-xs text-white/40 text-center mt-4">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </>
          )}

          {signupStep === 2 && (
            <>
              <h2 className="text-2xl font-light mb-2 tracking-wide">Choose Your Vault Type</h2>
              <p className="text-white/50 text-sm mb-8">This helps us customize your experience. You can change this later.</p>

              <div className="space-y-4">
                <button
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
                  onClick={() => setSignupStep(3)}
                  disabled={!formData.vaultType}
                  className="w-full py-3 bg-white text-black hover:bg-white/90 transition-colors text-sm tracking-wide mt-6 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Create My Vault
                </button>

                <button 
                  onClick={() => setSignupStep(1)}
                  className="w-full py-3 border border-white/10 hover:bg-white/5 transition-colors text-sm tracking-wide"
                >
                  Back
                </button>
              </div>
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

              <button 
                onClick={() => {
                  setShowSignup(false);
                  setSignupStep(1);
                  alert('In production, this would create your account and redirect you to the vault interface to upload your first assets.');
                }}
                className="w-full py-3 bg-white text-black hover:bg-white/90 transition-colors text-sm tracking-wide mb-4"
              >
                Go to My Vault
              </button>

              <p className="text-xs text-white/40 text-center">
                A verification email has been sent to {formData.email}
              </p>
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
          onClick={() => setShowLogin(false)}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-light mb-2 tracking-wide">Welcome Back</h2>
          <p className="text-white/50 text-sm mb-8">Sign in to access your vault.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Password</label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-white/60">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <button className="text-white/60 hover:text-white transition-colors">
                Forgot password?
              </button>
            </div>

            <button 
              onClick={() => alert('In production, this would authenticate and redirect to the vault.')}
              className="w-full py-3 bg-white text-black hover:bg-white/90 transition-colors text-sm tracking-wide mt-6"
            >
              Sign In
            </button>

            <p className="text-sm text-white/50 text-center mt-4">
              Don't have an account?{' '}
              <button 
                onClick={() => { setShowLogin(false); setShowSignup(true); }}
                className="text-white hover:text-white/80 transition-colors"
              >
                Sign up free
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      {showSignup && <SignupModal />}
      {showLogin && <LoginModal />}

      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-light tracking-[0.3em]">ARCHON</h1>
          
          <div className="hidden md:flex items-center gap-8 text-sm tracking-wide">
            <a href="#features" className="text-white/60 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-white/60 hover:text-white transition-colors">Pricing</a>
            <a href="#use-cases" className="text-white/60 hover:text-white transition-colors">Use Cases</a>
            <a href="#faq" className="text-white/60 hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-4">
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
            <a 
              href="#pricing"
              className="px-8 py-4 border border-white/30 hover:bg-white/5 transition-all duration-300 tracking-wider text-sm font-light min-w-[200px]"
            >
              View Pricing
            </a>
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
                Your vault remains completely private until you choose to share. No public feeds, no algorithms, no data mining. Complete control over visibility.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white/60" />
              </div>
              <h3 className="text-xl font-light mb-4 tracking-wide">Digital Provenance</h3>
              <p className="text-white/60 leading-relaxed">
                Immutable creation timestamps, ownership records, and exportable documentation. Build a verifiable history for insurance, sales, and estate planning.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white/60" />
              </div>
              <h3 className="text-xl font-light mb-4 tracking-wide">Asset-Grade Records</h3>
              <p className="text-white/60 leading-relaxed">
                Track valuations, document provenance, and maintain professional records worthy of your most valuable creative works and collections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-24 px-6 border-t border-white/10">
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
      <section id="pricing" className="py-24 px-6 border-t border-white/10 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-4">Choose Your Plan</h2>
            <p className="text-white/50 text-lg mb-8">Start free, upgrade when you need more</p>
            <div className="flex items-center justify-center gap-2 text-sm text-white/50">
              <AlertCircle className="w-4 h-4" />
              <span>All paid plans include a 14-day free trial. Cancel anytime.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                {plan.badge && (
                  <div className="bg-white/10 text-xs px-3 py-1 mb-4 text-center tracking-wide">
                    {plan.badge}
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
                    } else if (plan.name === 'Enterprise') {
                      alert('In production, this would open a contact form or redirect to a sales page.');
                    } else {
                      setSelectedPlan(plan);
                      setShowSignup(true);
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

          <div className="text-center">
            <button 
              onClick={() => setShowFeatures(!showFeatures)}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm tracking-wide"
            >
              <span>View Complete Feature Comparison</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFeatures ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      {showFeatures && (
        <section id="features" className="py-24 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-4">Complete Feature Breakdown</h2>
              <p className="text-white/50 text-lg">Every feature, every tier, side by side</p>
            </div>

            <div className="space-y-12">
              {featureCategories.map((category, cidx) => (
                <div key={cidx}>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/20">
                    <category.icon className="w-6 h-6 text-white/60" />
                    <h3 className="text-2xl font-light tracking-wide">{category.category}</h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-4 pr-4 font-light text-white/60 w-1/4">Feature</th>
                          <th className="text-left py-4 px-4 font-light text-white/60">Starter</th>
                          <th className="text-left py-4 px-4 font-light text-white/60">Professional</th>
                          <th className="text-left py-4 px-4 font-light text-white/60">Collector</th>
                          <th className="text-left py-4 pl-4 font-light text-white/60">Enterprise</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.features.map((feature, fidx) => (
                          <tr key={fidx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 pr-4 text-white/80">{feature.name}</td>
                            <td className="py-4 px-4">
                              {typeof feature.free === 'boolean' ? (
                                feature.free ? <Check className="w-5 h-5 text-white/40" /> : <X className="w-5 h-5 text-white/20" />
                              ) : (
                                <span className="text-white/60">{feature.free}</span>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              {typeof feature.pro === 'boolean' ? (
                                feature.pro ? <Check className="w-5 h-5 text-white/40" /> : <X className="w-5 h-5 text-white/20" />
                              ) : (
                                <span className="text-white/60">{feature.pro}</span>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              {typeof feature.collector === 'boolean' ? (
                                feature.collector ? <Check className="w-5 h-5 text-white/40" /> : <X className="w-5 h-5 text-white/20" />
                              ) : (
                                <span className="text-white/60">{feature.collector}</span>
                              )}
                            </td>
                            <td className="py-4 pl-4">
                              {typeof feature.enterprise === 'boolean' ? (
                                feature.enterprise ? <Check className="w-5 h-5 text-white/40" /> : <X className="w-5 h-5 text-white/20" />
                              ) : (
                                <span className="text-white/60">{feature.enterprise}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 border-t border-white/10 bg-zinc-950/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-4">Frequently Asked Questions</h2>
            <p className="text-white/50 text-lg">Everything you need to know about ARCHON</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-white/10">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-light text-lg pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-white/40 flex-shrink-0 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 pb-6 text-white/60 leading-relaxed border-t border-white/5 pt-6">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 border-t border-white/10 bg-gradient-to-b from-transparent to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-light tracking-wide mb-6">
            Start Preserving Your Legacy Today
          </h2>
          <p className="text-xl text-white/60 mb-12 leading-relaxed">
            Join creators and collectors who trust ARCHON with their most valuable assets.
            Free to start, no credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => setShowSignup(true)}
              className="px-10 py-4 bg-white text-black hover:bg-white/90 transition-all duration-300 tracking-wider text-sm font-light min-w-[240px]"
            >
              Create Free Account
            </button>
            <a 
              href="#pricing"
              className="px-10 py-4 border border-white/30 hover:bg-white/5 transition-all duration-300 tracking-wider text-sm font-light min-w-[240px]"
            >
              Compare Plans
            </a>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-white/40 flex-wrap">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Bank-level security</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>5 minutes to get started</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Join 10,000+ users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-sm font-light tracking-wide mb-4 text-white/60">Product</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-light tracking-wide mb-4 text-white/60">Company</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-light tracking-wide mb-4 text-white/60">Resources</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-light tracking-wide mb-4 text-white/60">Legal</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">© 2026 ARCHON. All rights reserved.</p>
            <div className="flex items-center gap-6 text-white/40">
              <a href="#" className="hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <ExternalLink className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <ExternalLink className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ARCHONLanding;