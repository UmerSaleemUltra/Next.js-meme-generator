"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Modal from './Modal'; // Import the Modal component

const Page = () => {
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
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Meme List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {memes.map((meme) => (
          <div 
            key={meme.id} 
            className="cursor-pointer"
            onClick={() => handleMemeClick(meme)}
          >
            <img src={meme.url} alt={meme.name} className="w-full h-auto rounded shadow" />
            <p className="text-center mt-2">{meme.name}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal meme={selectedMeme} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Page;
