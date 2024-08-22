import './globals.css';
import Link from "next/link";
import Image from "next/image";

// Fetch data on the server side and pass it as props to the component
export default async function Home() {
    let memes = [];

    try {
        const res = await fetch('https://api.imgflip.com/get_memes');
        const data = await res.json();
        memes = data.data.memes || [];
    } catch (error) {
        console.error('Error fetching memes:', error);
    }

    return (
        <div className="container mx-auto p-4 ">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Meme Gallery</h1>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {memes.map((meme) => (
                    <Link key={meme.id} href={`/detail/${meme.id}`}>
                        <div className="cursor-pointer transform hover:scale-105 transition-transform duration-200 ease-in-out bg-white rounded-lg shadow-sm overflow-hidden">
                            <Image
                                src={meme.url}
                                alt={meme.name}
                                width={300}
                                height={300}
                                className="w-full h-48 object-cover"
                            />
                            <p className="text-center mt-2 text-sm font-medium text-gray-700 px-2">{meme.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
