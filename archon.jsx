import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Share2, Download, Clock, TrendingUp, Shield, Camera, FileText, ExternalLink, Plus, Grid, List, Search, Filter, ChevronRight, ChevronLeft, X, Check } from 'lucide-react';

const ARCHON = () => {
  const [view, setView] = useState('landing'); // landing, vault, asset, share
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [vaultView, setVaultView] = useState('grid'); // grid, list
  const [assetType, setAssetType] = useState('creator'); // creator, collector
  
  // Sample data structure
  const sampleAssets = {
    creator: [
      {
        id: 1,
        title: "Untitled (Urban Series)",
        year: 2024,
        medium: "Oil on canvas",
        dimensions: "48 × 36 inches",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%231a1a1a' width='800' height='600'/%3E%3Cpath d='M200,150 L600,150 L600,450 L200,450 Z' fill='%23333' stroke='%23666' stroke-width='2'/%3E%3Cpath d='M250,200 L550,200 L550,400 L250,400 Z' fill='%23444'/%3E%3C/svg%3E",
        visibility: 'private',
        created: '2024-01-15',
        story: "Part of an ongoing exploration of liminal spaces in contemporary urban environments. This piece captures the threshold between public and private consciousness.",
        exhibitions: ['Solo Show, Gallery DISTINCTION, 2024'],
        value: null,
        provenance: [
          { date: '2024-01-15', event: 'Created', details: 'Artist studio, Brooklyn' }
        ]
      },
      {
        id: 2,
        title: "Ephemeral Architecture",
        year: 2023,
        medium: "Digital sculpture",
        dimensions: "Variable",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%231a1a1a' width='800' height='600'/%3E%3Cpolygon points='400,100 600,300 400,500 200,300' fill='%23333' stroke='%23888' stroke-width='2'/%3E%3Cpolygon points='400,150 550,300 400,450 250,300' fill='%23444'/%3E%3C/svg%3E",
        visibility: 'shared',
        created: '2023-11-03',
        story: "Commissioned work exploring the intersection of permanence and impermanence through parametric design.",
        exhibitions: ['Art Basel Miami, 2023', 'Venice Biennale Preview, 2024'],
        value: '$45,000',
        provenance: [
          { date: '2023-11-03', event: 'Created', details: 'Studio commission' },
          { date: '2023-12-15', event: 'First exhibition', details: 'Art Basel Miami' }
        ]
      }
    ],
    collector: [
      {
        id: 3,
        title: "Patek Philippe Nautilus 5711",
        year: 2019,
        medium: "Timepiece",
        dimensions: "40mm case diameter",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%231a1a1a' width='800' height='600'/%3E%3Ccircle cx='400' cy='300' r='150' fill='%23222' stroke='%23888' stroke-width='4'/%3E%3Ccircle cx='400' cy='300' r='120' fill='%23333'/%3E%3Cline x1='400' y1='300' x2='400' y2='200' stroke='%23aaa' stroke-width='3'/%3E%3Cline x1='400' y1='300' x2='480' y2='300' stroke='%23aaa' stroke-width='2'/%3E%3C/svg%3E",
        visibility: 'private',
        created: '2019-03-20',
        story: "Acquired at retail before the discontinuation announcement. Blue dial reference 5711/1A-010. Final year of production for this iconic reference.",
        value: '$145,000',
        purchasePrice: '$34,890',
        provenance: [
          { date: '2019-03-20', event: 'Purchased', details: 'Authorized Dealer, Geneva' },
          { date: '2021-06-15', event: 'Serviced', details: 'Patek Philippe Service Center' },
          { date: '2024-01-10', event: 'Appraised', details: 'Christie\'s - $145,000' }
        ],
        documents: ['Certificate of Origin', 'Service Records', 'Appraisal Report', 'Insurance Policy']
      }
    ]
  };

  const allAssets = [...sampleAssets.creator, ...sampleAssets.collector];

  const LandingView = () => (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border border-white/20 rotate-45" />
          <div className="absolute bottom-40 right-32 w-96 h-96 border border-white/10 rotate-12" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <div className="mb-6">
            <h1 className="text-7xl font-light tracking-wider mb-4">ARCHON</h1>
            <div className="h-px w-32 mx-auto bg-white/40" />
          </div>
          
          <p className="text-2xl font-light text-white/80 mb-12 tracking-wide">
            Where Art, Value, and Legacy Are Preserved
          </p>
          
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-16 leading-relaxed">
            The first asset-grade digital vault for creative works and valuable collections.
            Private by default. Museum-quality presentation. Built for legacy.
          </p>
          
          <div className="flex gap-6 justify-center">
            <button 
              onClick={() => { setAssetType('creator'); setView('vault'); }}
              className="px-10 py-4 bg-white text-black hover:bg-white/90 transition-all duration-300 tracking-wider font-light text-sm"
            >
              FOR CREATORS
            </button>
            <button 
              onClick={() => { setAssetType('collector'); setView('vault'); }}
              className="px-10 py-4 border border-white/30 hover:bg-white/5 transition-all duration-300 tracking-wider font-light text-sm"
            >
              FOR COLLECTORS
            </button>
          </div>
        </div>
      </div>

      {/* Value Propositions */}
      <div className="py-32 px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center">
            <Lock className="w-12 h-12 mx-auto mb-6 text-white/60" />
            <h3 className="text-xl font-light mb-4 tracking-wide">Private by Default</h3>
            <p className="text-white/50 leading-relaxed">
              Your vault remains completely private until you choose to share. Control visibility at the asset level.
            </p>
          </div>
          
          <div className="text-center">
            <Shield className="w-12 h-12 mx-auto mb-6 text-white/60" />
            <h3 className="text-xl font-light mb-4 tracking-wide">Digital Provenance</h3>
            <p className="text-white/50 leading-relaxed">
              Immutable creation timestamps, ownership records, and exportable documentation for insurance and estate planning.
            </p>
          </div>
          
          <div className="text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-6 text-white/60" />
            <h3 className="text-xl font-light mb-4 tracking-wide">Asset-Grade Records</h3>
            <p className="text-white/50 leading-relaxed">
              Track valuations, document provenance, and maintain professional records worthy of your most valuable assets.
            </p>
          </div>
        </div>
      </div>

      {/* Positioning Statement */}
      <div className="py-32 px-8 bg-zinc-950 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl font-light text-white/70 leading-relaxed mb-8">
            Not social media. Not cloud storage. Not a portfolio site.
          </p>
          <p className="text-3xl font-light text-white leading-relaxed tracking-wide">
            A permanent, professional record of what matters most.
          </p>
        </div>
      </div>

      {/* Tiers Preview */}
      <div className="py-32 px-8 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-light text-center mb-20 tracking-wide">Membership Tiers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-white/10 p-8 hover:border-white/20 transition-colors">
              <h3 className="text-2xl font-light mb-2">Professional</h3>
              <p className="text-4xl font-light mb-6">$19<span className="text-lg text-white/50">/mo</span></p>
              <ul className="space-y-3 text-white/60 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-white/40" />
                  <span>Unlimited assets</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-white/40" />
                  <span>High-resolution images</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-white/40" />
                  <span>Private sharing links</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-white/40" />
                  <span>Exportable reports</span>
                </li>
              </ul>
            </div>
            
            <div className="border-2 border-white/30 p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-4 py-1 text-xs tracking-wider text-white/60">
                RECOMMENDED
              </div>
              <h3 className="text-2xl font-light mb-2">Collector</h3>
              <p className="text-4xl font-light mb-6">$69<span className="text-lg text-white/50">/mo</span></p>
              <ul className="space-y-3 text-white/60 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-white/40" />
                  <span>Everything in Professional</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-white/40" />
                  <span>Valuation tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-white/40" />
                  <span>Insurance-ready exports</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-white/40" />
                  <span>Estate access controls</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-white/40" />
                  <span>Priority support</span>
                </li>
              </ul>
            </div>
            
            <div className="border border-white/10 p-8 hover:border-white/20 transition-colors">
              <h3 className="text-2xl font-light mb-2">Enterprise</h3>
              <p className="text-4xl font-light mb-6">Custom</p>
              <ul className="space-y-3 text-white/60 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-white/40" />
                  <span>White-label solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-white/40" />
                  <span>API access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-white/40" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-white/40" />
                  <span>Dedicated support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const VaultView = () => {
    const assets = assetType === 'creator' ? sampleAssets.creator : sampleAssets.collector;
    
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
            <h1 className="text-2xl font-light tracking-wider cursor-pointer" onClick={() => setView('landing')}>
              ARCHON
            </h1>
            
            <div className="flex items-center gap-6">
              <button className="text-white/60 hover:text-white transition-colors text-sm tracking-wide">
                VAULT
              </button>
              <button className="text-white/60 hover:text-white transition-colors text-sm tracking-wide">
                SHARED
              </button>
              <button className="text-white/60 hover:text-white transition-colors text-sm tracking-wide">
                SETTINGS
              </button>
            </div>
          </div>
        </div>

        {/* Vault Controls */}
        <div className="max-w-7xl mx-auto px-8 py-8 border-b border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-light tracking-wide mb-2">
                {assetType === 'creator' ? 'Creative Vault' : 'Collection Vault'}
              </h2>
              <p className="text-white/50 text-sm">{assets.length} assets · Private</p>
            </div>
            
            <button className="px-6 py-3 bg-white text-black hover:bg-white/90 transition-all flex items-center gap-2 text-sm tracking-wide">
              <Plus className="w-4 h-4" />
              NEW ASSET
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input 
                  type="text"
                  placeholder="Search assets..."
                  className="bg-white/5 border border-white/10 pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors w-64"
                />
              </div>
              <button className="px-4 py-2 border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2 text-sm">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
            
            <div className="flex items-center gap-2 border border-white/10">
              <button 
                onClick={() => setVaultView('grid')}
                className={`p-2 ${vaultView === 'grid' ? 'bg-white/10' : 'hover:bg-white/5'} transition-colors`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setVaultView('list')}
                className={`p-2 ${vaultView === 'list' ? 'bg-white/10' : 'hover:bg-white/5'} transition-colors`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Assets Grid/List */}
        <div className="max-w-7xl mx-auto px-8 py-12">
          {vaultView === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {assets.map(asset => (
                <div 
                  key={asset.id}
                  onClick={() => { setSelectedAsset(asset); setView('asset'); }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[4/3] bg-zinc-900 mb-4 overflow-hidden relative">
                    <img 
                      src={asset.image} 
                      alt={asset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      {asset.visibility === 'private' ? (
                        <Lock className="w-4 h-4 text-white/60" />
                      ) : (
                        <Eye className="w-4 h-4 text-white/60" />
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-light mb-1">{asset.title}</h3>
                  <p className="text-sm text-white/50">{asset.year} · {asset.medium}</p>
                  {asset.value && (
                    <p className="text-sm text-white/70 mt-2">{asset.value}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {assets.map(asset => (
                <div 
                  key={asset.id}
                  onClick={() => { setSelectedAsset(asset); setView('asset'); }}
                  className="border border-white/10 p-6 hover:border-white/20 transition-colors cursor-pointer flex items-center gap-6"
                >
                  <div className="w-32 h-24 bg-zinc-900 flex-shrink-0">
                    <img src={asset.image} alt={asset.title} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-light mb-1">{asset.title}</h3>
                    <p className="text-sm text-white/50">{asset.year} · {asset.medium} · {asset.dimensions}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-white/50">
                    {asset.value && <span className="text-sm">{asset.value}</span>}
                    {asset.visibility === 'private' ? (
                      <Lock className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const AssetView = () => {
    if (!selectedAsset) return null;
    
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
            <button 
              onClick={() => setView('vault')}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm tracking-wide">BACK TO VAULT</span>
            </button>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-white/5 transition-colors rounded">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/5 transition-colors rounded">
                <Download className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 border border-white/10 hover:bg-white/5 transition-colors text-sm tracking-wide">
                EDIT
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Image */}
            <div>
              <div className="aspect-[4/3] bg-zinc-900 mb-6">
                <img 
                  src={selectedAsset.image} 
                  alt={selectedAsset.title}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="flex items-center justify-between text-sm text-white/50">
                <span>High resolution available</span>
                <button className="hover:text-white transition-colors">View full size</button>
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-light mb-3 tracking-wide">{selectedAsset.title}</h1>
                  <p className="text-white/60">{selectedAsset.year}</p>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-1 border border-white/20 text-xs tracking-wider">
                  {selectedAsset.visibility === 'private' ? (
                    <>
                      <Lock className="w-3 h-3" />
                      PRIVATE
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3" />
                      SHARED
                    </>
                  )}
                </div>
              </div>

              {/* Technical Details */}
              <div className="border-t border-b border-white/10 py-6 mb-8 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Medium</span>
                  <span>{selectedAsset.medium}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Dimensions</span>
                  <span>{selectedAsset.dimensions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Created</span>
                  <span>{new Date(selectedAsset.created).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                {selectedAsset.value && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Current Value</span>
                    <span className="font-light">{selectedAsset.value}</span>
                  </div>
                )}
                {selectedAsset.purchasePrice && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Purchase Price</span>
                    <span>{selectedAsset.purchasePrice}</span>
                  </div>
                )}
              </div>

              {/* Story */}
              {selectedAsset.story && (
                <div className="mb-8">
                  <h3 className="text-lg font-light mb-3 tracking-wide">Story</h3>
                  <p className="text-white/70 leading-relaxed">{selectedAsset.story}</p>
                </div>
              )}

              {/* Provenance */}
              <div className="mb-8">
                <h3 className="text-lg font-light mb-4 tracking-wide">Provenance</h3>
                <div className="space-y-4">
                  {selectedAsset.provenance.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-white/40" />
                        {idx < selectedAsset.provenance.length - 1 && (
                          <div className="w-px h-full bg-white/10 mt-1" />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm text-white/90 mb-1">{item.event}</p>
                        <p className="text-xs text-white/50">{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p className="text-xs text-white/50 mt-1">{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exhibitions */}
              {selectedAsset.exhibitions && selectedAsset.exhibitions.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-light mb-3 tracking-wide">Exhibition History</h3>
                  <ul className="space-y-2">
                    {selectedAsset.exhibitions.map((exhibition, idx) => (
                      <li key={idx} className="text-sm text-white/70">{exhibition}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Documents */}
              {selectedAsset.documents && selectedAsset.documents.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-light mb-3 tracking-wide">Documentation</h3>
                  <div className="space-y-2">
                    {selectedAsset.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 px-3 border border-white/10 hover:border-white/20 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-white/40" />
                          <span className="text-sm">{doc}</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-white/40" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-6 border-t border-white/10">
                <button className="flex-1 py-3 border border-white/30 hover:bg-white/5 transition-colors text-sm tracking-wide">
                  GENERATE REPORT
                </button>
                <button className="flex-1 py-3 bg-white text-black hover:bg-white/90 transition-colors text-sm tracking-wide">
                  SHARE ASSET
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans antialiased">
      {view === 'landing' && <LandingView />}
      {view === 'vault' && <VaultView />}
      {view === 'asset' && <AssetView />}
    </div>
  );
};

export default ARCHON;