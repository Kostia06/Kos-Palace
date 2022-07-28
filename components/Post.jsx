import React, {useState} from 'react'
import {db, storage} from '../components/firebase'
import {updateDoc, collection, doc,arrayUnion} from 'firebase/firestore'
import {AiFillHeart,AiOutlineMessage} from 'react-icons/ai'
import Link from 'next/link'
import {ref,getDownloadURL} from 'firebase/storage'
const Post = (info,user, type='') =>{
    const remove = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    var liked = false
    if(type==='mine'&&info.data().username !== user.data().username){return(<></>)}
    if(type==='like'&&!user.data().liked.includes(info.data().name)){return(<></>)}
    if(user.data().liked.includes(info.data().name)){liked = true}
    function handleLike(){
        if(!liked){
          const newLike = {
              'likes': info.data().likes + 1
          }
          updateDoc(doc(db, `posts`, info.data().name),newLike )
          updateDoc(doc(db, `users`, localStorage.getItem('user')),{'liked':arrayUnion(info.data().name)} )
      }else{
        const newLike = {
              'likes': info.data().likes - 1
          }
          const list = user.data().liked.filter(function(e) { return e !== info.data().name })
          updateDoc(doc(db, `posts`, info.data().name),newLike )
          updateDoc(doc(db, `users`, localStorage.getItem('user')),{'liked':list} )
      }
    }
    return(
      <div key={info.id}  className='w-fit h-fit shrink-0 bg-teal-400 p-2 rounded-2xl border-black border-[3px]'>
          <div className='flex items-center px-2 p-1' >
                <h1>{info.data().username}</h1>
          </div>
          <div>
            <p className='text-sm px-2 py-1'>{info.data().content}</p>
          </div>
          <div className='flex items-center space-x-1 justify-center'>
            {info.data().tags.map(tag=>{
              return(
                <h1 key={tag}>{tag}</h1>
              )
            })}
          </div>
          <div className='flex place-content-evenly items-center '>
              <button onClick={handleLike} className='flex'>
                {!liked?<AiFillHeart className='text-2xl '/>:<AiFillHeart className='text-2xl fill-red-500'/>}
                {info.data().likes}
              </button>
                  <Link href={'/Comment/' + info.data().name} >
                    <a className='flex items-center'>
                        <AiOutlineMessage className='text-2xl'/>{info.data().comments.length}
                    </a>
                </Link>
          </div>
          
      </div>
    )
}
export default Post