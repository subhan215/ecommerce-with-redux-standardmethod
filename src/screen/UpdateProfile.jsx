import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { updateName } from '../store/actions/profActions/updNameAction';
import { updateEmail } from '../store/actions/profActions/updEmailAction';
import { updatePhoneNo } from '../store/actions/profActions/updPhoneNoAction';
import { updatePass } from '../store/actions/profActions/updPassAction';
import ActionType from '../store/constant/constant';

const UpdateProfile = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem("logInUser"))
        console.log(userData)
        dispatch({ type: ActionType.checkData, email: userData.email, password: userData.password, name: userData.name, uid: userData.uid, phoneNo: userData.phoneNo })
    }, [])
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        phoneNo: "",
        updPass: ""

    })
    const [showName, setShowName] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showPhoneNo, setShowPhoneNo] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showInpPass, setShowInpPass] = useState(false)
    const [showInpUpdPass, setShowInpUpdPass] = useState(false)

    const passValid = () => {
        !showInpPass ? setShowInpPass(true) : setShowInpPass(false)
    }
    const passUpdValid = () => {
        !showInpUpdPass ? setShowInpUpdPass(true) : setShowInpUpdPass(false)

    }
    const handleNameClose = () => {
        setShowName(false)
    }
    const handlePassClose = () => {
        setShowPass(false)
    }
    const handlePhoneNoClose = () => {
        setShowPhoneNo(false)
    }
    const handleEmailClose = () => {
        setShowEmail(false)
    }
    const handleNameOpen = () => {
        setUserData({ ...userData, name: checkName })
        setShowName(true)
    }
    const handlePassOpen = () => {

        setShowPass(true)
    }
    const handlePhoneNoOpen = () => {
        setUserData({ ...userData, phoneNo: checkPhoneNo })
        setShowPhoneNo(true)
    }
    const handleEmailOpen = () => {
        setUserData({ ...userData, email: checkEmail })

        setShowEmail(true)
    }
    const updNameFunc = () => {
     dispatch(updateName(checkData , userData.name , checkUid))
    } 
    const updEmailFunc = () => {
        dispatch(updateEmail(checkData , userData.email , checkUid))
    }
    
    const updPhoneNoFunc = () => {
        dispatch(updatePhoneNo (checkData , userData.phoneNo , checkUid))
    }
    const updPassFunc = () => {
        dispatch(updatePass(checkData , userData.password ,checkPassword , userData.updPass ,   checkUid))
    }
    const {checkEmail,checkName,checkUid,checkPhoneNo , checkPassword} = useSelector((state) => state.updProfReducer.checkData)
    const {checkData } = useSelector((state ) =>  state.updProfReducer) 
    return (
        <div>
            <Modal
                show={showName}
                onHide={handleNameClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Change Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" placeholder='Change Name' value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                    <button onClick={updNameFunc}>update</button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleNameClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showPass}
                onHide={handlePassClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type= {!showInpPass ? "password" : "text"} placeholder='Enter Current Password' value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                    <button className='eyebtn' onClick={passValid} type="button" style={{ backgroundColor: "transparent !important" }}>

{!showInpPass ? <FontAwesomeIcon icon={faEye} style={{ background: "whitesmoke" }} />
    :
    <FontAwesomeIcon icon={faEyeSlash} style={{ background: "whitesmoke" }} />}
</button>
                    <input type = {!showInpUpdPass ? "password" : "text"}  placeholder='Enter new Password' value={userData.updPass} onChange = {(e) => setUserData({...userData , updPass : e.target.value})}/>
                    <button className='eyebtn' onClick={passUpdValid} type="button" style={{ backgroundColor: "transparent !important" }}>

{!showInpUpdPass ? <FontAwesomeIcon icon={faEye} style={{ background: "whitesmoke" }} />
    :
    <FontAwesomeIcon icon={faEyeSlash} style={{ background: "whitesmoke" }} />}
</button>
                    <button onClick={updPassFunc}>update</button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handlePassClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showEmail}
                onHide={handleEmailClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Change Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" placeholder='Change Email' value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                    <button onClick={updEmailFunc}>update</button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEmailClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showPhoneNo}
                onHide={handlePhoneNoClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Change Phone No</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" placeholder='Change Phone No' value={userData.phoneNo} onChange={(e) => setUserData({ ...userData, phoneNo: e.target.value })} />
                    <button onClick={updPhoneNoFunc}>update</button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handlePhoneNoClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <h3> <button onClick={handleNameOpen}>Change Name</button></h3>
            <h3> <button onClick={handlePhoneNoOpen}>Change Phone No</button> </h3>
            <h3> <button onClick={handleEmailOpen}>Change Email</button>  </h3>
            <h3><button onClick={handlePassOpen}>Change Password</button></h3>
        </div>
    );
};

export default UpdateProfile;


