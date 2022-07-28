import React from 'react'
import {auth} from './firebase'
import {AiFillGoogleCircle} from 'react-icons/ai'
import { signInWithEmailAndPassword,sendPasswordResetEmail, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth';
const CreateAccount = () => {
    const handleSignInRedirect = () =>{
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider)
    }
    const handleSignIn = () => {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        signInWithEmailAndPassword(auth, email, password).then(()=>{setBg('#14a76c')}).catch((err) => {console.log('Error: ' + err.toString());setBg('#c3073f')})
    }
    const handleSignUp =() =>{
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        createUserWithEmailAndPassword(auth,email, password).then(()=>{setBg('#14a76c')}).catch((err) => {console.log('Error: ' + err.toString());setBg('#c3073f')})
    }   
    return (
        <div className="absolute  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-2xl w-[250px] h-[300px] bg-gray-200 flex flex-col items-center justify-center p-2">
            <div className='flex flex-col items-center justify-center pb-3 space-y-5'>
                <div className='border-orange-400 border-b-[3px]'>
                    <input type="email" id='email' className="text-black appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-black" placeholder="Email"></input>
                </div>
                <div className='border-orange-400 border-b-[3px]'>
                    <input minLength={6} type="password" id='password' className="text-black appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-black" placeholder="Password"></input>
                </div>
            </div>
            <div className='flex items-center justify-center space-x-5'>
                <button className="p-2 border-[3px] border-black text-black rounded-xl translation-all duration-[0.3s]" onClick={()=>{handleSignIn()}}>
                        Sign In
                </button>
                <button className="p-2 border-[3px] border-black text-black rounded-xl translation-all duration-[0.3s]" onClick={()=>{handleSignUp()}}>
                        Sign Up
                </button>
            </div>
            <div className="flex items-center justify-center w-52">
                <span className="p-2 text-orange-400 mb-1">OR</span>
             </div>
            <div className='rounded-xl border-[3px] border-black p-2 flex hover:animate-none  translation-all duration-[0.3s] z-10'>
                <button onClick={()=>{handleSignInRedirect()}} className='text-black embed-black flex group items-center justify-center'>
                    <AiFillGoogleCircle className='z-10 pr-2 w-9 h-9 fill-black'/><h1 className='text-black z-10'>Google</h1>
                </button>
            </div>
        </div>
    )
}

export default CreateAccount