import React, {useState} from 'react'
import {db,storage} from './firebase'
import {useDocument, useCollection} from 'react-firebase-hooks/firestore'
import {updateDoc, doc, collection} from 'firebase/firestore'
import {ref} from 'firebase/storage'
import {useDownloadURL} from 'react-firebase-hooks/storage'
import Loading from './Loader'
import {uploadBytesResumable} from 'firebase/storage'
const Account = () => {
    const [bg,setBg] = useState('rgb(229 231 235)')
    const [username, setUsername] = useState('')
    const [image] = useDownloadURL(ref(storage,`profiles/${localStorage.getItem('user')}`))
    var currentUser = ''
    const [users] = useCollection(collection(db, 'users'))
    const [user] = useDocument(doc(db, 'users',localStorage.getItem('user')))
    const reader = new FileReader();
    if(!image){
      return(<Loading />)
    }

    function handleChange(){
        if(bg === 'rgb(248 113 113)'){return}
        const info ={
          'username': username,
          'image':image,
        }
        updateDoc(doc(db, `user`, localStorage.getItem('user')), info)
        setBg('rgb(229 231 235)')
        setUsername('')
    }
    function handleUsername(e){
        e.preventDefault();
        setBg('rgb(74 222 128)')
        users.forEach(user=>{
            if(user.data().username === e.target.value){setBg('rgb(248 113 113)');return}
        })
        if(e.target.value.length < 3){setBg('rgb(248 113 113)')}
        if(e.target.value.at(-1) === ' '  || e.target.value.length > 25){setBg('rgb(248 113 113)');return}
        setUsername(e.target.value)
    }
    function handleImage(e){
        e.preventDefault();
        uploadBytesResumable(ref(storage, `profiles/${localStorage.getItem('user')}`),e.target.files[0])
    }
    return (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="rounded-2xl w-[250px] h-[300px] flex flex-col items-center place-content-evenly p-2" style={{backgroundColor:bg}}>
            <h1 className='text-black'>Account</h1>
            <div className='flex flex-col items-center justify-center pb-3 space-y-5'>
                <div className='bg-gray-400 p-2 rounded-full'>
                    <input accept="image/*" type="file" id='image' onChange={handleImage}  className='hidden'></input>
                    <label htmlFor='image' className=' w-14 h-14 cursor-pointer'>
                        
                        <img src={image} className='w-14 h-14 rounded-full'>

                        </img>
                        
                    </label>
                </div>
                <div className='border-teal-400 border-b-[3px]'>
                    <input type="text" id='text' value={username} onChange={handleUsername} className="text-black appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-black placeholder:text-center" placeholder={user.data().username}></input>
                </div>
            </div>
            <button className="p-2 border-[3px] border-black text-black rounded-xl translation-all duration-[0.3s]" onClick={handleChange}>
                Create Account
            </button>
        </div>
      </div>
    )
}

export default Account