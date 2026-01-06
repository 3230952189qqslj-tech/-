
import React from 'react';
import { PortraitStyle } from './types';

export const PORTRAIT_STYLES: PortraitStyle[] = [
  {
    id: 'business',
    name: '商务精英',
    description: '专业职场形象，正装出席',
    // 对应第5张图：专业西装，办公背景
    previewUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    prompt: 'Professional corporate headshot, young Asian woman wearing a sleek charcoal gray business blazer and white silk blouse, minimalist modern office background, soft high-key lighting, sharp focus on eyes, 8k resolution, photorealistic.'
  },
  {
    id: 'artistic',
    name: '文艺胶片',
    description: '复古胶片质感，充满故事感',
    // 对应第4张图：森林外景，柔和暖光
    previewUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop',
    prompt: 'Artistic outdoor portrait, young Asian woman in a soft cream-colored vintage blouse, long wavy hair, standing in a sun-drenched forest with beautiful bokeh, 35mm film photography style, warm golden hour lighting, cinematic aesthetic.'
  },
  {
    id: 'cyberpunk',
    name: '赛博未来',
    description: '霓虹灯效，前卫未来感',
    // 对应第3张图：紫色霓虹，科技感面部妆容与机能服饰
    previewUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop',
    prompt: 'Cyberpunk style portrait, neon-lit rainy street background, vibrant blue and magenta lighting, futuristic tech-wear jacket with glowing accents, subtle tech implants on face, cinematic lighting, sharp details, hyper-realistic, high contrast.'
  },
  {
    id: 'minimalist',
    name: '纯净简约',
    description: '纯色背景，干净利落',
    // 对应第2张图：白色背心，纯净浅灰背景
    previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    prompt: 'Minimalist studio portrait, clean solid light gray background, Asian woman wearing a simple high-quality white sleeveless top, natural long wavy hair, soft diffused studio lighting, natural skin texture, serene expression.'
  },
  {
    id: 'vogue',
    name: '潮流杂志',
    description: '高端杂志封面质感',
    // 对应第1张图：墨绿色丝绒长裙，高级珠宝，时尚大片灯光
    previewUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop',
    prompt: 'Vogue magazine cover style, high fashion photography, dramatic side profile, luxurious emerald green velvet dress with intricate embroidery, high-end jewelry, geometric reflective background, sharp dramatic lighting, "VOGUE LUXE" typography overlay style.'
  }
];
