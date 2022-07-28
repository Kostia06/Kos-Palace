import React, {useState} from 'react'
import {db, storage} from '../components/firebase'
import {useCollection, useDocument} from 'react-firebase-hooks/firestore'
import {updateDoc, collection, doc,arrayUnion} from 'firebase/firestore'
import {AiFillHeart,AiOutlineMessage} from 'react-icons/ai'
import Link from 'next/link'
import Loading from '../components/Loader'
import Trends from '../components/Trends'
import {useDownloadURL} from 'react-firebase-hooks/storage'
import {ref,getDownloadURL} from 'firebase/storage'
import Post from '../components/Post'
const  Home =()=> {
    const [posts, loading, error] = useCollection(collection(db, 'posts'))
    const [search, setSearch] = useState('')
    const [user] = useDocument(doc(db,'users',localStorage.getItem('user')))
    return (
        <div className="w-screen h-screen">
          {loading?<Loading/>:
          <>
          <input autoComplete='off' value={search} onChange={(e)=>{setSearch(e.target.value)}} className="border-[3px] mb-10 relative left-[50%] translate-x-[-50%]  border-teal-400 bg-white dark:bg-black  h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none dark:text-white text-black"type="text"  placeholder="Search"></input>
          <div className='flex h-full w-full flex-start gap-2 flex-wrap'>
              {posts.docs.map(post =>{
                    const list = [post.data().name, post.data().username].concat(post.data().tags)
                    var work = false
                    list.forEach(text =>{
                        if(text.toLowerCase().replace(' ','').includes(search.toLowerCase().replace(' ',''))){work = true}
                    })
                    if(!work){return(<></>)}
                  return(
                    Post(post,user)
                  )
              })}
          </div>
          </>
          }
        </div>
    )
}

export default Home