import React,{useState,useContext} from 'react'
import {useHistory } from 'react-router-dom';
import {UserContext} from '../App';

const Signin = () => {
    const {state,dispatch} = useContext(UserContext);
    const history = useHistory();

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })

    var name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUserData({ ...userData, [name]: value })
    }
    const postData = async (e) => {
        e.preventDefault();
        const { email, password } = userData;
        const res = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })
        const login = await res.json();
        
        if (res.status === 422 || !login) { 
            window.alert("login failed")
            console.log("login failed");
        } 
        else {
                dispatch({type:'USERss', payload:true})
                console.log("login successfull"); 
                window.alert("login successfull")
                history.push('/')
        }
    }

    return (
        <>
            <form className="log_form" method="POST">

                <label htmlFor="lname">Email:</label><br />
                <input type="text" id="email" name="email"
                    onChange={handleInputs} value={userData.email} /><br />

                <label htmlFor="lname">Password:</label><br />
                <input type="password" id="password" name="password"
                    onChange={handleInputs} value={userData.password} /><br />

                <br />
                <input type="submit" value="Submit" className="submit" onClick={postData} />


            </form>



        </>
    )
}

export default Signin
