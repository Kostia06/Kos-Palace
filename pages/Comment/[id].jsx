import React from 'react'
import { useRouter } from 'next/router'
import {db} from '../../components/firebase'
import {useCollection, useDocument} from 'react-firebase-hooks/firestore'
import {updateDoc, collection, doc,arrayUnion} from 'firebase/firestore'
import Loading from '../../components/Loader'
const Comment = () => {
    const remove = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    const router = useRouter()
    const { id } = router.query
    const [user, loading] = useDocument(doc(db,'users',localStorage.getItem('user')))
    const [info] = useDocument(doc(db,'posts',id))
    function handleRemove(index){
        const list = info.data().comments
        list.splice(index,1)
        updateDoc(doc(db, `posts`, info.data().name),{'comments':list})
    }
    function handleSend(){
        const comment = document.getElementById('comment')
        updateDoc(doc(db, `posts`, info.data().name),{'comments':arrayUnion({'text':comment.value, 'name':user.data().username})})
        comment.value = ''
    }
    if(!info){return(<></>)}
    return (
      <>
      {loading?<Loading/>:
      <div className="w-screen h-screen overflow-y-scroll flex flex-col items-center justify-center">
        <div className="w-fit">
          <div className="bg-teal-400 rounded-b-none p-5 rounded-2xl mt-10  ">
              <div className='flex items-center px-2 p-1' >
                  <h1 className='text-3xl'>{info.data().username}</h1>
              </div>
              <div>
                <p className='text-base px-2 py-1'>{info.data().content}</p>
              </div>
              <div className='flex items-center space-x-1 justify-center'>
                {info.data().tags.map(tag=>{
                  return(
                    <h1 key={tag}>{tag}</h1>
                  )
                })}
              </div>
          </div>
          <div className="bg-gray-200 flex flex-col w-fit rounded-t-none  items-center justify-center  p-5 rounded-2xl ">
                <div className='flex'>
                  <textarea type="text" id='comment'   maxLength={50} className="text-black max-h-28 appearance-none bg-transparent border-none w-full  py-1 px-1 leading-tight focus:outline-none placeholder:text-black" placeholder="Comment"></textarea>
                  <button onClick={handleSend} className='border-black border-[3px] rounded-2xl p-2'>Send</button>
                </div>

                <div className="bg-gray-200 rounded-t-none grid col-auto divide-y w-80 divide-[black]  h-fit  overflow-y p-5 rounded-2xl ">
                  {info.data().comments.map((comment,index)=>{
                      return(
                        <div key={comment.text} className='m-2 flex items-center '>
                            <div>
                              <h1 className='pb-1'>{comment.name}</h1>
                              <p className='text-sm pl-2'>{comment.text}</p>
                            </div>
                            {!comment.name === user.data().username?<></>:
                            <button className='bg-red-300 rounded-full translate-x-[100%]' onClick={()=>{handleRemove(index)}}>
                              {remove}
                            </button> 
                            }
                        </div>
                      )

                  })}
              </div>
          </div>
        </div>
      </div>
      }
      </>
    )
}

export default Comment