import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Post Details",
};

async function getPostDetails(post_id: number) {
    const res = await fetch(`https://dummyjson.com/posts/${post_id}`);

    if(!res.ok) {
        throw new Error('Failed to get post details from the Dummy API endpoint');
    }

    return res.json();
}

export default async function Posts({params}: {params: {id: number}}) {
    const post = await getPostDetails(params.id);

    console.log(post)
    return (
        <div className="bg-gray-700">
            <div className="bg-gray-900 px-4 py-2">
                <h1 className="text-7xl font-bold">Post Detail</h1>
            </div>
            <div className="p-4">
                <h2 className="text-4xl my-2 font-medium">{post.title}</h2>
                <p className="font-light tracking-wide text-justify">{post.body}</p>
                <div className="flex mt-4 mb-2">
                    <span className="font-semibold py-1">Tags:</span>
                    <ul className="flex">
                        {post.tags.map((tag: string, index: number) => {
                            return (
                                <li className="mx-1 px-2 py-1 bg-gray-600 hover:bg-gray-500" key={index}>{tag}</li>
                            )
                        })}
                    </ul>
                </div>
                <p><span className="font-semibold">Views: </span>{post.views}</p>
            </div>
        </div>
    )
}