import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'

const Login = () => {

    const [email,setEmail]=useState();
    const [password,setPassword]= useState();

    const loginUser =async (e) => {
        e.preeventDefault();

        const res =await fetch ('/login' , {
            method :"POST" ,

            headers :{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data =res.json();
        if(res.status === 400 || !data){
            window.alert("Invalid Credentials");
        }
        else {
            window.alert("login suucessful");
        }
    }


    return (
       <>
       <section className="login">
       <div className="container mt-5">
       <div className="login-content">
       <div className="login-form">
       <h2 className="form-title">Login</h2>
       <form className="register-form" id="register-form">
       <div className="form-group">
       <label htmlFor="name">
       <i class="zmdi zmdi-account material-icons-name"></i></label>
       <input type="text" name="name" id="name" autoComplete="off" 
       value={email}  onChange={ (e) => {
           setEmail(e.target.value)
       }}
       placeholder="youremail"/>
       <br/>
 

       <label htmlFor="password">
       <i class="zmdi zmdi-lock material-icons-name"></i></label>
       <input type="password" name="password" id="password" autoComplete="off"
       value={password}  onChange={ (e) => {
        setPassword(e.target.value)
    }}
       placeholder="yourpassword"/>
       </div>

       <NavLink to="/signup" className="signup-image-link">Create an account</NavLink>

       <div className="form-group form-button">
       <input type="submit" name="signin" id="signin" className="form-submit" value="login" onclick={loginUser}></input></div>

       
       </form>
       </div>
       </div>
       </div></section>
       </>
    )
}

export default Login
