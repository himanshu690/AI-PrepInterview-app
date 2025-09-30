import React, { useContext } from 'react'
import { useState } from "react";
import HERO_IMG from "../assets/hero-img.png"
import Modal from '../components/Modal';
import Login from '../pages/Auth/Login'
import SignUp from '../pages/Auth/SignUp'
import { UserContext } from '../context/userContext';
import { Navigate } from 'react-router-dom';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';
const LandingPage = () => {
  const {user} = useContext(UserContext)
  const[openAuthModal, setOpenAuthModal] = useState(false);
  const[currentPage, setCurrentPage] = useState("login");

  const handleCTA = () =>{
    if(!user) {
      setOpenAuthModal(true);
    }else{
      navigate("/dashboard") 
  }
};
  
  
  return (
    <>
      <div className='w-full min-h-full bg-[#fffcef] pb-36'>
      <div className='w-[500px] h[500px] bg-amber-200/20 blur-[65px]  absolute top-0 left-0' />
      <div className='container mx-auto px-4 pt-6 pb-[200px] relative z-10 '>
        <header className='flex justify-between items-center mb-16'>
          <div className='text-xl text-black font-bold'>
            Interview Prep AI 
          </div>
            {user ? (<ProfileInfoCard/>
            ) : (
              <button 
              className="bg-gradient-to-r from-[#ff9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full border border-white transition-colors cursor-pointer hover:bg-black hover:from-transparent hover:to-transparent hover:text-white"
              onClick={()=> setOpenAuthModal(true)}
            >
              Login / Sign Up
              
            </button>
            )}
            
            
        </header>


        <div className= "flex flex-col md:flex-row items-center"> 
          <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0 " >
            <div className="flex items-center justify-left mb-2 ">
              <div className='flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300'>
                AI Powered
              </div>
            </div>
            <h1 className='text-5xl text-black font-medium mb-6 leading-tight'>
              Ace Interview with 
              <span className='ml-3 text-transparent bg-clip-text bg-[radial-gradient(circle,_#ff9324_0%,_#fcd760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold '>
                AI-Powered
              </span>{" "}
              Learning
            </h1>
          </div>
          <div className='w-full md:w-1/2'>
            <p className='text-[17px] text-gray-900 mr-0 md:mr-20 mb-6'>
              Get role specific questions, expand answers when you need them,
              dive deeper into concepts. and organise everything your way.
              from oreoration to mastry - your ultimate interview toolkit is
              here.
            </p>
            <button
              className='bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover-border-yellow-300 transition-colors cursor-pointer'
              onClick={handleCTA}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      </div>

      <div className='w-full min-h-full relative z-10 mb-2'>

        <div >
          <section className='flex items-center justify-center -mt-36'>
            <img src={HERO_IMG} alt="Image here" 
              className='w-[80vm] rounded-lg'  
            />
          </section>
        </div>
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={()=>{
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage == "login" && (
            <Login setCurrentPage={setCurrentPage}/>
          )}
          {currentPage == "signup" && (
            <SignUp setCurrentPage={setCurrentPage}/>
          )}
        </div>
      </Modal>
      
      
      

    </>
  )
}

export default LandingPage
