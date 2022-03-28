import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import { savePost } from '../store/actions/postActions/createPostAction';
import { deletePost } from '../store/actions/postActions/delPostAction';
import { updPost } from '../store/actions/postActions/updatePost';
import ActionType from '../store/constant/constant';
import "../styles/profile.css"
const Profile = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        let posts = JSON.parse(localStorage.getItem("posts"));
        dispatch({ type: ActionType.Posts, posts: posts });
        let userData = JSON.parse(localStorage.getItem("logInUser"))
        console.log(userData)
        dispatch({ type: ActionType.checkData, email: userData.email, password: userData.password, name: userData.name, uid: userData.uid, phoneNo: userData.phoneNo })
    }, [])
    const navigate = useNavigate()
    const signOut = () => {
        localStorage.removeItem("logInUser");
        navigate("/logIn")
    }
    const updProf = () => {
        navigate("/updateProfile")
    }


    const [postData, setPostData] = useState({
        text: "",
        img: "",
        price: "",
        details: ""
    })
    const [updPostData, setUpdPostData] = useState({
        text: "",
        img: "",
        price: "",
        details: "",
        postUid: "",
        postUidandi: ""
    })


    const [show, setShow] = useState(false);
    const [showUpdModal, setShowUpdModal] = useState(false);

    const handleClose = () => setShow(false);
    const handleUpdClose = () => {
        setShowUpdModal(false)
    }

    const loadImgElement = useRef()
    const loadUpdImgElement = useRef()

    const loadImg = (e) => {
        setPostData({ ...postData, img: e.target.value })
        loadImgElement.current.src = e.target.value
    }
    const loadUpdImg = (e) => {
        setUpdPostData({ ...updPostData, img: e.target.value })
        loadUpdImgElement.current.src = e.target.value
    }



    const createPost = () => {
        setShow(true)
    }
    const delPostFunc = (uidandi) => {
        dispatch(deletePost(uidandi))
    }
    const editPost = (uid) => {
        setShowUpdModal(true);
        let oldPostData = JSON.parse(localStorage.getItem("posts"));
        let flag = false
        for (var i = 0; i < oldPostData.length; i++) {
            if (oldPostData[i].postUid + i === uid) {
                flag = true
                setUpdPostData({
                    ...updPostData, text: oldPostData[i].text,
                    details: oldPostData[i].details,
                    price: oldPostData[i].price,
                    img: oldPostData[i].img,
                    postUid: oldPostData[i].postUid,
                    postUidandi: oldPostData[i].postUid + i
                })


            }
        }
    }
    const updPostFunc = (uidandi) => {
        dispatch(updPost(uidandi, updPostData))
    }
    const savePostFunc = () => {
        dispatch(savePost(postData, checkUid, logInUid))
    }

    const { posts } = useSelector((state) => state.PostsReducer)
    const { logInEmail,logInName,logInUid,logInPhoneNo } = useSelector((state) => state.logInReducer.login)
    const {checkEmail,checkName,checkUid,checkPhoneNo} = useSelector((state) => state.updProfReducer.checkData)



    return <div>
        <Modal
            show={showUpdModal}
            onHide={handleUpdClose}
            backdrop="static"
            keyboard={false}

        >
            <Modal.Header closeButton >
                <Modal.Title >Update Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='inputdiv'>
                    <input type="text" placeholder="Update Object Name" onChange={(e) => setUpdPostData({ ...updPostData, text: e.target.value })} value={updPostData.text} />
                    <input type="text" placeholder='Update Object Price' onChange={(e) => setUpdPostData({ ...updPostData, price: e.target.value })} value={updPostData.price} />
                    <input type="text" placeholder='Update Object Details' onChange={(e) => setUpdPostData({ ...updPostData, details: e.target.value })} value={updPostData.details} />
                    <input type="text" placeholder='Update Object image url' onChange={(e) => loadUpdImg(e)} value={updPostData.img} />
                    <button onClick={() => updPostFunc(updPostData.postUidandi)} className="updPostBtn">Update Post</button>
                </div>


                <div className='crtPostImg'>
                    <img ref={loadUpdImgElement} height="200px" width="300px" />
                </div>

            </Modal.Body>
            <Modal.Footer style={{ border: "1px solid whitesmoke" }}>
                <Button variant="secondary" onClick={handleUpdClose} className="closeBtn">
                    Close
                </Button>

            </Modal.Footer>
        </Modal>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton >
                <Modal.Title>Create Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='inputdiv'>
                    <input type="text" placeholder="Object Name" onChange={(e) => setPostData({ ...postData, text: e.target.value })} />
                    <input type="text" placeholder='Object Price' onChange={(e) => setPostData({ ...postData, price: e.target.value })} />
                    <input type="text" placeholder='Object Details' onChange={(e) => setPostData({ ...postData, details: e.target.value })} />
                    <input type="text" placeholder='Object image url' onChange={(e) => loadImg(e)} />
                    <button onClick={savePostFunc} className="postBtn">Post</button>
                </div>

                <div className='crtPostImg'>
                    <img ref={loadImgElement} height="200px" width="300px" />
                </div>

            </Modal.Body>
            <Modal.Footer style={{ border: "1px solid whitesmoke" }}>
                <Button variant="secondary" onClick={handleClose} className="closeBtn">
                    Close
                </Button>

            </Modal.Footer>
        </Modal>
        <div className='ProfileComp'>
            <div className='profCompdiv1'>
                <button onClick={updProf} className="updProfBtn">Update Profile</button>
                <div className='userDetails'>
                    <p className='namep'>Name : {!logInName ? checkName : logInName}</p>
                    <p className='emailp'>Email : {!logInEmail ? checkEmail : logInEmail}</p>
                    <p className='phoneNop'>Phone No : {!logInPhoneNo ? checkPhoneNo : logInPhoneNo}</p>
                </div>
                <button onClick={signOut} className="signOutBtn">Sign Out</button>
            </div>

            <button onClick={createPost} className="crtPostBtn">Create Post</button>


        </div>

        <div className="postsDiv ">
            {posts ? posts.map((val, ind) => {
                return <div className='postDiv col-lg-4 col-md-6 col-sm-12' style={val.postUid === props.checkUid || val.Uid === props.logInUid ? { display: "block" } : { display: "none" }}>
                    <div className='postDivp1'>

                        <h1 className={ind}>{
                            val.postUid === checkUid || val.Uid === logInUid ? val.text : null}
                        </h1>
                        <div className='iconsDiv'>
                            <FontAwesomeIcon icon={faEdit} onClick={() => editPost(val.postUid + ind)} style={{ cursor: "pointer" }} className="postIcon"></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faTimes} onClick={() => delPostFunc(val.postUid + ind)} style={{ cursor: "pointer" }} className="postIcon"> </FontAwesomeIcon>

                        </div>
                    </div>


                    <h3 >{
                        val.postUid === checkUid || val.Uid === logInUid ? <span>Price : {val.price}</span> : null}</h3>

                    <p >{
                        val.postUid === checkUid || val.Uid === logInUid ? <span>details : {val.details}</span> : null}</p>
                    <img src={val.postUid === checkUid || val.Uid === logInUid ? val.img : null} alt="" width="200px" height="150px" />
                </div>



            }) : null}
        </div>
    </div>

}

export default Profile;