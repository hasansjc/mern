import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import logo from '../images/logo.jpg'
import { UserContext } from '../App';
const Navbar = () => {
  const { state, dispatch } = useContext(UserContext)

  const RenderMenu = () => {
 
    if (!state) {
      return (
        <nav className="navbar navbar-expand-lg  navbar-primary bg-dark">
          <div className="container">
            <img src={logo} style={{ height: '50px', margin: "10px" }} alt="logo" />
            <a className="navbar-brand" href="#">APEX CREATIVE DESIGN</a>
            <img src={logo} style={{ height: '50px' }} alt="logo" />

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                <li className="nav-item">
                  <NavLink className="nav-link active linkss " style={{color:'green'}} aria-current="page" to="/">Home</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link linkss " to="contact">Contact us</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link linkss  " to="about">About us</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link linkss " to="signin">Signin</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link linkss " to="signup">Signup</NavLink>
                </li>

              </ul>

            </div>
          </div>
        </nav>
      )
    }
    else {
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <img src={logo} style={{ height: '50px', margin: "10px" }} alt="logo" />
            <a className="navbar-brand" href="#">APEX CREATIVE DESIGN</a>
            <img src={logo} style={{ height: '50px' }} alt="logo" />

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="contact">Contact us</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link " to="about">About us</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="signup">Signup</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="Logout">Logout</NavLink>
                </li>
              </ul>

            </div>
          </div>
        </nav>
      )
    }

  }
  return (
    <>
      <RenderMenu />
    </>
  )
}

export default Navbar;
