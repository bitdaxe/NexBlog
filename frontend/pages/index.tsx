/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-children-prop */
import React, { useEffect } from "react"
import Navbar from "../components/navbar";
import useStore from "../store/useStore";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from "next/link";


const HomePage = (): JSX.Element=>{
  const loadBlogs = useStore(state=> state.loadBlogs)
  const blogs = useStore(state => state.blogs)

  useEffect(()=>{
    loadBlogs()
   
  }, [])

  return(
    <>
      <Navbar/>

      {blogs.length > 0 ? 
      <div className="container mt-16">
        {blogs.map((blog, index)=>(
          <div key={index}>
            
            <div className="mb-4  p-6 bg-dark border text-white border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight  dark:text-white">{blog.title}</h5>
                </a>
                <p className="mb-3 font-normal text-teal-500">Author: {blog.owner}</p>
              
                <p className="mb-3 font-normal "> <ReactMarkdown remarkPlugins={[remarkGfm]}  children={blog.description} /></p>
                <Link href={`/blog/${blog.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-blue-800">
                    Read more
                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </Link>
            </div>

            </div>
        ))}
      </div> : <div className="p-5 text-white text-center"> <h1>Please login!</h1> </div>}

    </>
  )
}

export default HomePage;