import '../styles/globals.css'
import Head from 'next/head'
import React from 'react'
import Nav from '../components/Nav'
import {auth,db} from '../components/firebase'
import {ThemeProvider} from 'next-themes'
import { useAuthState } from "react-firebase-hooks/auth";
import {useCollection} from 'react-firebase-hooks/firestore'
import {collection} from 'firebase/firestore'
import SignIn from '../components/SignIn'
import CreateAccount from '../components/CreateAccount'
function MyApp({ Component, pageProps }) {
  const [currentUser] = useAuthState(auth);
  var created = false
  const [users] = useCollection(collection(db, 'users'))
  if(currentUser){localStorage.setItem('user', currentUser.email)}
  if(users){
    users.forEach(user=>{if(user.id === localStorage.getItem('user')){created = true;return}})
  }
  return(
  <ThemeProvider attribute='class'>
      <div className='blob fixed top-0 left-0 fill-teal-400'>
          <svg xmlns="http://www.w3.org/1999/xlink , http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 310 350"><path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z"/></svg>
      </div>
      <Head>
        <title>Kos-Palace</title>
        <meta name="description" content="Social Media App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {!currentUser?<SignIn/>:
         <>
            {!created?<CreateAccount/>:
              <div className='flex items-center'>
              <Nav />
              <Component {...pageProps} />
              </div>
            }
          </>
      }

  </ThemeProvider>) 
}

export default MyApp
