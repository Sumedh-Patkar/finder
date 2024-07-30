'use client';
import { useEffect, useState } from "react";

type SearchPropsType = {
    getPosts: (url?: string) => Promise<any>;
}

export default function Search({getPosts}: SearchPropsType) {
    const [formData, setFormData] = useState({q : "", skip: 0, limit: 30});

    const handleChange = async (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const callSearchPostsApi = async () => {
        try {
            const queryParams = new URLSearchParams({
                q: formData.q,
                skip: formData.skip.toString(),
                limit: formData.limit.toString()
              }).toString();

              getPosts(`https://dummyjson.com/posts/search?${queryParams}`)
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("Submitted");
        const data = await callSearchPostsApi();

        console.log(data)
    };

    return (
        <div className="mt-3">
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <input type="text" id="q" name="q" placeholder="Search" className="px-4 py-2 rounded font-medium text-gray-500"></input>
                <input hidden type="text" id="skip" name="skip" placeholder="Skip" className="w-1/12 px-4 py-2 mx-2 rounded font-medium text-gray-500"></input>
                <input hidden type="text" id="limit" name="limit" placeholder="Limit" className="w-1/6 px-4 py-2 rounded font-medium text-gray-500"></input>
                <button className="ml-5 rounded px-5 py-2 text-xl bg-green-500 text-white font-medium" type="submit">Search</button>
            </form>
        </div>
    );
}