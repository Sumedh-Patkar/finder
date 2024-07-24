import Link from "next/link";

export default function Page() {
    return (
        <div>
            <h1>Hello, Next.js!</h1>
            <Link href="/posts">View Feed</Link>
        </div>
    )
}