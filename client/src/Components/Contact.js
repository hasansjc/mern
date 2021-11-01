import React,{useEffect,useState} from 'react'

function Contact() {

    const [userData,setuserData]=useState({});
    const getContact = async()=>{
        try{
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
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
        }
    }
    useEffect(()=>{
            getContact();
    },[])

    const handleInputs = (e) =>{
        const name= e.target.name;
        const value= e.target.value;
        setuserData({...userData,[name]:value})
    }

    const sendContact = async(e) =>{
            e.preventDefault();
            const res = await fetch('/contact', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message:userData.message
                })
            })
            console.log(res.status);
            const contactdata = await res.json();
            if(!contactdata){
                console.log("message not sent");
            }else{
                alert("message sent successfully");
                setuserData({...userData,message:""})
            }
    }
    
    return (
        <>
            <h1> Contact us</h1>
            <div className="contact_info">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 mx-auto d-flex justify-content-between">
                            <div className="contactinfo_item d-flex justify-content-start align-items-center">
                                <div className="contactinfo_content">
                                    <div className="contactinfo-title">Phone</div>
                                    <div className="contactinfo_text">+91 9876543210</div>
                                </div>
                            </div>

                            <div className="contactinfo_item d-flex justify-content-start align-items-center">
                                <div className="contactinfo_content">
                                    <div className="contactinfo-title">Email</div>
                                    <div className="contactinfo_text">hasansjc@gmail.com</div>
                                </div>
                            </div>

                            <div className="contactinfo_item d-flex justify-content-start align-items-center">
                                <div className="contactinfo_content">
                                    <div className="contactinfo-title">Address</div>
                                    <div className="contactinfo_text">10/11 Garhi Kalan</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div>
                    <form method="POST" className="reg_form" >
                    <div > <label htmlFor="name">Name:</label><br />
                        <i class="zmdi zmdi-account"></i>
                        <input type="text" onChange={handleInputs} value={userData.name} id="name" name="name" /><br />

                        <label htmlFor="lname">Email:</label><br />
                        <i class="zmdi zmdi-email"></i>
                        <input type="text" onChange={handleInputs} value={userData.email} id="email" name="email" /><br />

                        <label htmlFor="lname">Phone No.:</label><br />
                        <i class="zmdi zmdi-phone"></i>
                        <input type="text" onChange={handleInputs} value={userData.phone} id="phone" name="phone" /><br />

                        <label htmlFor="lname">Message:</label><br />
                        <i class="zmdi zmdi-email"></i>
                        <textarea  id="message" onChange={handleInputs} value={userData.message} name="message" rows="10" col="30"/><br />
                        
                        </div>
                    
                        <br />
                        <input type="submit" value="Submit" className="submit"
                        onClick={sendContact}/>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Contact;
