import React from 'react';

interface IFloatingItem {
  id: string;
  name: string;
  category: 'social' | 'storage' | 'creative' | 'automation' | 'ai';
  top: string;
  left: string;
  animationClass: string;
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  hideOnTablet?: boolean;
}

export const HeroConstellation: React.FC = () => {
  const items: IFloatingItem[] = [
    // Top Left - Canva
    {
      id: 'canva',
      name: 'Canva',
      category: 'creative',
      top: '10%',
      left: '14%',
      animationClass: 'animate-float-slow',
      icon: (
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00C4CC] to-[#7D2AE8] flex items-center justify-center text-white font-bold text-sm shadow-md hover:scale-110 transition-transform">
          C
        </div>
      ),
      size: 'sm',
      hideOnTablet: true,
    },
    // Top Left - YouTube
    {
      id: 'youtube',
      name: 'YouTube',
      category: 'social',
      top: '22%',
      left: '12%',
      animationClass: 'animate-float-reverse',
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E8E8] shadow-md flex items-center justify-center p-2.5 hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#FF0000">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </div>
      ),
      size: 'md',
    },
    // Top Center-Left - X / Twitter
    {
      id: 'x',
      name: 'X (Twitter)',
      category: 'social',
      top: '12%',
      left: '30%',
      animationClass: 'animate-float-slow',
      icon: (
        <div className="w-13 h-13 rounded-2xl bg-white border border-[#E8E8E8] shadow-md flex items-center justify-center p-3 hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#0D0D0D">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      ),
      size: 'lg',
    },
    // Top Right - Bluesky
    {
      id: 'bluesky',
      name: 'Bluesky',
      category: 'social',
      top: '14%',
      left: '68%',
      animationClass: 'animate-float-subtle',
      icon: (
        <div className="w-11 h-11 rounded-2xl bg-white border border-[#E8E8E8] shadow-md flex items-center justify-center p-2.5 hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1185FE">
            <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.032-.276.066-.415.105-3.839 1.077-7.007 3.51-4.007 7.747 3.669 5.181 8.016.945 9-1.921.984 2.866 5.331 7.102 9 1.921 3-4.237-.168-6.67-4.007-7.747-.139-.039-.277-.073-.415-.105.14.017.279.036.415.056 2.67.297 5.568-.627 6.383-3.364.246-.828.624-5.79.624-6.479 0-.689-.139-1.86-.902-2.203-.659-.3-1.664-.621-4.3 1.24C16.046 4.747 13.087 8.686 12 10.8z" />
          </svg>
        </div>
      ),
      size: 'sm',
    },
    // Top Right - 3D Box / Asset Manager
    {
      id: 'assetbox',
      name: 'Media Assets',
      category: 'creative',
      top: '25%',
      left: '73%',
      animationClass: 'animate-float-slow',
      icon: (
        <div className="w-10 h-10 rounded-2xl bg-white border border-[#E8E8E8] shadow-sm flex items-center justify-center p-2 text-neutral-400 hover:text-neutral-700 hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M12.38 2.04a1 1 0 0 0-.76 0L3.62 5.54a1 1 0 0 0-.62.92v11.08a1 1 0 0 0 .62.92l8 3.5a1 1 0 0 0 .76 0l8-3.5a1 1 0 0 0 .62-.92V6.46a1 1 0 0 0-.62-.92l-8-3.5zM12 4.15l6.5 2.85-2.6 1.14L9.4 5.29 12 4.15zM5 7.42l6 2.63v9.42l-6-2.63V7.42zm8 12.05v-9.42l6-2.63v9.42l-6-2.63z" />
          </svg>
        </div>
      ),
      size: 'sm',
      hideOnTablet: true,
    },
    // Top Right - Pinterest
    {
      id: 'pinterest',
      name: 'Pinterest',
      category: 'social',
      top: '25%',
      left: '82%',
      animationClass: 'animate-float-reverse',
      icon: (
        <div className="w-10 h-10 rounded-2xl bg-white border border-[#E8E8E8] shadow-sm flex items-center justify-center p-2 hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#BD081C">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
          </svg>
        </div>
      ),
      size: 'sm',
    },
    // Mid Left - Sparkle / Asterisk
    {
      id: 'sparkle',
      name: 'Creative Spark',
      category: 'creative',
      top: '36%',
      left: '27%',
      animationClass: 'animate-float-slow',
      icon: (
        <div className="w-7 h-7 text-[#E8927C] opacity-80">
          <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
            <path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" />
          </svg>
        </div>
      ),
      size: 'sm',
      hideOnTablet: true,
    },
    // Mid Left - LinkedIn
    {
      id: 'linkedin',
      name: 'LinkedIn',
      category: 'social',
      top: '41%',
      left: '19%',
      animationClass: 'animate-float-reverse',
      icon: (
        <div className="w-11 h-11 rounded-2xl bg-white border border-[#E8E8E8] shadow-md flex items-center justify-center p-2.5 hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#0A66C2">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </div>
      ),
      size: 'md',
    },
    // Mid Left - Cloud / Storage
    {
      id: 'cloud',
      name: 'Cloud Storage',
      category: 'storage',
      top: '47%',
      left: '24%',
      animationClass: 'animate-float-subtle',
      icon: (
        <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center text-sky-500 shadow-xs">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
          </svg>
        </div>
      ),
      size: 'sm',
      hideOnTablet: true,
    },
    // Mid Right - Threads
    {
      id: 'threads',
      name: 'Threads',
      category: 'social',
      top: '41%',
      left: '73%',
      animationClass: 'animate-float-slow',
      icon: (
        <div className="w-11 h-11 rounded-2xl bg-white border border-[#E8E8E8] shadow-md flex items-center justify-center p-2.5 hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#0D0D0D">
            <path d="M12.186 24h-.007C5.463 23.978 0 18.522 0 11.807 0 5.093 5.464 0 12.186 0c6.7 0 12.164 5.093 12.164 11.807 0 3.824-1.748 7.37-4.793 9.73l-1.39-1.737c2.585-2.003 4.07-5.013 4.07-8.257 0-5.59-4.526-10.137-10.088-10.137-5.563 0-10.088 4.547-10.088 10.137 0 5.59 4.525 10.137 10.088 10.137h.007c2.72-.01 5.28-1.077 7.21-3.003l1.47 1.402C18.53 22.757 15.46 24 12.186 24zM12.1 6.57c-3.1 0-5.63 2.53-5.63 5.63 0 3.1 2.53 5.63 5.63 5.63 2.1 0 3.93-1.16 4.9-2.9l-1.84-.96c-.63 1.13-1.8 1.89-3.06 1.89-1.99 0-3.62-1.63-3.62-3.66 0-2.03 1.63-3.66 3.62-3.66 1.8 0 3.28 1.3 3.57 3h2.03c-.32-2.8-2.68-4.97-5.6-4.97z" />
          </svg>
        </div>
      ),
      size: 'md',
    },
    // Mid Right - ChatGPT / AI Co-pilot
    {
      id: 'chatgpt',
      name: 'AI Co-pilot',
      category: 'ai',
      top: '41%',
      left: '84%',
      animationClass: 'animate-float-reverse',
      icon: (
        <div className="w-10 h-10 rounded-2xl bg-white border border-[#E8E8E8] shadow-sm flex items-center justify-center p-2 text-neutral-700 hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
            <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.771-4.209 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.746-7.07zm-9.022 12.608a4.475 4.475 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.69 18.004a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.05-1.946zm-1.604-9.87a4.479 4.479 0 0 1 2.34-1.97v5.676a.799.799 0 0 0 .395.684l5.836 3.37-2.02 1.167a.08.08 0 0 1-.073.006l-4.93-2.846a4.505 4.505 0 0 1-1.548-6.087zm15.094 2.766l-5.843-3.37 2.02-1.167a.08.08 0 0 1 .073-.006l4.93 2.846a4.5 4.5 0 0 1 1.548 6.088 4.48 4.48 0 0 1-2.333 1.97v-5.677a.798.798 0 0 0-.395-.684zm2.013-3.023l-.142-.085-4.779-2.76a.775.775 0 0 0-.784 0l-5.84 3.369V6.07a.079.079 0 0 1 .033-.062L12.54 3.92a4.5 4.5 0 0 1 6.643 4.957zm-10.155 4.52l2.605-1.503 2.604 1.504v3.01l-2.604 1.503-2.605-1.504z" />
          </svg>
        </div>
      ),
      size: 'sm',
      hideOnTablet: true,
    },
    // Mid Right - Facebook
    {
      id: 'facebook',
      name: 'Facebook',
      category: 'social',
      top: '52%',
      left: '79%',
      animationClass: 'animate-float-subtle',
      icon: (
        <div className="w-10 h-10 rounded-full bg-[#1877F2] shadow-md flex items-center justify-center hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#FFFFFF">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </div>
      ),
      size: 'md',
    },
    // Bottom Left - Google Drive
    {
      id: 'gdrive',
      name: 'Google Drive',
      category: 'storage',
      top: '63%',
      left: '14%',
      animationClass: 'animate-float-slow',
      icon: (
        <div className="w-10 h-10 rounded-2xl bg-white border border-[#E8E8E8] shadow-sm flex items-center justify-center p-2 hover:scale-110 transition-transform">
          <svg viewBox="0 0 87.3 78" className="w-6 h-6">
            <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066DA" />
            <path d="M43.65 25l13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.25L15.65 25h28z" fill="#00AC47" />
            <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.85 10.15 7.9 13.65z" fill="#EA4335" />
            <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3L1.2 47.9c-.8 1.4-1.2 2.95-1.2 4.5h27.5L43.65 25z" fill="#00832D" />
            <path d="M59.8 53H87.3c0-1.55-.4-3.1-1.2-4.5l-25.4-44c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.15 28z" fill="#2684FC" />
            <path d="M73.55 76.8H27.5l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.9c1.6 0 3.15-.45 4.5-1.25l-.1-.2-.5-.75z" fill="#FFBA00" />
          </svg>
        </div>
      ),
      size: 'sm',
    },
    // Bottom Left - Instagram
    {
      id: 'instagram',
      name: 'Instagram',
      category: 'social',
      top: '63%',
      left: '27%',
      animationClass: 'animate-float-reverse',
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E8E8] shadow-md flex items-center justify-center p-2.5 hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="url(#ig-grad-hero)">
            <defs>
              <radialGradient id="ig-grad-hero" r="150%" cx="30%" cy="107%">
                <stop stopColor="#fdf497" offset="0%" />
                <stop stopColor="#fdf497" offset="5%" />
                <stop stopColor="#fd5949" offset="45%" />
                <stop stopColor="#d6249f" offset="60%" />
                <stop stopColor="#285AEB" offset="90%" />
              </radialGradient>
            </defs>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </div>
      ),
      size: 'lg',
    },
    // Bottom Center - TikTok
    {
      id: 'tiktok',
      name: 'TikTok',
      category: 'social',
      top: '68%',
      left: '42%',
      animationClass: 'animate-float-slow',
      icon: (
        <div className="w-11 h-11 rounded-2xl bg-white border border-[#E8E8E8] shadow-md flex items-center justify-center p-2.5 hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#0D0D0D">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.74 1.42-.04 2.72-.94 3.18-2.28.24-.62.29-1.3.28-1.97V.02h-.14z" />
          </svg>
        </div>
      ),
      size: 'md',
    },
    // Bottom Center - Dropbox
    {
      id: 'dropbox',
      name: 'Dropbox',
      category: 'storage',
      top: '68%',
      left: '53%',
      animationClass: 'animate-float-reverse',
      icon: (
        <div className="w-11 h-11 rounded-2xl bg-white border border-[#E8E8E8] shadow-md flex items-center justify-center p-2.5 hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#0061FF">
            <path d="M6 2L0 6l6 4 6-4-6-4zm12 0l-6 4 6 4 6-4-6-4zM0 14l6 4 6-4-6-4-6 4zm18-4l-6 4 6 4 6-4-6-4zm-6 5.5l-6 4L0 20l12 4 12-4-6-4-6 4z" />
          </svg>
        </div>
      ),
      size: 'md',
    },
    // Bottom Right - Zapier
    {
      id: 'zapier',
      name: 'Zapier',
      category: 'automation',
      top: '66%',
      left: '81%',
      animationClass: 'animate-float-subtle',
      icon: (
        <div className="w-10 h-10 rounded-2xl bg-white border border-[#E8E8E8] shadow-sm flex items-center justify-center p-2 hover:scale-110 transition-transform">
          <div className="w-7 h-7 rounded-lg bg-[#FF4A00] flex items-center justify-center text-white font-bold">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M12 2L3 13h7v9l9-11h-7z" />
            </svg>
          </div>
        </div>
      ),
      size: 'sm',
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Subtle connecting lines on desktop to visualize connected ecosystem */}
      <svg className="absolute inset-0 w-full h-full hidden lg:block opacity-20" aria-hidden="true">
        <path
          d="M 220 180 Q 380 240 480 340"
          fill="none"
          stroke="#0D0D0D"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        <path
          d="M 350 140 Q 440 220 540 310"
          fill="none"
          stroke="#0D0D0D"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        <path
          d="M 850 160 Q 760 220 680 320"
          fill="none"
          stroke="#0D0D0D"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        <path
          d="M 940 260 Q 820 320 720 380"
          fill="none"
          stroke="#0D0D0D"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        <path
          d="M 280 500 Q 380 440 480 420"
          fill="none"
          stroke="#0D0D0D"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        <path
          d="M 900 520 Q 800 460 700 430"
          fill="none"
          stroke="#0D0D0D"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
      </svg>

      {/* Floating Constellation Items */}
      {items.map((item) => (
        <div
          key={item.id}
          className={`absolute pointer-events-auto transition-transform ${item.animationClass} ${
            item.hideOnTablet ? 'hidden xl:block' : 'hidden md:block'
          }`}
          style={{ top: item.top, left: item.left }}
          title={item.name}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};
