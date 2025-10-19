'use client';

import { useState, useEffect } from 'react';

const API_URL = 'https://screenhound-backend.onrender.com/api';

const mockContent = [
  { type: 'dog', name: 'Max', image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200&h=800&fit=crop', owner: 'Sarah' },
  { type: 'dog', name: 'Luna', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=1200&h=800&fit=crop', owner: 'Mike' },
  { type: 'trivia', fact: "Dogs have three eyelids! The third eyelid, called a 'haw,' helps keep their eyes moist and protected." },
  { type: 'dog', name: 'Bella', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=800&fit=crop', owner: 'Jessica' },
];

export default function DisplayPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [content, setContent] = useState(mockContent);
  const currentItem = content[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % content.length);
        setIsTransitioning(false);
      }, 500);
    }, 7000);

    return () => clearInterval(timer);
  }, [content.length]);

  return (
    <div className="relative w-full h-screen bg-stone-900 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-slate-800/95 to-transparent px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-amber-50 text-5xl font-black tracking-tight uppercase">
              Screenhound
            </h1>
            <p className="text-stone-300 text-sm font-medium uppercase tracking-wide mt-1">Text your pup's photo to join!</p>
          </div>
          <div className="text-right bg-amber-50/10 px-6 py-3 rounded-lg border border-amber-50/20">
            <p className="text-stone-400 text-xs uppercase tracking-widest font-bold mb-1">Text photos to</p>
            <p className="text-amber-50 text-3xl font-black tracking-tight">(866) 667-5281</p>
          </div>
        </div>
      </div>

      <div className={`w-full h-full transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {currentItem.type === 'dog' && (
          <div className="relative w-full h-full">
            <img 
              src={currentItem.image} 
              alt={currentItem.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-12">
              <div className="bg-amber-50/98 backdrop-blur-sm rounded-xl p-8 inline-block shadow-2xl border-4 border-slate-700">
                <p className="text-slate-600 text-lg mb-1 uppercase tracking-wide font-bold">Meet</p>
                <h2 className="text-6xl font-black text-slate-800 mb-2 uppercase tracking-tight">
                  {currentItem.name}
                </h2>
                <p className="text-slate-600 text-xl font-medium">Photo by {currentItem.owner}</p>
              </div>
            </div>
          </div>
        )}

        {currentItem.type === 'trivia' && (
          <div className="w-full h-full flex items-center justify-center bg-slate-700 p-12">
            <div className="max-w-5xl text-center">
              <div className="text-7xl mb-8">🐾</div>
              <h3 className="text-amber-50/90 text-3xl font-black mb-12 uppercase tracking-widest">Dog Fact</h3>
              <p className="text-amber-50 text-4xl font-medium mb-16 leading-relaxed px-8">{currentItem.fact}</p>
              <div className="bg-amber-50/10 backdrop-blur-md rounded-2xl p-8 border-2 border-amber-50/30 inline-block">
                <p className="text-stone-300 text-xl font-medium mb-2">Got a fun dog fact?</p>
                <p className="text-amber-50 text-2xl font-black">(866) 667-5281</p>
              </div>
              <div className="mt-10 pt-6 border-t border-amber-50/20">
                <p className="text-stone-400 text-sm uppercase tracking-widest">Sponsor This Content</p>
                <p className="text-amber-50/80 text-lg font-medium mt-2">screenhound.tv@gmail.com</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {content.map((_, idx) => (
          <div 
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? 'w-12 bg-amber-50' 
                : 'w-2 bg-amber-50/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
