
import React, { useState } from 'react';
import Header from './components/Header.tsx';
import CapturePanel from './components/CapturePanel.tsx';
import StyleSelector from './components/StyleSelector.tsx';
import { GeneratedImage, UserState } from './types.ts';
import { PORTRAIT_STYLES } from './constants.tsx';
import { generatePortrait } from './services/geminiService.ts';

const App: React.FC = () => {
  const [userState, setUserState] = useState<UserState>({
    faceImage: null,
    refImage: null,
    customPrompt: '',
    selectedStyleId: PORTRAIT_STYLES[0].id
  });
  const [results, setResults] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!userState.faceImage) {
      setError("请先上传或拍摄您的面部照片");
      return;
    }

    setIsGenerating(true);
    setError(null);

    const style = PORTRAIT_STYLES.find(s => s.id === userState.selectedStyleId) || PORTRAIT_STYLES[0];

    try {
      const resultUrl = await generatePortrait(
        userState.faceImage,
        style.prompt,
        userState.customPrompt,
        userState.refImage || undefined
      );

      const newResult: GeneratedImage = {
        id: Math.random().toString(36).substr(2, 9),
        url: resultUrl,
        timestamp: Date.now(),
        styleName: style.name
      };

      setResults(prev => [newResult, ...prev]);
    } catch (err) {
      console.error(err);
      setError("生成失败，请稍后重试。");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-5 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm">1</span>
                上传面部照片
              </h2>
              <CapturePanel 
                label="您的正面头像" 
                previewImage={userState.faceImage}
                onCapture={(img) => setUserState(prev => ({ ...prev, faceImage: img }))}
                onClear={() => setUserState(prev => ({ ...prev, faceImage: null }))}
              />
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm">2</span>
                选择写真风格
              </h2>
              <StyleSelector 
                selectedStyleId={userState.selectedStyleId} 
                onSelect={(id) => setUserState(prev => ({ ...prev, selectedStyleId: id }))} 
              />
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm">3</span>
                深度定制 (可选)
              </h2>
              
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">自定义发型或细节要求</span>
                  <textarea 
                    placeholder="例如：想要一个大波浪卷发、戴一副黑色粗框眼镜..."
                    className="mt-1 block w-full rounded-xl border-gray-200 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-24 p-4 text-sm resize-none"
                    value={userState.customPrompt}
                    onChange={(e) => setUserState(prev => ({ ...prev, customPrompt: e.target.value }))}
                  />
                </label>

                <div>
                  <span className="text-sm font-medium text-gray-700">风格参考图</span>
                  <div className="mt-1">
                    <CapturePanel 
                      label="参考照片 (发型/服饰)" 
                      previewImage={userState.refImage}
                      onCapture={(img) => setUserState(prev => ({ ...prev, refImage: img }))}
                      onClear={() => setUserState(prev => ({ ...prev, refImage: null }))}
                    />
                  </div>
                </div>
              </div>
            </section>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !userState.faceImage}
              className={`w-full py-5 rounded-2xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${
                isGenerating || !userState.faceImage 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]'
              }`}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  正在创作中...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  立即生成专业写真
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-7">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  我的写真库
                </h2>
                <span className="text-sm text-gray-500">{results.length} 张已生成</span>
              </div>

              {results.length === 0 ? (
                <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 h-[600px] flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-600 mb-2">还没有生成任何写真</h3>
                  <p className="max-w-xs">上传照片并选择一个风格，点击生成按钮开启您的AI写真之旅</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {results.map((img) => (
                    <div key={img.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                      <div className="relative aspect-[4/5]">
                        <img src={img.url} alt="Generated" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                          <button 
                            onClick={() => downloadImage(img.url, `ai-portrait-${img.id}.png`)}
                            className="bg-white text-gray-900 p-3 rounded-full hover:bg-indigo-600 hover:text-white transition-colors shadow-lg"
                            title="下载照片"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-gray-900">{img.styleName}</p>
                          <p className="text-xs text-gray-400">{new Date(img.timestamp).toLocaleString()}</p>
                        </div>
                        <div className="flex gap-2">
                           <button 
                            onClick={() => downloadImage(img.url, `ai-portrait-${img.id}.png`)}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                          >
                            下载
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
