import React, {useState} from 'react'
import {db,storage} from '../components/firebase'
import {useCollection} from 'react-firebase-hooks/firestore'
import {setDoc, collection, doc} from 'firebase/firestore'
import {ref, uploadBytesResumable} from 'firebase/storage'
const CreateAccount = () => {
    const [bg,setBg] = useState('rgb(229 231 235)')
    const [username, setUsername] = useState('')
    const [image, setImage] = useState('')
    const [users] = useCollection(collection(db, 'users'))
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
    function handleCreate(){
        if(bg === 'rgb(248 113 113)'){setBg('rgb(248 113 113)');return}
        if(image === ''){setBg('rgb(248 113 113)');return}
        const info = {
            'username':document.getElementById('username').value,
            'liked':[],
            'disliked':[],
            'posts':[],
        }
        setDoc(doc(db, `users`, localStorage.getItem('user')), info)
        uploadBytesResumable(ref(storage, `profiles/${localStorage.getItem('user')}`),image)
    }   
    function handleImage(e){
        e.preventDefault();
        setBg('rgb(74 222 128)')
        setImage(e.target.files[0])
    }
    return (
    <div className="absolute  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-2xl w-[250px] h-[300px] flex flex-col items-center place-content-evenly p-2" style={{backgroundColor:bg}}>
          <h1 className='text-black'>Create Account</h1>
          <div className='flex flex-col items-center justify-center pb-3 space-y-5'>
                
                <div className='bg-gray-400 p-2 rounded-full'>
                    <input accept="image/*" type="file" id='image' onChange={handleImage} className='hidden'></input>
                    <label htmlFor='image' className=' w-14 h-14 cursor-pointer'>
                        {image === ''?<svg className="text-gray-500 w-14 h-14" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>:
                        <img src={URL.createObjectURL(image)} className='w-14 h-14 rounded-full'>

                        </img>
                        }
                    </label>
                </div>


                <div className='border-teal-400 border-b-[3px]'>
                    <input type="text" id='username' value={username} onChange={handleUsername}  className="text-black appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-black" placeholder="UserName"></input>
                </div>
          </div>
        <button className="p-2 border-[3px] border-black text-black rounded-xl translation-all duration-[0.3s]" onClick={handleCreate}>
            Create Account
        </button>
    </div>
  )
}

export default CreateAccount