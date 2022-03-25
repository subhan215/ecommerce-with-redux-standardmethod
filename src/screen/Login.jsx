import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import "../App.css"
import { signIn } from '../store/actions/authActions/loginAction';
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
const Login = (props) => {
    const handleEnter = () => {
        signIn()
    }
    useKey("Enter", handleEnter)
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({ email: "", password: "", uid: "" })
    const [showInpPass, setShowInpPass] = useState(false)
    const passValid = () => {
        !showInpPass ? setShowInpPass(true) : setShowInpPass(false)
    }
    const signInFunc = () => {
        props.dispatch(signIn(userDetails.email , userDetails.password , navigate ))
    }



    return (
        <section>
            <h1 className="mainh1">Log In</h1>
            <form>
                <input type="text" placeholder='Enter your email' onChange={(val) => setUserDetails({ ...userDetails, email: val.target.value })} />
                <div className="passdiv">
                    <input type={!showInpPass ? "password" : "text"} placeholder='Enter your password' onChange={(val) => setUserDetails({ ...userDetails, password: val.target.value })} />
                    <button className='eyebtn' onClick={passValid} type="button" style={{ backgroundColor: "transparent !important" }}>

                        {!showInpPass ? <FontAwesomeIcon icon={faEye} style={{ background: "whitesmoke" }} />
                            :
                            <FontAwesomeIcon icon={faEyeSlash} style={{ background: "whitesmoke" }} />}
                    </button>
                </div>
            </form>
            <button onClick={signInFunc} className="btn btn-info mybtn">Sign In</button>
            <p> Note: If you dont't have any account then click on below
                sign up button </p>
            <button type="button" className="btn btn-primary mybtn signupbtn" data-toggle="modal" data-target="#exampleModal">
                <NavLink to="/signup" style={{ background: "transparent", color: "whitesmoke", textDecoration: "none" }}>Sign Up</NavLink>
            </button>
        </section>
    );
};

const newLogIn = connect()(Login)

export default newLogIn;