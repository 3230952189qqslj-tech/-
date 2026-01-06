
import React, { useRef, useState, useCallback } from 'react';

interface CapturePanelProps {
  onCapture: (image: string) => void;
  label: string;
  previewImage: string | null;
  onClear: () => void;
}

const CapturePanel: React.FC<CapturePanelProps> = ({ onCapture, label, previewImage, onClear }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("无法访问摄像头，请检查权限设置。");
    }
  };

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOpen(false);
    }
  }, []);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        onCapture(dataUrl);
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onCapture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[300px] w-full relative overflow-hidden">
      <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">{label}</h3>
      
      {previewImage ? (
        <div className="relative w-full group">
          <img src={previewImage} alt="Preview" className="w-full aspect-[4/5] object-cover rounded-xl shadow-inner" />
          <button 
            onClick={onClear}
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : isCameraOpen ? (
        <div className="w-full flex flex-col items-center">
          <video ref={videoRef} autoPlay playsInline className="w-full aspect-[4/5] object-cover rounded-xl bg-black" />
          <div className="mt-4 flex gap-4">
            <button 
              onClick={takePhoto}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-all shadow-md active:scale-95"
            >
              拍照
            </button>
            <button 
              onClick={stopCamera}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-300 transition-all"
            >
              取消
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6 py-10">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
             </svg>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <button 
              onClick={startCamera}
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              开启摄像头
            </button>
            <label className="flex items-center justify-center gap-2 bg-white border-2 border-indigo-100 text-indigo-600 px-8 py-3 rounded-xl font-medium hover:border-indigo-600 hover:bg-indigo-50 transition-all cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              上传照片
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
          <p className="text-xs text-gray-400 text-center max-w-[200px]">支持 PNG, JPG, JPEG 格式，建议上传正面高清照</p>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CapturePanel;
