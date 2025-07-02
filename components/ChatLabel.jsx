import React, { useState } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets'; // ✅ Make sure this path exists

const ChatLabel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex items-center justify-between p-2 text-white/80
      hover:bg-white/10 rounded-lg text-sm group cursor-pointer'>

      <p className='truncate max-w-[80%]'>Chat Name Here</p>

      <div 
        className='relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg'
        onClick={toggleMenu}
      >
        <Image src={assets.three_dots} alt='' className='w-4'/>

        {isOpen && (
          <div className='absolute -right-36 top-6 bg-gray-700 rounded-xl w-max p-2 z-50'>
            <div className='flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer'>
              <Image src={assets.pencil_icon} alt='' className='w-4' />
              <p>Rename</p>
            </div>
            <div className='flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer'>
              <Image src={assets.delete_icon} alt='' className='w-4' />
              <p>Delete</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLabel;
