import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const [userName,setuserName] =useState('');
    const [show,setshow] =useState('');
    const Navigate= useNavigate();
    
    const callHomePage = async () => {
        try{
            const res= await fetch('/contact', {
                method: "GET" ,
                headers : {
                
                    "Content-Type": "application/json"
                },
                
            });
            const data= await res.json();
            console.log(data);
            setuserName(data);

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
    callHomePage();
}, [])


    return (
        <div>
            <h1>  {userName}</h1>
            <h4>{show ? 'WELCOME back ' : 'To The Mern Stack Page'} </h4>
        </div>
    )
}

export default Home
