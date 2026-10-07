import React, { useState } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Upload,
  Download,
  Image,
  Type,
  Briefcase,
  Users,
  Phone,
  Newspaper,
  Check,
  Trash2,
  Plus,
  LogOut,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { SiteContentState, ServiceItem } from '../../types';

export const AdminDashboardModal: React.FC = () => {
  const {
    content,
    updateContent,
    resetToDefault,
    exportContentJson,
    importContentJson,
    isAdminPanelOpen,
    setIsAdminPanelOpen,
    logoutAdmin,
  } = useContent();

  const [activeTab, setActiveTab] = useState<
    'branding' | 'hero' | 'services' | 'about' | 'team' | 'contact' | 'news'
  >('branding');

  // Local draft state so edits can be saved cleanly or discarded
  const [draft, setDraft] = useState<SiteContentState>(content);
  const [saveToast, setSaveToast] = useState(false);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

  // Sync draft when content changes externally
  React.useEffect(() => {
    setDraft(content);
  }, [content]);

  if (!isAdminPanelOpen) return null;

  // File upload helper that converts file to Base64
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (base64: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onSuccess(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateContent(() => draft);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan semua data ke pengaturan awal bawaan?')) {
      resetToDefault();
      setDraft(content);
      alert('Data telah dikembalikan ke pengaturan awal.');
    }
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const success = importContentJson(reader.result);
          if (success) {
            alert('Data cadangan JSON berhasil diimpor!');
          } else {
            alert('Format file JSON tidak valid.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl h-[92vh] max-h-[900px] bg-[#0c241c] text-[#e8f1ec] rounded-2xl shadow-2xl border border-[#c89e47]/60 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-[#081a14] px-5 py-4 border-b border-[#1b4436] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#dfba73] to-[#aa771c] text-[#0d221a] flex items-center justify-center shadow font-bold font-cinzel">
              EB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-jp text-base sm:text-lg font-bold text-white">
                  Panel Kelola Konten & Tampilan
                </h3>
                <span className="text-[10px] bg-[#144233] text-[#f7e6a6] px-2 py-0.5 rounded-full font-semibold border border-[#c89e47]/40">
                  CMS Mode
                </span>
              </div>
              <p className="text-[11px] text-[#86a89a]">
                Ubah teks, upload logo PNG, ganti poster banner, layanan, foto, dan informasi kontak.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleSave}
              className="bg-gold-btn text-[#12221a] font-bold text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow hover:scale-105 active:scale-95 transition-all"
            >
              <Save className="w-4 h-4 text-[#12221a]" />
              <span>Simpan Perubahan</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="bg-[#103025] hover:bg-[#184838] text-[#a9c9bd] hover:text-white p-2 sm:px-3 sm:py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-[#1b4d3b]"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <button
              onClick={() => setIsAdminPanelOpen(false)}
              className="text-[#87ab9d] hover:text-white p-2 rounded-xl hover:bg-[#13362a] transition-colors cursor-pointer"
              aria-label="Tutup Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#0a2019] border-b border-[#1b4436] px-3 sm:px-6 flex overflow-x-auto gap-1 sm:gap-2 text-xs py-2 scrollbar-none">
          {[
            { id: 'branding', label: 'Logo & Branding', icon: Image },
            { id: 'hero', label: 'Poster & Hero', icon: Sparkles },
            { id: 'services', label: '4 Layanan Bisnis', icon: Briefcase },
            { id: 'about', label: 'Tentang Kami', icon: Type },
            { id: 'team', label: 'Tim & Strip Foto', icon: Users },
            { id: 'contact', label: 'Kontak & Alamat', icon: Phone },
            { id: 'news', label: 'Berita & Topik', icon: Newspaper },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#154636] text-[#fae59e] border border-[#c89e47]/50 shadow-sm'
                    : 'text-[#87a99b] hover:text-white hover:bg-[#0e2c22]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#e5c57b]' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Area (Scrollable) */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* TAB 1: LOGO & BRANDING */}
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <div className="bg-[#081c15] p-5 sm:p-6 rounded-2xl border border-[#1d4d3c] space-y-5">
                <div>
                  <h4 className="font-serif-jp text-base font-bold text-[#f7e6a6] flex items-center gap-2">
                    <Image className="w-4 h-4 text-[#dfba73]" />
                    <span>Upload Logo Header (Format PNG / JPG)</span>
                  </h4>
                  <p className="text-xs text-[#95b8a9] mt-1 leading-relaxed">
                    Anda dapat mengunggah file logo PNG transparan Anda sendiri. Logo ini akan langsung menggantikan logo di bagian header navigasi atas.
                  </p>
                </div>

                {/* Logo Preview & Upload */}
                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-[#0d2a20] rounded-xl border border-[#1b4436]">
                  <div className="w-48 h-20 bg-[#061510] rounded-lg border border-[#235845] flex items-center justify-center p-2 overflow-hidden shadow-inner shrink-0">
                    {draft.branding.customLogoUrl ? (
                      <img
                        src={draft.branding.customLogoUrl}
                        alt="Custom Logo Preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-[11px] text-[#719688] text-center">
                        Menggunakan Logo Vektor Bawaan (Default SVG)
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 flex-1">
                    <label className="inline-flex items-center gap-2 bg-gold-btn text-[#12221a] font-bold text-xs px-4 py-2 rounded-xl cursor-pointer shadow hover:scale-105 transition-transform">
                      <Upload className="w-4 h-4" />
                      <span>Upload Logo PNG Baru</span>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (base64) =>
                            setDraft({
                              ...draft,
                              branding: { ...draft.branding, customLogoUrl: base64 },
                            })
                          )
                        }
                      />
                    </label>

                    {draft.branding.customLogoUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setDraft({
                            ...draft,
                            branding: { ...draft.branding, customLogoUrl: '' },
                          })
                        }
                        className="ml-3 text-xs text-red-400 hover:text-red-300 underline cursor-pointer"
                      >
                        Hapus & Gunakan Logo Bawaan
                      </button>
                    )}

                    <p className="text-[11px] text-[#7da293]">
                      Tips: Gunakan file PNG dengan latar belakang transparan untuk hasil terbaik di header bernuansa gelap.
                    </p>
                  </div>
                </div>

                {/* Brand Typography Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#184233]">
                  <div>
                    <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                      Nama Brand Utama
                    </label>
                    <input
                      type="text"
                      value={draft.branding.brandName}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          branding: { ...draft.branding, brandName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                      Sub-nama Brand
                    </label>
                    <input
                      type="text"
                      value={draft.branding.brandSub}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          branding: { ...draft.branding, brandSub: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                      Slogan Bahasa Inggris
                    </label>
                    <input
                      type="text"
                      value={draft.branding.brandTagline}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          branding: { ...draft.branding, brandTagline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                      Teks Jepang Subtitle
                    </label>
                    <input
                      type="text"
                      value={draft.branding.brandJp}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          branding: { ...draft.branding, brandJp: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: POSTER & HERO */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="bg-[#081c15] p-5 sm:p-6 rounded-2xl border border-[#1d4d3c] space-y-5">
                <div>
                  <h4 className="font-serif-jp text-base font-bold text-[#f7e6a6] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#dfba73]" />
                    <span>Poster & Background Banner Hero</span>
                  </h4>
                  <p className="text-xs text-[#95b8a9] mt-1">
                    Ganti gambar poster panorama atas (Gunung Fuji, pura Indonesia, pesawat).
                  </p>
                </div>

                {/* Hero Image Upload & Preview */}
                <div className="flex flex-col sm:flex-row gap-5 items-center p-4 bg-[#0d2a20] rounded-xl border border-[#1b4436]">
                  <div className="relative w-full sm:w-64 h-36 bg-[#061510] rounded-lg overflow-hidden border border-[#235845] shrink-0">
                    <img
                      src={draft.hero.backgroundImage}
                      alt="Hero Background Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-3 flex-1">
                    <label className="inline-flex items-center gap-2 bg-gold-btn text-[#12221a] font-bold text-xs px-4 py-2 rounded-xl cursor-pointer shadow hover:scale-105 transition-transform">
                      <Upload className="w-4 h-4" />
                      <span>Upload Poster / Banner Baru</span>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (base64) =>
                            setDraft({
                              ...draft,
                              hero: { ...draft.hero, backgroundImage: base64 },
                            })
                          )
                        }
                      />
                    </label>

                    <p className="text-[11px] text-[#7da293]">
                      Format disarankan: 16:9 atau resolusi 1920x1080px (JPG/PNG).
                    </p>
                  </div>
                </div>

                {/* Text Editing for Hero */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#184233]">
                  <div>
                    <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                      Judul Utama Jepang (Baris 1)
                    </label>
                    <input
                      type="text"
                      value={draft.hero.mainHeadingLine1}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: { ...draft.hero, mainHeadingLine1: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                      Judul Utama Jepang (Baris 2)
                    </label>
                    <input
                      type="text"
                      value={draft.hero.mainHeadingLine2}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: { ...draft.hero, mainHeadingLine2: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                      Tagline Emas Hero
                    </label>
                    <input
                      type="text"
                      value={draft.hero.taglineEn}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: { ...draft.hero, taglineEn: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                      Teks Jembatan Lintasan Pesawat
                    </label>
                    <input
                      type="text"
                      value={draft.hero.bridgeText}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: { ...draft.hero, bridgeText: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                      Subjudul Jepang (Baris 1)
                    </label>
                    <input
                      type="text"
                      value={draft.hero.subHeadingLine1}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: { ...draft.hero, subHeadingLine1: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                      Subjudul Jepang (Baris 2)
                    </label>
                    <input
                      type="text"
                      value={draft.hero.subHeadingLine2}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: { ...draft.hero, subHeadingLine2: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 4 LAYANAN BISNIS */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              {/* Service Selectors */}
              <div className="flex flex-wrap gap-2">
                {draft.services.map((svc, idx) => (
                  <button
                    key={svc.id}
                    onClick={() => setSelectedServiceIndex(idx)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                      selectedServiceIndex === idx
                        ? 'bg-[#1a5542] text-[#fae59e] border border-[#c89e47]'
                        : 'bg-[#0a2019] text-[#86a89a] hover:bg-[#0e2c22]'
                    }`}
                  >
                    {idx + 1}. {svc.titleJa}
                  </button>
                ))}
              </div>

              {/* Editing Selected Service */}
              {(() => {
                const currentSvc = draft.services[selectedServiceIndex];
                if (!currentSvc) return null;

                const updateCurrentSvc = (patch: Partial<ServiceItem>) => {
                  const updated = [...draft.services];
                  updated[selectedServiceIndex] = { ...currentSvc, ...patch };
                  setDraft({ ...draft, services: updated });
                };

                return (
                  <div className="bg-[#081c15] p-5 sm:p-6 rounded-2xl border border-[#1d4d3c] space-y-5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif-jp text-base font-bold text-[#f7e6a6]">
                        Edit Layanan: {currentSvc.titleJa} ({currentSvc.titleEn})
                      </h4>
                      <span className="text-xs text-[#87a99b]">
                        ID: {currentSvc.id}
                      </span>
                    </div>

                    {/* Image Upload for Service */}
                    <div className="flex flex-col sm:flex-row gap-5 items-center p-4 bg-[#0d2a20] rounded-xl border border-[#1b4436]">
                      <div className="w-full sm:w-44 h-32 bg-[#061510] rounded-lg overflow-hidden border border-[#235845] shrink-0">
                        <img
                          src={currentSvc.image}
                          alt={currentSvc.titleJa}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2 flex-1">
                        <label className="inline-flex items-center gap-2 bg-gold-btn text-[#12221a] font-bold text-xs px-4 py-2 rounded-xl cursor-pointer shadow hover:scale-105 transition-transform">
                          <Upload className="w-4 h-4" />
                          <span>Ganti Foto Layanan Ini</span>
                          <input
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e, (base64) =>
                                updateCurrentSvc({ image: base64 })
                              )
                            }
                          />
                        </label>
                        <p className="text-[11px] text-[#7da293]">
                          Foto ini tampil di kartu layanan dan modal detail.
                        </p>
                      </div>
                    </div>

                    {/* Titles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                          Judul Bahasa Jepang
                        </label>
                        <input
                          type="text"
                          value={currentSvc.titleJa}
                          onChange={(e) =>
                            updateCurrentSvc({ titleJa: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                          Judul Bahasa Inggris
                        </label>
                        <input
                          type="text"
                          value={currentSvc.titleEn}
                          onChange={(e) =>
                            updateCurrentSvc({ titleEn: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                        />
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <div>
                      <label className="block text-xs font-semibold text-[#bedad0] mb-2">
                        Poin Fitur Layanan (Bullet Points di Kartu)
                      </label>
                      <div className="space-y-2">
                        {currentSvc.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2">
                            <span className="text-xs text-[#dfba73] font-bold">•</span>
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => {
                                const newFeats = [...currentSvc.features];
                                newFeats[fIdx] = e.target.value;
                                updateCurrentSvc({ features: newFeats });
                              }}
                              className="flex-1 px-3 py-1.5 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Overview & Audience */}
                    <div className="space-y-3 pt-2 border-t border-[#184233]">
                      <div>
                        <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                          Deskripsi Lengkap (Di Dalam Modal Detail)
                        </label>
                        <textarea
                          rows={3}
                          value={currentSvc.details.overview}
                          onChange={(e) =>
                            updateCurrentSvc({
                              details: {
                                ...currentSvc.details,
                                overview: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                          Target Pengguna / Klien
                        </label>
                        <input
                          type="text"
                          value={currentSvc.details.targetAudience}
                          onChange={(e) =>
                            updateCurrentSvc({
                              details: {
                                ...currentSvc.details,
                                targetAudience: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 4: TENTANG KAMI (ABOUT US) */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="bg-[#081c15] p-5 sm:p-6 rounded-2xl border border-[#1d4d3c] space-y-5">
                <div>
                  <h4 className="font-serif-jp text-base font-bold text-[#f7e6a6]">
                    Bagian Tentang Kami (ABOUT US)
                  </h4>
                  <p className="text-xs text-[#95b8a9] mt-1">
                    Atur deskripsi filosofi perusahaan, foto bola dunia bertunas, dan 3 keunggulan.
                  </p>
                </div>

                {/* Earth Image Upload */}
                <div className="flex flex-col sm:flex-row gap-5 items-center p-4 bg-[#0d2a20] rounded-xl border border-[#1b4436]">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#dfba73] bg-[#061510] shrink-0">
                    <img
                      src={draft.about.earthImage}
                      alt="Earth Seedling Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <label className="inline-flex items-center gap-2 bg-gold-btn text-[#12221a] font-bold text-xs px-4 py-2 rounded-xl cursor-pointer shadow hover:scale-105 transition-transform">
                      <Upload className="w-4 h-4" />
                      <span>Ganti Foto Bola Dunia Bertunas</span>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (base64) =>
                            setDraft({
                              ...draft,
                              about: { ...draft.about, earthImage: base64 },
                            })
                          )
                        }
                      />
                    </label>
                    <p className="text-[11px] text-[#7da293]">
                      Foto lingkaran tengah yang melambangkan koneksi mekar (*Blossoming Connections*).
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                    Deskripsi Profil Perusahaan
                  </label>
                  <textarea
                    rows={4}
                    value={draft.about.description}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        about: { ...draft.about, description: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                  />
                </div>

                {/* 3 Key Advantages */}
                <div className="pt-4 border-t border-[#184233] space-y-4">
                  <h5 className="font-serif-jp text-sm font-bold text-[#f7e6a6]">
                    3 Keunggulan (Enblossomだからできること)
                  </h5>
                  <div className="space-y-4">
                    {draft.about.advantages.map((adv, aIdx) => (
                      <div
                        key={adv.number}
                        className="p-3.5 bg-[#0e2c21] rounded-xl border border-[#1b4b3b] space-y-2"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-[#dfba73] text-[#12221a] flex items-center justify-center font-bold text-xs shrink-0 font-cinzel">
                            {adv.number}
                          </span>
                          <input
                            type="text"
                            value={adv.title}
                            onChange={(e) => {
                              const updatedAdv = [...draft.about.advantages];
                              updatedAdv[aIdx] = {
                                ...updatedAdv[aIdx],
                                title: e.target.value,
                              };
                              setDraft({
                                ...draft,
                                about: {
                                  ...draft.about,
                                  advantages: updatedAdv,
                                },
                              });
                            }}
                            className="flex-1 px-3 py-1.5 bg-[#092219] border border-[#1f5643] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                          />
                        </div>
                        <textarea
                          rows={2}
                          value={adv.description}
                          onChange={(e) => {
                            const updatedAdv = [...draft.about.advantages];
                            updatedAdv[aIdx] = {
                              ...updatedAdv[aIdx],
                              description: e.target.value,
                            };
                            setDraft({
                              ...draft,
                              about: {
                                ...draft.about,
                                advantages: updatedAdv,
                              },
                            });
                          }}
                          className="w-full px-3 py-1.5 bg-[#092219] border border-[#1f5643] rounded-lg text-xs text-[#bed5cb] focus:outline-none focus:border-[#dfba73]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: TIM & STRIP FOTO (TEAM & PHOTOS) */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              {/* Co-CEOs */}
              <div className="bg-[#081c15] p-5 sm:p-6 rounded-2xl border border-[#1d4d3c] space-y-5">
                <h4 className="font-serif-jp text-base font-bold text-[#f7e6a6]">
                  Profil Co-CEO
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {draft.team.members.map((member, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-4 bg-[#0e2c21] rounded-xl border border-[#1b4b3b] space-y-3"
                    >
                      <span className="text-xs font-bold text-[#dfba73]">
                        {member.role} ({mIdx === 0 ? 'Teguh Wahyudi' : '宮澤 喜代'})
                      </span>

                      <div>
                        <label className="block text-[11px] text-[#93b7a8] mb-1">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => {
                            const updated = [...draft.team.members];
                            updated[mIdx] = { ...member, name: e.target.value };
                            setDraft({
                              ...draft,
                              team: { ...draft.team, members: updated },
                            });
                          }}
                          className="w-full px-3 py-1.5 bg-[#092219] border border-[#1f5643] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-[#93b7a8] mb-1">
                          Furigana / Romaji
                        </label>
                        <input
                          type="text"
                          value={member.furigana}
                          onChange={(e) => {
                            const updated = [...draft.team.members];
                            updated[mIdx] = {
                              ...member,
                              furigana: e.target.value,
                            };
                            setDraft({
                              ...draft,
                              team: { ...draft.team, members: updated },
                            });
                          }}
                          className="w-full px-3 py-1.5 bg-[#092219] border border-[#1f5643] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-[#93b7a8] mb-1">
                          Nomor Telepon
                        </label>
                        <input
                          type="text"
                          value={member.phone}
                          onChange={(e) => {
                            const updated = [...draft.team.members];
                            updated[mIdx] = {
                              ...member,
                              phone: e.target.value,
                            };
                            setDraft({
                              ...draft,
                              team: { ...draft.team, members: updated },
                            });
                          }}
                          className="w-full px-3 py-1.5 bg-[#092219] border border-[#1f5643] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-[#93b7a8] mb-1">
                          Alamat Email
                        </label>
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) => {
                            const updated = [...draft.team.members];
                            updated[mIdx] = {
                              ...member,
                              email: e.target.value,
                            };
                            setDraft({
                              ...draft,
                              team: { ...draft.team, members: updated },
                            });
                          }}
                          className="w-full px-3 py-1.5 bg-[#092219] border border-[#1f5643] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-[#93b7a8] mb-1">
                          Catatan / Profil Singkat
                        </label>
                        <textarea
                          rows={2}
                          value={member.note || ''}
                          onChange={(e) => {
                            const updated = [...draft.team.members];
                            updated[mIdx] = { ...member, note: e.target.value };
                            setDraft({
                              ...draft,
                              team: { ...draft.team, members: updated },
                            });
                          }}
                          className="w-full px-3 py-1.5 bg-[#092219] border border-[#1f5643] rounded-lg text-xs text-white focus:outline-none focus:border-[#dfba73]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5 Gallery Strip Photos */}
              <div className="bg-[#081c15] p-5 sm:p-6 rounded-2xl border border-[#1d4d3c] space-y-4">
                <h4 className="font-serif-jp text-base font-bold text-[#f7e6a6]">
                  5 Strip Foto Galeri (Di Atas Bagian Kontak)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {draft.galleryStrip.map((item, gIdx) => (
                    <div
                      key={gIdx}
                      className="p-3 bg-[#0e2c21] rounded-xl border border-[#1b4b3b] space-y-2 text-center"
                    >
                      <div className="h-20 w-full rounded-lg overflow-hidden border border-[#215743]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...draft.galleryStrip];
                          updated[gIdx] = { ...item, title: e.target.value };
                          setDraft({ ...draft, galleryStrip: updated });
                        }}
                        className="w-full px-2 py-1 bg-[#092219] border border-[#1f5643] rounded text-[11px] text-white text-center"
                      />
                      <label className="block text-[10px] text-[#dfba73] hover:underline cursor-pointer">
                        Ganti Foto
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, (base64) => {
                              const updated = [...draft.galleryStrip];
                              updated[gIdx] = { ...item, image: base64 };
                              setDraft({ ...draft, galleryStrip: updated });
                            })
                          }
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: KONTAK & ALAMAT (CONTACT) */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="bg-[#081c15] p-5 sm:p-6 rounded-2xl border border-[#1d4d3c] space-y-5">
                <div>
                  <h4 className="font-serif-jp text-base font-bold text-[#f7e6a6]">
                    Informasi Kontak & Alamat Perusahaan
                  </h4>
                  <p className="text-xs text-[#95b8a9] mt-1">
                    Semua nomor telepon, email, kode pos, dan alamat kantor di bagian footer.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone 1 */}
                  <div>
                    <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                      Nomor Telepon 1 (Label & Nomor)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Label (mis: ユディ)"
                        value={draft.contact.phone1.label}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            contact: {
                              ...draft.contact,
                              phone1: {
                                ...draft.contact.phone1,
                                label: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-1/3 px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white"
                      />
                      <input
                        type="text"
                        value={draft.contact.phone1.number}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            contact: {
                              ...draft.contact,
                              phone1: {
                                ...draft.contact.phone1,
                                number: e.target.value,
                                link: `tel:${e.target.value.replace(/[^0-9]/g, '')}`,
                              },
                            },
                          })
                        }
                        className="flex-1 px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Phone 2 */}
                  <div>
                    <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                      Nomor Telepon 2 (Label & Nomor)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Label (mis: 宮澤)"
                        value={draft.contact.phone2.label}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            contact: {
                              ...draft.contact,
                              phone2: {
                                ...draft.contact.phone2,
                                label: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-1/3 px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white"
                      />
                      <input
                        type="text"
                        value={draft.contact.phone2.number}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            contact: {
                              ...draft.contact,
                              phone2: {
                                ...draft.contact.phone2,
                                number: e.target.value,
                                link: `tel:${e.target.value.replace(/[^0-9]/g, '')}`,
                              },
                            },
                          })
                        }
                        className="flex-1 px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Email 1 */}
                  <div>
                    <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                      Alamat Email 1
                    </label>
                    <input
                      type="email"
                      value={draft.contact.email1}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          contact: {
                            ...draft.contact,
                            email1: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white"
                    />
                  </div>

                  {/* Email 2 */}
                  <div>
                    <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                      Alamat Email 2
                    </label>
                    <input
                      type="email"
                      value={draft.contact.email2}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          contact: {
                            ...draft.contact,
                            email2: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white"
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                      Alamat Website Resmi
                    </label>
                    <input
                      type="url"
                      value={draft.contact.website}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          contact: {
                            ...draft.contact,
                            website: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white"
                    />
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                      Kode Pos Kantor
                    </label>
                    <input
                      type="text"
                      value={draft.contact.postalCode}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          contact: {
                            ...draft.contact,
                            postalCode: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white"
                    />
                  </div>
                </div>

                {/* Full Address */}
                <div>
                  <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                    Alamat Lengkap Kantor
                  </label>
                  <input
                    type="text"
                    value={draft.contact.address}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        contact: {
                          ...draft.contact,
                          address: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white"
                  />
                </div>

                {/* Contact Section Description */}
                <div>
                  <label className="block text-xs font-semibold text-[#bedad0] mb-1">
                    Teks Ajakan Konsultasi di Footer
                  </label>
                  <textarea
                    rows={2}
                    value={draft.contact.description || ''}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        contact: {
                          ...draft.contact,
                          description: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#0e2c21] border border-[#1b4b3b] rounded-lg text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: BERITA & TOPIK (NEWS) */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="bg-[#081c15] p-5 sm:p-6 rounded-2xl border border-[#1d4d3c] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif-jp text-base font-bold text-[#f7e6a6]">
                      Daftar Berita & Topik Terkini
                    </h4>
                    <p className="text-xs text-[#95b8a9] mt-0.5">
                      Tambahkan rilis pers, berita kemitraan, atau agenda kegiatan.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newNews = [
                        {
                          date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
                          category: 'お知らせ',
                          title: 'Judul berita atau pengumuman baru...',
                        },
                        ...draft.news,
                      ];
                      setDraft({ ...draft, news: newNews });
                    }}
                    className="bg-[#184838] hover:bg-[#205e4a] text-[#f7e6a6] px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#c89e47]/40"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Berita Baru</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {draft.news.map((item, nIdx) => (
                    <div
                      key={nIdx}
                      className="p-3 bg-[#0e2c21] rounded-xl border border-[#1b4b3b] flex flex-col sm:flex-row items-center gap-3"
                    >
                      <input
                        type="text"
                        placeholder="Tanggal (2026.10.01)"
                        value={item.date}
                        onChange={(e) => {
                          const updated = [...draft.news];
                          updated[nIdx] = { ...item, date: e.target.value };
                          setDraft({ ...draft, news: updated });
                        }}
                        className="w-full sm:w-28 px-2.5 py-1.5 bg-[#092219] border border-[#1f5643] rounded text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Kategori"
                        value={item.category}
                        onChange={(e) => {
                          const updated = [...draft.news];
                          updated[nIdx] = { ...item, category: e.target.value };
                          setDraft({ ...draft, news: updated });
                        }}
                        className="w-full sm:w-28 px-2.5 py-1.5 bg-[#092219] border border-[#1f5643] rounded text-xs text-[#eed08d]"
                      />
                      <input
                        type="text"
                        placeholder="Judul Berita"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...draft.news];
                          updated[nIdx] = { ...item, title: e.target.value };
                          setDraft({ ...draft, news: updated });
                        }}
                        className="flex-1 w-full px-2.5 py-1.5 bg-[#092219] border border-[#1f5643] rounded text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = draft.news.filter((_, i) => i !== nIdx);
                          setDraft({ ...draft, news: updated });
                        }}
                        className="text-red-400 hover:text-red-300 p-1.5 rounded hover:bg-red-500/10 cursor-pointer"
                        title="Hapus Berita Ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Footer Action Bar */}
        <div className="bg-[#081a14] px-5 py-3.5 border-t border-[#1b4436] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={exportContentJson}
              className="text-[#96b8a8] hover:text-[#f7e6a6] flex items-center gap-1.5 py-1 px-2 rounded hover:bg-[#12362a] transition-colors cursor-pointer"
              title="Download file cadangan JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <label className="text-[#96b8a8] hover:text-[#f7e6a6] flex items-center gap-1.5 py-1 px-2 rounded hover:bg-[#12362a] transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Import JSON</span>
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImportFile}
              />
            </label>

            <button
              onClick={handleReset}
              className="text-red-400 hover:text-red-300 flex items-center gap-1.5 py-1 px-2 rounded hover:bg-red-950/40 transition-colors cursor-pointer ml-2"
              title="Kembalikan semua teks dan foto ke asli"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {saveToast && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold animate-in fade-in">
                <Check className="w-4 h-4" />
                <span>Perubahan berhasil disimpan!</span>
              </span>
            )}

            <button
              onClick={handleSave}
              className="bg-gold-btn text-[#12221a] font-bold px-5 py-2 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
