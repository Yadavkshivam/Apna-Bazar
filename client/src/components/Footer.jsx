import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='border-t'>
        <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
            <p>© All Rights Reserved To Apna Bazar.</p>

            <div className='flex items-center gap-4 justify-center text-3xl'>
                <a href='' className='hover:text-purple-400 text:base hover:text-5xl'>
                    <FaFacebook/>
                </a>
               <a href='' className='hover:text-blue-400 text:base hover:text-5xl'>
                    <FaInstagram/>
                </a>
                 <a href='https://www.linkedin.com/in/shivam-yadav-696a8725a/' className='hover:text-green-400 text:base hover:text-5xl'>
                    <FaLinkedin/>
                </a>
            </div>

            <div className=' text-green-900 text-xl hover:font-bold hover:text-2xl hover:text-red-800 animate-bounce'>Contact Us</div>
        </div>
    </footer>
  )
}

export default Footer
