// Client Component for interactive features
"use client";

import React, { useState } from 'react';
import '../../../app/globals.css';

// Function to fetch meme data
async function fetchMemeData(id) {
  const res = await fetch('https://api.imgflip.com/get_memes');
  const data = await res.json();
  return data.data.memes.find((e) => e.id === id);
}

// Server Component to fetch data and render Client Component
export default async function Detail({ params }) {
  const { id } = params;
  const response = await fetchMemeData(id);

  if (!response) {
    return <div className="text-center text-red-500 mt-10">No meme found.</div>;
  }

  return <DetailPage meme={response} />;
}

// Client Component for interactive features
function DetailPage({ meme }) {
  const [text, setText] = useState('');
  const [text1, setText1] = useState('');
  const [gen, setGen] = useState(null);

  const generateMeme = async () => {
    if (!text || !text1) {
      console.error("Text fields are required");
      return;
    }

    const username = "UmerSaleem1"; // Replace with your Imgflip username
    const password = "umersaleem8637"; // Replace with your Imgflip password

    const url = `https://api.imgflip.com/caption_image?template_id=${meme.id}&username=${username}&password=${password}&text0=${text}&text1=${text1}`;

    try {
      const res = await fetch(url, { method: "POST" });
      if (!res.ok) throw new Error("Failed to generate meme");

      const data = await res.json();
      setGen(data);
    } catch (error) {
      console.error("Error generating meme:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
      {!gen ? (
        <>
          <img
            className="max-w-full h-auto rounded shadow-lg"
            src={meme.url}
            alt="Meme"
          />
          <div className="mt-6 w-full max-w-md">
            <input
              placeholder="Top Text"
              value={text}
              className="w-full p-3 mb-4 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setText(e.target.value)}
            />
            <input
              placeholder="Bottom Text"
              value={text1}
              className="w-full p-3 mb-4 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setText1(e.target.value)}
            />
            <button
              className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition duration-200 shadow-lg"
              onClick={generateMeme}
            >
              Generate Meme
            </button>
          </div>
        </>
      ) : (
        <img className="max-w-full h-auto rounded shadow-lg" src={gen.data.url} alt="Generated Meme" />
      )}
    </div>
  );
}
