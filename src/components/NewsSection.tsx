import React from 'react';
import { ChevronRight, Bell } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const NewsSection: React.FC = () => {
  const { content } = useContent();
  const news = content.news;

  return (
    <section id="news" className="py-12 sm:py-16 bg-[#faf8f2] border-t border-[#ece4d5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#dfba73]/40">
          <div>
            <span className="font-cinzel text-xs tracking-[0.25em] text-[#8e6e2f] uppercase font-semibold">
              NEWS & TOPICS
            </span>
            <h2 className="font-serif-jp text-2xl sm:text-3xl font-bold text-[#142921] mt-1">
              お知らせ
            </h2>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center gap-1.5 text-xs text-[#73857c]">
            <Bell className="w-3.5 h-3.5 text-[#c89e47]" />
            <span>最新情報・活動レポート</span>
          </div>
        </div>

        {/* News List */}
        <div className="divide-y divide-[#ece4d5] bg-white rounded-xl border border-[#ece4d5] shadow-sm overflow-hidden">
          {news.map((item, index) => (
            <div
              key={index}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#faf7ee] transition-colors cursor-pointer group"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-cinzel text-xs text-[#879990] font-semibold">
                  {item.date}
                </span>
                <span className="text-[11px] font-medium text-[#183a2d] bg-[#eef7f3] px-2.5 py-0.5 rounded border border-[#bce2d3]">
                  {item.category}
                </span>
                <span className="text-xs sm:text-sm font-serif-jp text-[#222e28] group-hover:text-[#9c7526] transition-colors">
                  {item.title}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#bfcfc6] group-hover:text-[#c89e47] group-hover:translate-x-1 transition-all shrink-0 hidden sm:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
