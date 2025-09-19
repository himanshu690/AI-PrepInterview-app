import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({
  value,
  onChange,
  label,
  placeholder,
  type,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = ()=>{
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className='text-[13px] font-semibold text-slate-800'>{label}</label>
      <div className='input-box'>
        <input type={
          type === 'password' ?(showPassword ? "text": "password") : type
        }
        placeholder={placeholder}
        className='w-full bg-transparent outline-none'
        value={value}
        onChange={(e)=> onChange(e)}
        />
        {type === 'password' && (
          <>
            {showPassword ? (
              <FaRegEye size={22}
                className="text-primary cursor-pointer" 
                onClick={()=> toggleShowPassword()}
              /> 
              
            ) : (
              <FaRegEyeSlash size={20} 
                className="text-gray-600 cursor-pointer" 
                onClick={()=> toggleShowPassword()}
              />
            )}
          </>
        )}
        

      </div>
    </div>
  )
}

export default Input
