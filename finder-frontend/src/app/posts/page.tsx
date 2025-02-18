import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Search from "@/app/posts/search"

export const metadata: Metadata = {
    title: "Posts Feed",
};

async function getPosts(url? : string) {
    'use server'; // Why? Seriously
    let res;
    console.log("Getting post with URL" + url);
    if (url) {
        res = await fetch(url);
    }
    else {
        res = await fetch('https://dummyjson.com/posts');
    }

    if(!res.ok) {
        throw new Error('Failed to get posts from the Dummy API endpoint');
    }

    return res.json();
}

export default async function Posts() {
    const postsObj = await getPosts();
    const posts = postsObj['posts']

    // Function to truncate paragraph content to 200 characters
    const truncateContent = (content: string, maxLength: number) => {
        if (content.length <= maxLength) {
            return content;
        }
        return content.substring(0, maxLength) + '...';
    };

    console.log(typeof(posts))
    return (
        <div className="bg-gray-700 items-center">
            <div className="bg-gray-900 px-4 py-2 flex justify-around">
                <h1 className="text-7xl font-bold">Posts Feed</h1>
                <Search getPosts={getPosts}></Search>
            </div>
            <div className="grid grid-cols-12">
                {posts.map((post: any) => {
                    return (
                        <div className="p-4 grow col-start-3 col-end-10 hover:bg-gray-800 rounded">
                            <h2 className="text-4xl my-2 font-medium">{post.title}</h2>
                            <p className="font-light tracking-wide text-justify">{truncateContent(post.body, 200)}</p>
                            <div className="flex mt-4 mb-2">
                                <span className="font-semibold py-1">Tags:</span>
                                <ul className="flex">
                                    {post.tags.map((tag: string, index: number) => {
                                        return (
                                            <li className="rounded mx-1 px-2 py-1 bg-gray-600 hover:bg-gray-500" key={index}>{tag}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <p><span className="font-semibold decoration-sky-500">Views: </span>{post.views}</p>
                            <Link href={`/posts/${post.id}`}><button className="bg-sky-500 my-4 py-2 px-4 text-white font-bold rounded hover:bg-sky-600">Read more</button></Link>
                            <hr></hr>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}