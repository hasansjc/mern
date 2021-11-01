import React from 'react'
import logo from '../images/logo.jpg'

const Home = () => {
    return (
        <div>
            <p>Welcome</p>
            <h1> We are the MERN Developer</h1>
            <img src={logo} style={{height:'500px'}} alt="logo" />
        </div>
    )
}

export default Home;
