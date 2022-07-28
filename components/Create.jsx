import React, {useState} from 'react'
import {db,storage} from './firebase'
import {useCollection} from 'react-firebase-hooks/firestore'
import {setDoc, collection, doc} from 'firebase/firestore'
import { v4 } from 'uuid';
import {ref, uploadBytesResumable} from 'firebase/storage'
const Create = () => {
    const remove = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    const [bg,setBg] = useState('rgb(229 231 235)')
    const [username, setUsername] = useState('')
    var currentUser = ''
    const [users] = useCollection(collection(db, 'users'))
    if(users){
      users.forEach(user =>{if(user.id === localStorage.getItem('user')){currentUser = user.data().username;return}})
    }
    function handleName(e){
        e.preventDefault();
        setBg('rgb(74 222 128)')
        users.forEach(user=>{
            if(user.data().username === e.target.value){setBg('rgb(248 113 113)');return}
        })
        if(e.target.value.length < 3){setBg('rgb(248 113 113)')}
        if(e.target.value.length > 50){setBg('rgb(248 113 113)');return}
        setUsername(e.target.value)
    }
    function handleCreate(){
        if(bg === 'rgb(248 113 113)'){return}
        const ms = document.getElementById('ms').value
        const tags = document.getElementById('tags').value.split(',')
        const id = v4()
        if( ms === '' || tags.length === 0){setBg('rgb(248 113 113)');return}
        const info = {
            'name':id,
            'content':ms,
            'tags':tags,
            'likes':0,
            'comments':[],
            'username':currentUser,
            'owner':localStorage.getItem('user'),
        }
        setDoc(doc(db, `posts`,id), info)
        ms = document.getElementById('ms').value = ''
        tags = document.getElementById('tags').value =''
        setBg('rgb(229 231 235)')
    }

    // function isFileImage(img) {
    //     return img && img['type'].split('/')[0] === 'image';
    // }
    return (
        <div className="w-full h-screen flex items-center justify-center">
        <div className="rounded-2xl w-[300px] h-[400px] flex flex-col items-center place-content-evenly p-2" style={{backgroundColor:bg}}>
          <h1 className='text-black'>Create Post</h1>
          <div className='flex flex-col items-center justify-center pb-3 space-y-5'>
              <div className='border-teal-400 border-b-[3px]'>
                  <textarea autoComplete='off' maxLength={350} type="text" id='ms' className="text-black max-h-28 appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-black" placeholder='Message'></textarea>
              </div>
              {/* <div className="flex flex-col w-full h-22">
                    <button className='bg-red-300 rounded-full absolute z-40' onClick={()=>{setFile('')}}>
                              {remove}
                    </button> 
                    <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-22 bg-gray-50 rounded-2xl border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        {file === ''?
                        <div className="flex flex-col justify-center items-center pt-5 pb-6">
                            <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="text-sm">Click to upload or drag and drop</p>
                        </div>
                        :
                        <>
                            {isFileImage(file)?
                            <img className="w-22 h-44" src={URL.createObjectURL(file)}></img>
                            :
                            <video width="320" height="240" controls>
                                <source src={URL.createObjectURL(file)} ></source>
                            </video>
                            }
                        </>
                        
                        }
                        <input id="dropzone-file" type="file" className="hidden" onChange={handleImage}></input>
                    </label>
                </div>  */}
              <div className='border-teal-400 border-b-[3px]'>
                  <input autoComplete='off' type="text" id='tags' className="text-black appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-black" placeholder='Tags'></input>
              </div>
          </div>
          <button className="p-2 border-[3px] border-black text-black rounded-xl translation-all duration-[0.3s]" onClick={handleCreate}>
              Post
          </button>
        </div>
      </div>
    )
}
export default Create