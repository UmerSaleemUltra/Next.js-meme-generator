"use client";

import React from 'react';
import '../../../app/globals.css';

// Function to fetch meme data
async function fetchMemeData(id) {
  const res = await fetch('https://api.imgflip.com/get_memes');
  const data = await res.json();
  return data.data.memes.find((e) => e.id === id);
}

// Function to generate meme
async function generateMeme(meme, text, text1) {
  if (!text || !text1) {
    console.error("Text fields are required");
    return null;
  }

  const username = "UmerSaleem2"; // Replace with your Imgflip username
  const password = "@UmerSaleem8637"; // Replace with your Imgflip password

  const url = `https://api.imgflip.com/caption_image?template_id=${meme.id}&username=${username}&password=${password}&text0=${text}&text1=${text1}`;

  try {
    const res = await fetch(url, { method: "POST" });
    if (!res.ok) throw new Error("Failed to generate meme");

    const data = await res.json();
    if (data.success && data.data.url) {
      return data.data.url;
    } else {
      console.error("Error generating meme:", data.error_message || "Unknown error");
      return null;
    }
  } catch (error) {
    console.error("Error generating meme:", error);
    return null;
  }
}

// Server Component to fetch data and render Client Component
export default async function Detail({ params, searchParams }) {
  const { id } = params;
  const { text, text1 } = searchParams || {};
  const meme = await fetchMemeData(id);

  if (!meme) {
    return <div className="text-center text-red-500 mt-10">No meme found.</div>;
  }

  let generatedMemeUrl = null;
  if (text && text1) {
    generatedMemeUrl = await generateMeme(meme, text, text1);
  }

  return <DetailPage meme={meme} generatedMemeUrl={generatedMemeUrl} />;
}

// Client Component for rendering the meme
function DetailPage({ meme, generatedMemeUrl }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-4xl transform transition-transform duration-300 hover:scale-105">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6">
            <img
              className="w-full h-auto rounded-lg shadow-md object-cover"
              src={generatedMemeUrl || meme.url}
              alt="Meme"
            />
          </div>
          <div className="md:w-1/2 p-6 flex flex-col justify-center bg-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Customize Your Meme
            </h2>
            <form className="space-y-4" method="GET">
              <input
                placeholder="Top Text"
                name="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                placeholder="Bottom Text"
                name="text1"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 shadow-lg"
              >
                Generate Meme
              </button>
              {generatedMemeUrl && (
                <a
                  download="GeneratedMeme"
                  href={generatedMemeUrl}
                  className="w-full inline-block mt-4 text-center py-3 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300 shadow-lg"
                >
                  Download Meme
                </a>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
