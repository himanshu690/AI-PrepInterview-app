import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import uploadImage from '../../utils/uploadImage';

const SignUp = ({setCurrentPage}) => {
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleSignUp = async (e)=>{
    e.preventDefault();
    let profileImageUrl = ""
    if(!fullName){
      setError("Please Enter a valid email address.");
      return;
    }
    if(!password){
      setError("Please enter the Password");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter the valid Email");
      return;
    }
    setError("");

    //SignUp API Call
    try{
      if(profilePic){
        const imageUploadsRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadsRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      })
      const {token}= response.data;
      if(token){
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }

    } catch(error){
      if(error.response && error.response.data.message) {
        setError("Something went wrong. Please try again.");
      }
    }

  };

  return (
    <div className='w-[98vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Create a Account</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Join us today by entering your details below
      </p>

      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
        <div className='grid grid-col-1 md:grid-col-1 gap-2'>
          <Input 
            value={fullName}  
            onChange={({target}) => setFullName(target.value)}
            label= "Full Name"
            placeholder='Name'
            type='text'
          />
          <Input 
            value={email}  
            onChange={({target}) => setEmail(target.value)}
            label= "Email Address"
            placeholder='XYZ@example.com'
            type='text'
          />
          <Input 
            value={password}  
            onChange={({target}) => setPassword(target.value)}
            label= "Password"
            placeholder='min 8 character'
            type='password'
          />
        </div>

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button type='submit' className='btn-primary rounded-full'>
          SIGNUP
        </button>

        <p className='text-[13px] text-slate-800 mt-3'>
          Already have a account?{" "}
          <button
            className='font-medium text-primary underline cursor-pointer'
            onClick={() => {
              setCurrentPage("login");
            }}
          >
            Login
            
          </button>
        </p>

      </form>
    </div>
  )
}

export default SignUp
