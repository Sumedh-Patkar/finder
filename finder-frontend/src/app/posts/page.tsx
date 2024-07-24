import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Posts Feed",
};

async function getPosts() {
    const res = await fetch('https://dummyjson.com/posts');

    if(!res.ok) {
        throw new Error('Failed to get posts from the Dummy API endpoint');
    }

    return res.json();
}

export default async function Posts() {
    const posts = await getPosts();

    console.log(posts)
    return (
        <div>
            <h2>Posts Feed</h2>
        </div>
    )
}