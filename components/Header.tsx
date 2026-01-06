
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-11 h-11 flex items-center justify-center bg-indigo-50 rounded-xl transition-all group-hover:bg-indigo-100 group-hover:scale-105 shadow-sm">
            {/* 简约相机 Logo */}
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-indigo-600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M7 7L9 4H15L17 7H21C22.1046 7 23 7.89543 23 9V19C23 20.1046 22.1046 21 21 21H3C1.89543 21 1 20.1046 1 19V9C1 7.89543 1.89543 7 3 7H7Z" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                strokeLinejoin="round" 
              />
              <circle cx="12" cy="14" r="3.5" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="18.5" cy="10.5" r="1" fill="currentColor" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            晶晶<span className="text-indigo-600">写真</span>
          </h1>
        </div>
        
        {/* 移除了中间的导航按钮和右侧的操作按钮，保持页头极简 */}
      </div>
    </header>
  );
};

export default Header;
