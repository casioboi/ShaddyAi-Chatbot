import { assets } from '@/assets/assets';
import Image from 'next/image';
import React, { useState } from 'react';

const PromptBox = ({ setIsLoading, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt) return;
    setIsLoading(true);
    // send prompt logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-[#404045] p-4 rounded-3xl mt-10 transition-all"
    >
      <textarea
        className="outline-none w-full resize-none overflow-hidden break-words bg-transparent text-white"
        rows={2}
        placeholder="Message ShaddyAi"
        required
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      ></textarea>

      <div className="flex items-center justify-between text-sm mt-3">
        <div className="flex items-center gap-2">
          <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
            <Image className="h-5" src={assets.deepthink_icon} alt="" />
            DeepThink
          </p>

          <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
            <Image className="h-5" src={assets.search_icon} alt="" />
            Search
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Image className="w-4 cursor-pointer" src={assets.pin_icon} alt="" />
          <button
            type="submit"
            className={`p-2 rounded-full transition ${
              prompt ? 'bg-primary' : 'bg-[#71717a]'
            }`}
          >
            <Image
              className="w-3.5 aspect-square"
              src={prompt ? assets.arrow_icon : assets.arrow_icon_dull}
              alt=""
            />
          </button>
        </div>
      </div>
    </form>
  );
};

export default PromptBox;
