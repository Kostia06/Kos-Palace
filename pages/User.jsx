import React, {useState} from 'react'
import Account from '../components/Account'
import Create from '../components/Create'
import Contact from '../components/Contact'
const User = () => {
    const [page, setPage] = useState(1)
  return (
    <div className="w-full h-screen flex items-center flex-col overflow-hidden">
        {page===1 && <Account />}
        {page===2 && <Create />}
        {page===3 && <Contact />}
        <div className="flex space-x-10 mb-5 items-center justify-center">
            <button onClick={()=>{setPage(1)}} className='text-6xl flex flex-col-reverse items-center group text-white'>.<spam className='text-white text-base absolute group group-hover:translate-y-[-100%] group-hover:scale-100 scale-0'>Account</spam></button>
            <button onClick={()=>{setPage(2)}} className='text-6xl flex flex-col-reverse items-center group text-white'>.<spam className='text-white text-base absolute group group-hover:translate-y-[-100%] group-hover:scale-100 scale-0'>Create</spam></button>
            <button onClick={()=>{setPage(3)}} className='text-6xl flex flex-col-reverse items-center group text-white'>.<spam className='text-white text-base absolute group group-hover:translate-y-[-100%] group-hover:scale-100 scale-0'>Contact</spam></button>
        </div>
    </div>
  )
}

export default User