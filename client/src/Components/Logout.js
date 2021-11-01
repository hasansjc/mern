import React,{useEffect,useContext} from 'react'
import {useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const Logout = () => {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory();
    useEffect(()=>{
        fetch('/logout', {
            method: "GET",
            headers: {
               Accept:  "application/json",
                "Content-Type": "application/json"
            },
            credentials:"include"
        }).then((res)=>{
            dispatch({type:'USERss', payload:false})
            window.alert("user logout successfullly")
            history.push('/signin',{ replace:false });
            if(res.status!==200){
                const error =new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        })

},[])
    return (
        <div>
            <h1> this is the logout page</h1>
        </div>
    )
}
export default Logout;
