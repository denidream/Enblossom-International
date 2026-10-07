import React, { useState } from 'react';
import { X, Send, CheckCircle2, Phone, Mail, Building, User, MessageSquare } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultService = '',
}) => {
  const { content } = useContent();
  const { contact } = content;
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: defaultService || 'ツーリズム事業',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync default service if changed
  React.useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, service: defaultService }));
    }
  }, [defaultService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      service: defaultService || 'ツーリズム事業',
      message: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#dfba73]/50 overflow-hidden transform transition-all my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#09221b] text-white p-6 relative border-b border-[#dfba73]/40">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#bed5cb] hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="font-cinzel text-xs tracking-[0.25em] text-[#eed08d] uppercase font-semibold">
            INQUIRY FORM
          </span>
          <h3 className="font-serif-jp text-xl sm:text-2xl font-bold text-white mt-1">
            お問い合わせ・ご相談
          </h3>
          <p className="text-xs text-[#a9c9bd] mt-1.5 leading-relaxed">
            日本とインドネシアのビジネス連携、視察、ハラール対応など、まずはお気軽にご相談ください。
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#ecfdf5] text-[#10b981] mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif-jp text-xl font-bold text-[#142921]">
                お問い合わせを受け付けました
              </h4>
              <p className="text-xs sm:text-sm text-[#4d5952] max-w-md mx-auto leading-relaxed">
                お問い合わせありがとうございます。担当者（ユディ / 宮澤）より、原則1〜2営業日以内に折り返しご連絡申し上げます。
              </p>
              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleReset}
                  className="bg-gold-btn text-[#15231c] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full cursor-pointer shadow-md hover:scale-105 transition-transform"
                >
                  閉じる
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Company Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#183126] mb-1.5">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8a9e95] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="山田 太郎"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#d8d0c2] rounded-lg focus:outline-none focus:border-[#c89e47] focus:ring-1 focus:ring-[#c89e47]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#183126] mb-1.5">
                    貴社名・組織名
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-[#8a9e95] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="株式会社〇〇"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#d8d0c2] rounded-lg focus:outline-none focus:border-[#c89e47] focus:ring-1 focus:ring-[#c89e47]"
                    />
                  </div>
                </div>
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#183126] mb-1.5">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8a9e95] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#d8d0c2] rounded-lg focus:outline-none focus:border-[#c89e47] focus:ring-1 focus:ring-[#c89e47]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#183126] mb-1.5">
                    お電話番号
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8a9e95] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="090-0000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#d8d0c2] rounded-lg focus:outline-none focus:border-[#c89e47] focus:ring-1 focus:ring-[#c89e47]"
                    />
                  </div>
                </div>
              </div>

              {/* Inquired Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#183126] mb-1.5">
                  ご相談項目
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-[#d8d0c2] rounded-lg focus:outline-none focus:border-[#c89e47] focus:ring-1 focus:ring-[#c89e47] bg-white"
                >
                  <option value="ツーリズム事業">ツーリズム事業（企業視察・工場見学・医療ツアー）</option>
                  <option value="ハラール事業">ハラール事業（認証支援・飲食店・商品開発）</option>
                  <option value="輸出入・食品事業">輸出入・食品事業（農産品・特産品・通関）</option>
                  <option value="ビジネスマッチング">ビジネスマッチング・事業開発（商談・海外連携）</option>
                  <option value="その他・全般のご相談">その他・総合的なご相談</option>
                </select>
              </div>

              {/* Message Area */}
              <div>
                <label className="block text-xs font-semibold text-[#183126] mb-1.5">
                  ご相談内容・メッセージ <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-[#8a9e95] absolute left-3 top-3" />
                  <textarea
                    required
                    rows={4}
                    placeholder="視察時期、希望されるマッチング内容、取り扱い希望商品などをご記入ください。"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#d8d0c2] rounded-lg focus:outline-none focus:border-[#c89e47] focus:ring-1 focus:ring-[#c89e47]"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-[#6e7d75] hover:text-[#183126] px-3 py-2"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gold-btn text-[#15231c] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span>送信中...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#15231c]" />
                      <span>送信する</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Quick Direct Contacts Helper */}
          <div className="mt-6 pt-5 border-t border-[#eee7da] flex flex-wrap items-center justify-between text-[11px] text-[#63756c] gap-2">
            <span>お電話での直接のご相談も受け付けております:</span>
            <div className="flex gap-3 font-semibold text-[#183126]">
              <a href={contact.phone1.link} className="hover:text-[#a88031] underline">
                {contact.phone1.number} ({contact.phone1.label})
              </a>
              <span>·</span>
              <a href={contact.phone2.link} className="hover:text-[#a88031] underline">
                {contact.phone2.number} ({contact.phone2.label})
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
