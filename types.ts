
export interface PortraitStyle {
  id: string;
  name: string;
  description: string;
  previewUrl: string;
  prompt: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  timestamp: number;
  styleName: string;
}

export interface UserState {
  faceImage: string | null;
  refImage: string | null;
  customPrompt: string;
  selectedStyleId: string;
}
