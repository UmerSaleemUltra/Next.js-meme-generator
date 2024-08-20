"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Modal from './'; // Import the Modal component

const Modal = () => {
  const router = useRouter();
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get('https://api.imgflip.com/get_memes');
        setMemes(response.data.data.memes);
      } catch (error) {
        console.error("Error fetching memes", error);
      }
    };

    fetchMemes();
  }, []);

  const handleMemeClick = (meme) => {
    setSelectedMeme(meme);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMeme(null);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">Meme List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {memes.map((meme) => (
          <div 
            key={meme.id} 
            className="cursor-pointer transform transition-transform duration-300 hover:scale-105"
            onClick={() => handleMemeClick(meme)}
          >
            <img src={meme.url} alt={meme.name} className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg" />
            <p className="text-center mt-2 text-lg font-semibold text-gray-700">{meme.name}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal meme={selectedMeme} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Modal;
