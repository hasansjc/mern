import React,{useEffect,useState} from 'react'
import {useHistory } from 'react-router-dom';
function About() {
    const history = useHistory();
    const [userData,setuserData]=useState({});
    const callap = async()=>{
        try{
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                   Accept:  "application/json",
                    "Content-Type": "application/json"
                },
                credentials:"include"
            });
            const data = await res.json();
            console.log(data);
           setuserData(data);
            if(res.status!==200){
                const error = new Error(res.error);
                throw error;
            }   
        }catch(err){
            console.log(err);
            history.push('/login') 
        }
    }
    useEffect(()=>{
            callap();
    },[])

    return (
        <>
            <h1> This is the about page</h1>
            <form method="GET">
                <h1> Name  :   {userData.name}</h1>
                <h1> Email  :   {userData.email}</h1>
                <h1> Profession  :   {userData.work}</h1>

            </form>
        </>
    )
}

export default About
