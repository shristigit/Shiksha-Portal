import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'

const Signup = () => {
    
    const [user,setUser] = useState({
        name:" " , email:" " , phone:" ", work:" ", password:" ",cpassword:" "
    })

    let name,value;
    const handleInputs =(e) => {
        console.log(e);
        name=e.target.name;
        value=e.target.value;

        setUser({...user,[name]: value});
    }

    const PostData = async (e ) => {
        e.preventDefault();

        const {name,email,phone,work,password,cpassword } = user;

        const res = await fetch ("/register" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,email,phone,work,password,cpassword
            })
        });

        const data=await res.json();

        if(data.status == 422 || !data){
            window.alert("Invalid registration");
            console.log("Invalid registration");
        }
        else{
            window.alert(" registration  success");
            console.log(" registration success");

            
        }
    }

    return (
       <>
       <section className="signup">
       <div className="container mt-5">
       <div className="signup-content">
       <div className="signup-form">
       <h2 className="form-title">Sign-up</h2>
       <form method="POST" className="register-form" id="register-form">
       <div className="form-group">
       <label htmlFor="name">
       <i class="zmdi zmdi-account material-icons-name"></i></label>
       <input type="text" name="name" id="name"  
       value={user.name}
       onChange={handleInputs}
       autoComplete="off" placeholder="yourName"/>

       <div className="form-group">
       <label htmlFor="name">
       <i class="zmdi zmdi-email material-icons-name"></i></label>
       <input type="text" name="email" id="email"  
       value={user.email}
       onChange={handleInputs}
       autoComplete="off" placeholder="youremail"/>
       </div>


       <div className="form-group">
       <label htmlFor="phone">
       <i class="zmdi zmdi-phone-in-talk  material-icons-name"></i></label>
       <input type="number" name="phone" id="phone"  
       value={user.phone}
       onChange={handleInputs}
       autoComplete="off" placeholder="yourPhoneNumber"/>
       </div>

       

       <div className="form-group">
       <label htmlFor="work">
       <i class="zmdi zmdi-slideshow material-icons-name"></i></label>
       <input type="text" name="work" id="work" 
       value={user.work}
       onChange={handleInputs}
       autoComplete="off" placeholder="profession"/>
       </div>

       <div className="form-group">
       <label htmlFor="password">
       <i class="zmdi zmdi-lock material-icons-name"></i></label>
       <input type="password" name="password" id="password"  
       value={user.password}
       onChange={handleInputs}
       autoComplete="off" placeholder="yourpassword"/>
       </div>

       <div className="form-group">
       <label htmlFor="cpassword">
       <i class="zmdi zmdi-lock material-icons-name"></i></label>
       <input type="password" name="cpassword" id="cpassword"  
       value={user.cpassword}
       onChange={handleInputs}
       autoComplete="off" placeholder="yourcpassword"/>
       </div>

       <div className="form-group form-button">
       <input type="submit" name="signup" id="signup" className="form-submit" value="register" onClick={PostData}></input></div>

       </div>
       </form>

       <NavLink to="/login" className="signup-image-link">Already registered?</NavLink>
       </div>
       </div>
       </div></section>
       </>
    )
}

export default Signup
