import React,{useState,useRef} from 'react'
import emailjs from 'emailjs-com';
const Contact = () => {
    const [bg,setBg] = useState('rgb(229 231 235)')
    const form = useRef(null);
    function sendEmail(e){
        e.preventDefault();
        emailjs.sendForm('service_8xsxq6d', 'template_b7acrrt', form.current, 'dP-NFf8IW9GWxrZ32').catch(err=>{alert(err)})
        const email = document.getElementById('email') 
        const user =document.getElementById('name') 
        const ms = document.getElementById('ms')
        email.value = ''; user.value='';ms.value=''
        setBg('rgb(229 231 235)')
    }
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form ref={form} onSubmit={sendEmail} className="rounded-2xl w-[300px] h-[400px] flex flex-col items-center place-content-evenly p-2" style={{backgroundColor:bg}}>
            <h1 className='text-black'>Send Email</h1>
            <div className='flex flex-col items-center justify-center pb-3 space-y-5'>
                <div className='border-teal-400 border-b-[3px]'>
                    <input title='name' autoComplete='off' name="user_name" required type="text" id='name' className="text-black appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-black" placeholder='Name'></input>
                </div>
                <div className='border-teal-400 border-b-[3px]'>
                    <input title='email' autoComplete='off'name="user_email" required type="email" id='email'  className="text-black appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-black" placeholder='Email'></input>
                </div>
                <div className='border-teal-400 border-b-[3px]'>
                    <textarea title='message' autoComplete='off'name="message" required maxLength={350} type="text" id='ms' className="text-black appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-black" placeholder='Message'></textarea>
                </div>
            </div>
            <button type="submit"  className="p-2 border-[3px] border-black text-black rounded-xl translation-all duration-[0.3s]" >
                Send
            </button>
            </form>
        </div>
    )
}

export default Contact