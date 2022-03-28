import React, { useEffect, useRef } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import ActionType from '../store/constant/constant';
import "../styles/profile.css"

const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        let posts = JSON.parse(localStorage.getItem("posts"));
        dispatch({ type: ActionType.Posts, posts: posts })
        let userData = JSON.parse(localStorage.getItem("logInUser"))
    console.log(userData)
    dispatch({ type: ActionType.checkData, email: userData.email, password: userData.password, name: userData.name, uid: userData.uid, phoneNo: userData.phoneNo })
    }, [])
    
    const { posts } = useSelector((state) => state.PostsReducer)
    const { logInEmail,logInName,logInPhoneNo } = useSelector((state) => state.logInReducer.login)
    const {checkEmail,checkName,checkPhoneNo} = useSelector((state) => state.updProfReducer.checkData)
    return (
        <div>
            <div className='ProfileComp'>
                <div className='profCompdiv1'>

                    <div className='userDetails'>
                        <p className='namep'>Name : {!logInName ? checkName : logInName}</p>
                        <p className='emailp'>Email : {!logInEmail ? checkEmail : logInEmail}</p>
                        <p className='phoneNop'>Phone No : {!logInPhoneNo ? checkPhoneNo : logInPhoneNo}</p>
                    </div>

                </div>

            </div>
            <div className="postsDiv ">
                {posts.map((val, ind) => {
                    return <div className='postDiv col-lg-4 col-md-6 col-sm-12'>
                        <div className='postDivp1'>
                            <h1>{
                                val.text}</h1>
                        </div>
                        <h3><span>Price : {val.price}</span></h3>
                        <p> <span>Details : {val.details}</span>  </p>
                        <img src={val.img} alt=""  width="200px" height="150px" />
                    </div>
                })}
            </div>
        </div>
    );
};
export default Home;

