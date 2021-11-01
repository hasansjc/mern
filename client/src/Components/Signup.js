import {useState,React} from 'react'
import {useHistory } from 'react-router-dom';
function Signup() {
    const history = useHistory();
    const [userData,setUserData]= useState({name:"",email:"",phone:"",work:"",password:"",cpassword:""})
    var name, value;
    const handleInputs = (e) => {
         name=e.target.name;
         value=e.target.value;
         setUserData({...userData, [name]:value})
    }
    const postData = async(e) => {
        e.preventDefault();
        const {name, email, phone, work, password, cpassword} = userData;
        const response = await fetch('/register',{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });
        console.log(response);
        
        if(response.status!==422){
            const register = await response.json();
            console.log(register);
            console.log("registration successful");
            window.alert("registration success")
            history.push('/') 
        }else{
            window.alert("registration failed")
            console.log("registration failed");
        }
    }
    return (
        <>
        <form method="POST" className="reg_form" >
            <label htmlFor="name">Name:</label><br/>
            <i class="zmdi zmdi-account"></i>
            <input type="text" id="name" name="name" 
            onChange={handleInputs} value={userData.name}/><br/>

            <label htmlFor="lname">Email:</label><br/>
            <i class="zmdi zmdi-email"></i>
            <input type="text" id="email" name="email" 
            onChange={handleInputs} value={userData.email}/><br/>

            <label htmlFor="lname">Phone No.:</label><br/>
            <i class="zmdi zmdi-phone"></i>
            <input type="text" id="phone" name="phone" 
            onChange={handleInputs} value={userData.phone}/><br/>

            <label htmlFor="lname">Work:</label><br/>
            <i class="zmdi zmdi-account-circle"></i>
            <input type="text" id="work" name="work" 
            onChange={handleInputs} value={userData.work}/><br/>

            <label htmlFor="lname">Password:</label><br/>
            <i class="zmdi zmdi-key"></i>
            <input type="password" id="password" name="password" 
            onChange={handleInputs} value={userData.password} /><br/>

            <label htmlFor="lname"> Comfirm Password:</label><br/>
            <i class="zmdi zmdi-key"></i>
            <input type="password" id="cpassword" name="cpassword" 
            onChange={handleInputs} value={userData.cpassword }/><br/>

            <br/>
            <input type="submit" value="Submit" className="submit" onClick={postData}/>
        </form>
        </>
    )
}
export default Signup
