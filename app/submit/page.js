'use client';

import { useState } from 'react';

const API_URL = 'https://screenhound-backend.onrender.com';

export default function SubmitPage() {
  const [activeTab, setActiveTab] = useState('photo');
  const [dogName, setDogName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [triviaText, setTriviaText] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitPhoto = async () => {
    if (!selectedImage || !dogName) {
      alert('Please add a photo and dog name!');
      return;
    }

    setIsSubmitting(true);

    try {
      const imageUrl = imagePreview;

      const response = await fetch(`${API_URL}/api/submit/photo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number: phoneNumber || 'web-submission',
          dog_name: dogName,
          owner_name: ownerName,
          image_url: imageUrl,
          media_type: 'image/jpeg'
        })
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setDogName('');
          setOwnerName('');
          setPhoneNumber('');
          setSelectedImage(null);
          setImagePreview(null);
        }, 3000);
      }
    } catch (error) {
      alert('Error submitting. Please try again!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitTrivia = async () => {
    if (!triviaText) {
      alert('Please enter a dog fact!');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/submit/trivia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number: phoneNumber || 'web-submission',
          trivia_text: triviaText
        })
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setTriviaText('');
          setPhoneNumber('');
        }, 3000);
      }
    } catch (error) {
      alert('Error submitting. Please try again!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 pb-20">
      <div className="bg-slate-800 px-6 py-6 sticky top-0 z-10 border-b border-amber-50/20">
        <h1 className="text-amber-50 text-3xl font-black uppercase tracking-tight text-center">
          Screenhound
        </h1>
        <p className="text-stone-400 text-sm text-center mt-1 uppercase tracking-wide">
          Share Your Pup!
        </p>
      </div>

      {showSuccess && (
        <div className="fixed top-24 left-4 right-4 bg-green-600 text-white p-4 rounded-xl shadow-2xl z-50 animate-bounce">
          <p className="text-center font-bold text-lg">
            🐕 Submitted! Your content will appear once approved!
          </p>
        </div>
      )}

      <div className="px-4 pt-6 pb-4 flex gap-2">
        <button
          onClick={() => setActiveTab('photo')}
          className={`flex-1 py-4 rounded-xl font-bold uppercase tracking-wide text-lg transition ${
            activeTab === 'photo'
              ? 'bg-amber-50 text-slate-800'
              : 'bg-slate-800 text-stone-400'
          }`}
        >
          📸 Photo
        </button>
        <button
          onClick={() => setActiveTab('trivia')}
          className={`flex-1 py-4 rounded-xl font-bold uppercase tracking-wide text-lg transition ${
            activeTab === 'trivia'
              ? 'bg-amber-50 text-slate-800'
              : 'bg-slate-800 text-stone-400'
          }`}
        >
          🐾 Dog Fact
        </button>
      </div>

      <div className="px-4">
        {activeTab === 'photo' && (
          <div className="space-y-4">
            <div>
              <label className="block text-amber-50 font-bold mb-3 text-lg">
                Dog Photo *
              </label>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageSelect}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="block w-full bg-slate-800 border-2 border-dashed border-amber-50/30 rounded-xl p-8 text-center cursor-pointer hover:border-amber-50/60 transition"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="py-8">
                    <div className="text-6xl mb-4">📷</div>
                    <p className="text-amber-50 text-xl font-bold mb-2">
                      Tap to take or upload photo
                    </p>
                    <p className="text-stone-400 text-sm">
                      Show us your adorable pup!
                    </p>
                  </div>
                )}
              </label>
            </div>

            <div>
              <label className="block text-amber-50 font-bold mb-3 text-lg">
                Dog's Name *
              </label>
              <input
                type="text"
                value={dogName}
                onChange={(e) => setDogName(e.target.value)}
                placeholder="e.g., Max"
                className="w-full bg-slate-800 text-amber-50 border-2 border-amber-50/30 rounded-xl px-6 py-4 text-lg focus:border-amber-50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-amber-50 font-bold mb-3 text-lg">
                Your Name (optional)
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="e.g., Sarah"
                className="w-full bg-slate-800 text-amber-50 border-2 border-amber-50/30 rounded-xl px-6 py-4 text-lg focus:border-amber-50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-amber-50 font-bold mb-3 text-lg">
                Phone Number (optional)
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="(555) 123-4567"
                className="w-full bg-slate-800 text-amber-50 border-2 border-amber-50/30 rounded-xl px-6 py-4 text-lg focus:border-amber-50 focus:outline-none"
              />
            </div>

            <button
              onClick={submitPhoto}
              disabled={isSubmitting}
              className="w-full bg-amber-50 text-slate-800 py-5 rounded-xl font-black text-xl uppercase tracking-wide hover:bg-amber-100 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isSubmitting ? 'Submitting...' : '🐕 Submit Photo'}
            </button>
          </div>
        )}

        {activeTab === 'trivia' && (
          <div className="space-y-4">
            <div>
              <label className="block text-amber-50 font-bold mb-3 text-lg">
                Share a Fun Dog Fact! *
              </label>
              <textarea
                value={triviaText}
                onChange={(e) => setTriviaText(e.target.value)}
                placeholder="e.g., Dogs have three eyelids!"
                rows="6"
                className="w-full bg-slate-800 text-amber-50 border-2 border-amber-50/30 rounded-xl px-6 py-4 text-lg focus:border-amber-50 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-amber-50 font-bold mb-3 text-lg">
                Phone Number (optional)
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="(555) 123-4567"
                className="w-full bg-slate-800 text-amber-50 border-2 border-amber-50/30 rounded-xl px-6 py-4 text-lg focus:border-amber-50 focus:outline-none"
              />
            </div>

            <button
              onClick={submitTrivia}
              disabled={isSubmitting}
              className="w-full bg-amber-50 text-slate-800 py-5 rounded-xl font-black text-xl uppercase tracking-wide hover:bg-amber-100 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isSubmitting ? 'Submitting...' : '🐾 Submit Dog Fact'}
            </button>
          </div>
        )}

        <div className="mt-8 bg-slate-800/50 rounded-xl p-6 border border-amber-50/20">
          <p className="text-stone-400 text-center text-sm leading-relaxed">
            Your submission will be reviewed and appear on the Screenhound display once approved!
          </p>
        </div>
      </div>
    </div>
  );
}
