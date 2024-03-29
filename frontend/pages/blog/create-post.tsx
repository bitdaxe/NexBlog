/* eslint-disable react/no-children-prop */
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import axios from 'axios'
import { API_URL } from '../../config'
import ReactMarkdown from 'react-markdown'
import MarkdownRenderer from 'react-markdown-renderer';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import Cookies from 'js-cookie';
import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

const MakePost = () => {
    const router = useRouter();
    const [blog, setBlog] = useState({title:"", description:"",blog:""})
    const [value, setValue] = useState('mkdStr');


    const handleChange = (event:any) => {
        const name = event.target.name;
        
        const value = event.target.value;
        setBlog({ ...blog, [name]: value });
      };

    const handleChangeMd = (event: any)=>{
        console.log(event.target.value);
        
    }
    
      const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
            e.preventDefault();

            try {
                const res =  await axios.post(`${API_URL}/api/create-blog/`, { title: blog.title, description: blog.description, blog: value }, {withCredentials: true, headers:{
                    'X-CSRFToken': Cookies.get('csrftoken')
                }});

                if (res.status == 201){
                    router.push(`/blog/${res.data.id}`);
                }
            } catch (error) {
                console.log(error);                
            }
    
      }

  return <>

        <Navbar/>
     
        <div className='text-white p-5 mt-10'>
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <label htmlFor="title" className="text-lg font-thin  mb-2">Title</label>
                <input onChange={handleChange} name='title' type="text" id="title" className="bg-slate-800 focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" placeholder="Enter the title of your blog post"/>
            </div>
            <div className="flex flex-col mt-4">
                <label htmlFor="description" className="text-lg font-thin  mb-2">Description</label>
                <textarea onChange={handleChange} name='description' id="description" className="bg-slate-800 h-40 focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" placeholder="Enter a short description of your blog post"></textarea>
            </div>
            <div data-color-mode="light" className="mt-10 border p-4 rounded">
                 <label htmlFor="description" className="text-lg font-thin  mb-2">Blog Post</label>
                <MarkdownEditor style={{height:500}} value={value} onChange={setValue} />
            </div>
            <div className="flex mt-4">
            <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg  w-full transition duration-500 shadow-lg">Submit</button>
            </div>
        </form>

        </div>
    </>
}

export default MakePost
