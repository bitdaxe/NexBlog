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
import useStore from '../../store/useStore'
import Link from 'next/link'

const atomDark = {
    "code[class*=\"language-\"]": {
      "color": "#c5c8c6",
      "textShadow": "0 1px rgba(0, 0, 0, 0.3)",
      "fontFamily": "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
      "direction": "ltr",
      "textAlign": "left",
      "whiteSpace": "pre",
      "wordSpacing": "normal",
      "wordBreak": "normal",
      "lineHeight": "1.5",
      "MozTabSize": "4",
      "OTabSize": "4",
      "tabSize": "4",
      "WebkitHyphens": "none",
      "MozHyphens": "none",
      "msHyphens": "none",
      "hyphens": "none"
    },
    "pre[class*=\"language-\"]": {
      "color": "#c5c8c6",
      "textShadow": "0 1px rgba(0, 0, 0, 0.3)",
      "fontFamily": "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
      "direction": "ltr",
      "textAlign": "left",
      "whiteSpace": "pre",
      "wordSpacing": "normal",
      "wordBreak": "normal",
      "lineHeight": "1.5",
      "MozTabSize": "4",
      "OTabSize": "4",
      "tabSize": "4",
      "WebkitHyphens": "none",
      "MozHyphens": "none",
      "msHyphens": "none",
      "hyphens": "none",
      "padding": "1em",
      "margin": ".5em 0",
      "overflow": "auto",
      "borderRadius": "0.3em",
      "background": "#1d1f21"
    },
    ":not(pre) > code[class*=\"language-\"]": {
      "background": "#1d1f21",
      "padding": ".1em",
      "borderRadius": ".3em"
    },
    "comment": {
      "color": "#7C7C7C"
    },
    "prolog": {
      "color": "#7C7C7C"
    },
    "doctype": {
      "color": "#7C7C7C"
    },
    "cdata": {
      "color": "#7C7C7C"
    },
    "punctuation": {
      "color": "#c5c8c6"
    },
    ".namespace": {
      "Opacity": ".7"
    },
    "property": {
      "color": "#96CBFE"
    },
    "keyword": {
      "color": "#96CBFE"
    },
    "tag": {
      "color": "#96CBFE"
    },
    "class-name": {
      "color": "#FFFFB6",
      "textDecoration": "underline"
    },
    "boolean": {
      "color": "#99CC99"
    },
    "constant": {
      "color": "#99CC99"
    },
    "symbol": {
      "color": "#f92672"
    },
    "deleted": {
      "color": "#f92672"
    },
    "number": {
      "color": "#FF73FD"
    },
    "selector": {
      "color": "#A8FF60"
    },
    "attr-name": {
      "color": "#A8FF60"
    },
    "string": {
      "color": "#A8FF60"
    },
    "char": {
      "color": "#A8FF60"
    },
    "builtin": {
      "color": "#A8FF60"
    },
    "inserted": {
      "color": "#A8FF60"
    },
    "variable": {
      "color": "#C6C5FE"
    },
    "operator": {
      "color": "#EDEDED"
    },
    "entity": {
      "color": "#FFFFB6",
      "cursor": "help"
    },
    "url": {
      "color": "#96CBFE"
    },
    ".language-css .token.string": {
      "color": "#87C38A"
    },
    ".style .token.string": {
      "color": "#87C38A"
    },
    "atrule": {
      "color": "#F9EE98"
    },
    "attr-value": {
      "color": "#F9EE98"
    },
    "function": {
      "color": "#DAD085"
    },
    "regex": {
      "color": "#E9C062"
    },
    "important": {
      "color": "#fd971f",
      "fontWeight": "bold"
    },
    "bold": {
      "fontWeight": "bold"
    },
    "italic": {
      "fontStyle": "italic"
    }
  };

import remarkGfm from 'remark-gfm'

interface Blog{
    title: string, blog: string, description: string, id:number, owner: string
}

const Post = () => {
  const router = useRouter()
  const { id } = router.query
  const user = useStore(state => state.user)
  const [blog, setBlog] = useState<Blog>()

  useEffect(()=>{
  
    if(id !== undefined)
    try {
      
    } catch (error) {
      console.log(error);
      
    }
    axios.get(`${API_URL}/api/blog/${id}`, {withCredentials: true})
    .then(res=>{
        console.log(res.data);
        setBlog(res.data)
        
    })
    .catch(err=>{
        console.log(err)
        
    })
  }, [id])

  const  handleDelete = async () =>{
    try {
      const res = await axios.delete(`${API_URL}/api/blogdu/${id}`,{withCredentials: true, headers:{
        'X-CSRFToken': Cookies.get('csrftoken')
      }})
      
      router.push('/');
      
    } catch (error) {
      console.log(error);
      
    }
   
  }

  return <>

        <Navbar/>
        <style jsx global>{`
            a{
                color:cyan;
                text-decoration: underline;
            }
      `}</style>
        <div className='mt-16 p-4 text-white'>
            {blog != null ? 
            <div>
              <div className="grid grid-cols-4 gap-4">
            <div className='col-span-3'>
              <h5 className="mb-2 text-2xl font-bold tracking-tight  dark:text-white">{blog.title}</h5>
                <p className='mb-10'>Author: {blog.owner}</p>
                <p className='mb-10'>{blog.description}</p>
            </div>

            <div>
              {user != null && user.username == blog.owner ? <>
                <button className="mx-3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                <Link className='no-underline text-white' href={`/editBlog/${id}`}> Edit </Link> 
              </button>
              <button onClick={handleDelete} className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                Delete
              </button>
              </> : null}
             
            </div>
          </div>
              
                {/* <ReactMarkdown remarkPlugins={[remarkGfm]}  children={blog.blog} /> */}
                <ReactMarkdown
                    children={blog.blog}
                    components={{
                    code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '')}
                            style={atomDark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        />
                        ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                        )
                    }
                    }}
                />
            </div>
            : null}
        
        </div>
    

    </>
}

export default Post
