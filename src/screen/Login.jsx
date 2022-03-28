import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import "../App.css"
import { signIn } from '../store/actions/authActions/loginAction';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import CircleLoader from './animationLoading/CircleLoader';
import "../styles/loading.css"
function Grid({ children }) {
    const loadingStyle = {
        background: "transparent"

    }
    return (
        <div className="grid" style={loadingStyle}>
            <LoadingBox>{children}</LoadingBox>
        </div>
    )
}

function LoadingBox({ children }) {
    const loadingStyle = {
        background: "transparent"
    }
    return React.Children.map(children, child => {
        return <div className="loading-box" style={loadingStyle}>{child}</div>
    })
}

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
const Login = () => {

    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.loadingReducer)
    const handleEnter = () => {
        signInFunc()
    }
    useKey("Enter", handleEnter)
    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [userDetails, setUserDetails] = useState({ email: "", password: "", uid: "" })
    const [showInpPass, setShowInpPass] = useState(false)
    const passValid = () => {
        !showInpPass ? setShowInpPass(true) : setShowInpPass(false)
    }
    const signInFunc = () => {
        dispatch(signIn(userDetails.email, userDetails.password, navigate, handleShow, handleClose))
    }

    return <>

        <Modal show={show} onHide={handleClose} animation={false} style={{ background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))" }} >
            <div  >
                <Grid >
                    <CircleLoader />
                </Grid>
            </div>
        </Modal>

        < section >
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
        </section >

    </>
}
export default Login