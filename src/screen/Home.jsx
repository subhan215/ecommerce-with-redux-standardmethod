import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import ActionType from '../store/constant/constant';
import "../styles/profile.css"

const Home = (props) => {
    useEffect(() => {
        let posts = JSON.parse(localStorage.getItem("posts"));
        props.dispatch({ type: ActionType.Posts, posts: posts })
    }, [])
    let userData = JSON.parse(localStorage.getItem("logInUser"))
    console.log(userData)
    props.dispatch({ type: ActionType.checkData, email: userData.email, password: userData.password, name: userData.name, uid: userData.uid, phoneNo: userData.phoneNo })

    return (
        <div>
            <div className='ProfileComp'>
                <div className='profCompdiv1'>

                    <div className='userDetails'>
                        <p className='namep'>Name : {!props.loginName ? props.checkName : props.loginName}</p>
                        <p className='emailp'>Email : {!props.loginEmail ? props.checkEmail : props.loginEmail}</p>
                        <p className='phoneNop'>Phone No : {!props.logInPhoneNo ? props.checkPhoneNo : props.logInPhoneNo}</p>
                    </div>

                </div>

            </div>
            <div className="postsDiv ">
                {props.posts.map((val, ind) => {
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

const mapReduxStateToProps = (state) => {
    return {
        loginEmail: state.logInReducer.login.email,
        checkEmail: state.updProfReducer.checkData.email,
        loginName: state.logInReducer.login.name,
        checkName: state.updProfReducer.checkData.name,
        posts: state.PostsReducer.posts,
        checkUid: state.updProfReducer.checkData.uid,
        logInUid: state.logInReducer.login.uid,
        logInPhoneNo: state.logInReducer.login.phoneNo,
        checkPhoneNo: state.updProfReducer.checkData.phoneNo
    }
}
const newHome = connect(mapReduxStateToProps)(Home)

export default newHome;

