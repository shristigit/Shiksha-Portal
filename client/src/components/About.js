import React,{useEffect,useState} from 'react'
import {useNavigate} from "react-router-dom";

const About = () => {
    const [userdata,setuserdata] =useState({});
    const Navigate= useNavigate();
    
    const callAboutPage = async () => {
        try{
            const res= await fetch('/about', {
                method: "GET" ,
                headers : {
                    Accept : "application/json" ,  //token
                    "Content-Type": "application/json"
                },
                credentials:"include"   //cookie
            });
            const data= await res.json();
            console.log(data);
            setuserdata(data);

            if(!res.status === 200){
                const error=new Error(res.error);
                throw error;
            }
        }

        catch (err){
                console.log(err);
                Navigate('/login');
        }
    }

useEffect(() => {
    callAboutPage();
}, [])

    return (
        
        <div>
        <form method="GET">
           <h4>we are about page</h4> 
           <p>  {userdata.name}  </p>
           <p>  {userdata.email}  </p>
           <p>  {userdata.phone}  </p>
           <p>  {userdata.work}  </p>
           
           <input type="button " value="edit"></input>
           </form>
        </div>
    )
}

export default About
