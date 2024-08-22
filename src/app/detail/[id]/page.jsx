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

    const username = "UmerSaleem2"; // Replace with your Imgflip username
    const password = "@UmerSaleem8637"; // Replace with your Imgflip password

    const url = `https://api.imgflip.com/caption_image?template_id=${meme.id}&username=${username}&password=${password}&text0=${text}&text1=${text1}`;

    try {
      const res = await fetch(url, { method: "POST" });
      if (!res.ok) throw new Error("Failed to generate meme");

      const data = await res.json();
      if (data.success && data.data.url) {
        setGen(data);
      } else {
        console.error("Error generating meme:", data.error_message || "Unknown error");
      }
    } catch (error) {
      console.error("Error generating meme:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-4xl transform transition-transform duration-300 hover:scale-105">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6">
            <img
              className="w-full h-auto rounded-lg shadow-md object-cover"
              src={!gen ? meme.url : gen.data.url}
              alt="Meme"
            />
          </div>
          <div className="md:w-1/2 p-6 flex flex-col justify-center bg-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Customize Your Meme
            </h2>
            <div className="space-y-4">
              <input
                placeholder="Top Text"
                value={text}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setText(e.target.value)}
              />
              <input
                placeholder="Bottom Text"
                value={text1}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setText1(e.target.value)}
              />
              <button
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 shadow-lg"
                onClick={generateMeme}
              >
                Generate Meme
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
