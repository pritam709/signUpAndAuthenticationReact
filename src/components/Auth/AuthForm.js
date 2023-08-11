import React,{ useState, useRef ,useContext} from "react";
import {useHistory} from "react-router-dom"
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/AuthContext";

const AuthForm = () => {
  const history=useHistory();
 const authCtx=useContext(AuthContext);
  const mailInputRef = useRef();
  const passwordRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const eneterdEmail = mailInputRef.current.value;
    const eneterdPassword = passwordRef.current.value;
    setIsLoading(true);
    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQMsUvpW0VDlrT8udsQOqk9uN4im3NOJA";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQMsUvpW0VDlrT8udsQOqk9uN4im3NOJA";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: eneterdEmail,
        password: eneterdPassword,
        returnSecureToken: true,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            // console.log(data.error.message);
            // alert(data.error.message);
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        // console.log(data.idToken);
        const token= data.idToken;
        authCtx.login(token);
        history.replace('/')

      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={mailInputRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passwordRef} type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Loading....</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
