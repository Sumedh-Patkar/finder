import Link from "next/link";

export default function Page() {
    return (
        <div className="bg-gray-700 items-center">
            <div className="bg-gray-900 px-4 py-2">
                <h1 className="text-9xl px-5 py-2 font-bold">Finder Frontend</h1>
            </div>
            <div className="">
                <button className="rounded px-5 py-2 text-xl bg-green-500 text-white font-medium"><Link href="/posts">View Feed</Link></button>
            </div>
        </div>
    )
}