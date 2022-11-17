
import "./register.css"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRef } from "react";
import { toast } from 'react-toastify';
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';


const userRegisterSuccess = () => {
    toast.success("Registered successfully!")
  }
  
  const userRegisterFail = () => {
    toast.error("Failed to register!")
  }

export default function Register({setShowRegister})
{
    const nameRef = useRef()
    const emailRef = useRef()
    const passRef = useRef()

    const handleSubmit = async(e) => {
        e.preventDefault()

        const newUser = {
            userName : nameRef.current.value,
            email : emailRef.current.value,
            password : passRef.current.value
        }

        try{
            const responce = await axios.post("/users/register",newUser)
            userRegisterSuccess()
            setShowRegister(false)
        }catch(err)
        {
            userRegisterFail()
        }
    }

    return(
        <div className="register_container">
            <div className="logo">
                <ExitToAppIcon />
                Create a profile
            </div>
            <form onSubmit = {handleSubmit}>
                <input type = "text" placeholder="username" ref = {nameRef}/>
                <input type = "email" placeholder="email" ref = {emailRef}/>
                <input type = "password" placeholder="password" ref = {passRef}/>
                <button className="register_btn" >Register</button>
            </form>
            <CancelIcon className="register_cancel" onClick={() => setShowRegister(false)}/>
        </div>
    )
}