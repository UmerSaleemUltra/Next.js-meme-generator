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
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4 text-center">Meme List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {memes.map((meme) => (
                    <Link key={meme.id} href={`/detail/${meme.id}`}>
                        <div className="cursor-pointer">
                            <Image
                                src={meme.url}
                                alt={meme.name}
                                width={500} // Set appropriate width
                                height={500} // Set appropriate height
                                className="w-full h-auto rounded shadow"
                            />
                            <p className="text-center mt-2">{meme.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
