import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useNavigate } from 'react-router-dom';
import { Modal,Button } from 'react-bootstrap';
import "../App.css"

const useKey = (key, cb) => {
    const callBackRef = useRef(cb);

    useEffect(() => {
        callBackRef.current = cb
    });

    useEffect(() => {
        function handle(event) {
            if (event.code === key) {
                callBackRef.current(event)
            }
        }
        document.addEventListener("keypress", handle);
        return () => document.removeEventListener("keypress", handle)
    }, [key])
}
const SignUp = () => {
    const navigate = useNavigate()
    const handleEnter = () => {
        signUp()
    }
    useKey("Enter", handleEnter)
    const validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let data = localStorage.getItem("usersData")
    const [userDetails, setUserDetails] = useState({ name: "", email: "", password: "", uid: "", phoneNo: "" })
    const [showInpPass, setShowInpPass] = useState(false)
    const [show, setShow] = useState(false);
    const [showSignUp , setShowSignUp] = useState(true)
    const handleClose = () => 
    {
        setShow(false)
        setShowSignUp(true)
    };
    const closeSignUp = () => {
        
       navigate("/login")
    }
    const passValid = () => {
        !showInpPass ? setShowInpPass(true) : setShowInpPass(false)
    }
    const signUp = () => {
        if (!data && String(userDetails.email).toLowerCase().match(validateEmail) && userDetails.password.length >= 8 && userDetails.name.length > 0 && userDetails.phoneNo.length > 0 > 0) {
            localStorage.setItem("usersData", JSON.stringify([{ ...userDetails, uid: Math.random() * 10000 }]))
            setShow(true)
            setShowSignUp(false)
        } else if (userDetails.password.length === 0 || userDetails.name === 0 || userDetails.phoneNo === 0 || userDetails.email === 0) {
            alert("Please fill all fields")
        }
        else if ((!data && !String(userDetails.email).toLowerCase().match(validateEmail)) || !String(userDetails.email).toLowerCase().match(validateEmail)) {
            alert("Please write correct email")
        } else if (userDetails.password.length < 8) {
            
            alert("Password should be of 8 characters")
        }
        else if (String(userDetails.email).toLowerCase().match(validateEmail) && data) {
            let usersData = JSON.parse(data);
            let flag = false;
            for (var i = 0; i < usersData.length; i++) {
                if (userDetails.email === usersData[i].email) {
                    alert("Account already exist");
                    flag = true;
                }
            } if (flag === false) {
                usersData.push({ ...userDetails, uid: Math.random() * 10000 })
                localStorage.setItem("usersData", JSON.stringify(usersData))
                setShow(true)
                setShowSignUp(false)
            }

        }
    }
    return (
        show ? <Modal show={show} onHide={handleClose} backdrop="static"  keyboard={false}>
        <Modal.Header closeButton className='whitesmokebg'>
            <Modal.Title className='modaltitle'>Congratulations!</Modal.Title>
        </Modal.Header >
        <Modal.Body className='whitesmokebg modalbody'> <p>You are now registered! </p></Modal.Body>
        <Modal.Footer className='whitesmokebg'>
            <Button variant="secondary" onClick={handleClose} className = "closebtn">
                Close
            </Button>

        </Modal.Footer>
    </Modal> :
    <Modal show={showSignUp} onHide={closeSignUp} backdrop="static"  keyboard={false}>
   
    <Modal.Body className = "whitesmokebg"><section className='signupdiv'>
            <h1 className="mainh1">Sign Up</h1>
            <form>
                <input type="text" placeholder='Enter your name' onChange={(val) => setUserDetails({ ...userDetails, name: val.target.value })} />
                <input type="text" placeholder='Enter your Email' onChange={(val) => setUserDetails({ ...userDetails, email: val.target.value })} />
                <div className="passdiv">
                    <input type={!showInpPass ? "password" : "text"} placeholder='Enter your password' onChange={(val) => setUserDetails({ ...userDetails, password: val.target.value })} />
                    <button className='eyebtn' onClick={passValid} type="button" style={{ backgroundColor: "transparent !important" }}>

                        {!showInpPass ? <FontAwesomeIcon icon={faEye} style={{ background: "whitesmoke" }} />
                            :
                            <FontAwesomeIcon icon={faEyeSlash} style={{ background: "whitesmoke" }} />}
                    </button>
                </div>
                <input type="text" placeholder="Enter your phone no" onChange={(val) => setUserDetails({ ...userDetails, phoneNo: val.target.value })} />
            </form>
            <button onClick={signUp} className="btn btn-info mybtn">Sign Up</button>
            <p >Already have an account Click on Log In</p>
            <button type="button" className="btn btn-primary mybtn signupbtn" data-toggle="modal" data-target="#exampleModal"><NavLink to="/login" style={{ background: "transparent", color: "whitesmoke", textDecoration: "none" }}>Log In</NavLink></button>
        </section></Modal.Body>
    <Modal.Footer style={{border : "1px solid whitesmoke"}}>
        <Button variant="secondary" onClick={closeSignUp} className = "closebtn">
            Close
        </Button>

    </Modal.Footer>
</Modal>
      
    );
};


export default SignUp;