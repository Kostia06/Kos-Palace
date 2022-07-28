import React, {useState} from 'react'
import {db} from '../components/firebase'
import {useCollection, useDocument} from 'react-firebase-hooks/firestore'
import {collection, doc} from 'firebase/firestore'
import Loading from '../components/Loader'
import Post from '../components/Post'
const Posts = () => {
  const [posts, loading, error] = useCollection(collection(db, 'posts'))
  const [user] = useDocument(doc(db,'users',localStorage.getItem('user')))
  const [type, setType] = useState('mine')
  return (
    <div className='w-screen h-screen flex items-center flex-col'>
        {loading?<Loading/>:
          <>
            <div className='bg-teal-400 flex p-5 rounded-2xl my-10 space-x-5 border-black border-[3px]'>
                {type === 'like'?<button className='border-[3px] border-black text-black rounded-xl p-2 bg-green-500' onClick={()=>{setType('like')}}>Liked</button>:<button className='border-[3px] border-black text-black rounded-xl p-2' onClick={()=>{setType('like')}}>Liked</button>}
                {type === 'mine'?<button className='border-[3px] border-black text-black rounded-xl p-2 bg-green-500' onClick={()=>{setType('mine')}}>Mine</button>:<button className='border-[3px] border-black text-black rounded-xl p-2' onClick={()=>{setType('mine')}}>Mine</button>}
            </div>
            <div className='flex h-full w-full flex-start gap-2 flex-wrap'>
                {posts.docs.map(post =>{
                    const list = [post.data().name, post.data().username].concat(post.data().tags)
                    var work = false
                    list.forEach(text =>{
                        if(text.toLowerCase().replace(' ','').includes(search.toLowerCase().replace(' ',''))){work = true}
                    })
                    if(!work){return(<></>)}
                    return(
                      Post(post,user,type)
                    )
                })}
            </div>
          </>
          }
    </div>
  )
}

export default Posts