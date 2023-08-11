import React, { useRef ,useContext} from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/AuthContext';
import {useHistory} from "react-router"

const ProfileForm = () => {
  const history=useHistory();
  const authCtx=useContext(AuthContext);
  const passwordRef=useRef();
  const formSubmitHandler=(event)=>{
    event.preventDefault();
    const newPassword=passwordRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAQMsUvpW0VDlrT8udsQOqk9uN4im3NOJA',{
    method:"POST",
    body:JSON.stringify({
      idToken:authCtx.token,
      password:newPassword,
      returnSecureToken:false

    })
  }).then(res=>{
      history.replace('/')
  })
  }

  
  return (
    <form onSubmit={formSubmitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={passwordRef} minLength={7} type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button >Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
