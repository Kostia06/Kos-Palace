import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useTheme} from 'next-themes'
import {signOut} from 'firebase/auth'
import {auth} from './firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import {ref, uploadBytesResumable} from 'firebase/storage'
import {useDownloadURL} from 'react-firebase-hooks/storage'
import {db,storage} from '../components/firebase'
import {useCollection, useDocument} from 'react-firebase-hooks/firestore'
import {updateDoc, collection, doc,arrayUnion} from 'firebase/firestore'


const Nav = () => {
    const home = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    const storage_img = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
    const contact = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
    const about = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    const dark = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
    const light = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    const logout = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
    const create =<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
    const {theme, setTheme} = useTheme()
    const [image] = useDownloadURL(ref(storage,`profiles/${localStorage.getItem('user')}`))
    const [posts, loading, error] = useCollection(collection(db, 'posts'))
    const [user] = useDocument(doc(db,'users',localStorage.getItem('user')))
    function getLikes(){
        var likes = 0
        if(posts){
            posts.forEach(post =>{
              if(post.data().username === user.data().username){
                likes = likes + post.data().likes
              }
            })
        }
        return likes
    }
    return (
        <div className='w-20 bg-teal-400 border-r-[3px] border-r-black h-screen flex  items-center  flex-col-reverse justify-center z-50'>
            <div className='flex flex-col h-[50%] place-content-evenly'>
                {Item(home,'/')}  
                {Item(contact,'/User')}
                {Item(storage_img,'/Posts')}
            </div>
            <div className='flex flex-col items-center'>
              <div className=' group flex flex-col items-center justify-center'>
              <label className=' z-20 hover:bg-teal-500 p-2 rounded-full w-15 h-15' htmlFor='menu'><img className='cursor-pointer w-14 h-14 rounded-full' src={image}></img></label>
                <input type='checkbox' id='menu' className='peer hidden'></input>
                <div className='bg-teal-400 border-[3px] border-black absolute  peer-checked:translate-x-[100%] flex-col duration-[0.3s] items-center md:p-2 rounded-2xl    peer-checked:scale-100 scale-0 '>
                  <h1>❤️{getLikes()}</h1>
                  <button className='flex text-center  flex-col items-center rounded-2xl ' type="button" onClick={()=> setTheme(theme === 'light'?'dark':'light')}>
                      {theme === 'light'? light:dark}
                  </button>
                  <button className='flex  flex-col items-center text-black  ' onClick={()=>{signOut(auth);localStorage.setItem('user','')}}>
                      LogOut
                  </button>
                </div>
              </div>
            </div>
        </div>
    )
}
const Item = (icon, link) =>{
  return(
    <Link key={link} href={link}>
        <a className='flex flex-col stroke-white items-center group hover:bg-teal-500 md:p-2 rounded-full '>
          {icon}
        </a>
    </Link>
  )
}
export default Nav