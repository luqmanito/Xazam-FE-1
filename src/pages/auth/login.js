import React from "react";
//import Axios from "axios"
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import styles from "../../styles/Login.module.css";
import logo from "../../assets/Images/tickitz.png";
import googleIcon from "../../assets/Icons/google.png";
import facebook from "../../assets/Icons/facebook.png";
import { useDispatch } from "react-redux";
import authAction from "../../redux/actions/auth";
import Button from "../../components/Button";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [body, setbody] = useState({});
  const [showPass, setShowPass] = useState(false);

  const handleHidePwd = () => {
    setShowPass(!showPass);
  };

  const changeHandler = (e) =>
    setbody({
      ...body,
      [e.target.name]: e.target.value,
    });
  // const togglePass = () => setShowPass(!showPass);
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(authAction.loginThunk(body));
    
  };



  return (
    <>
      <main className={styles["main"]}>
        <section className={styles["left-side"]}>
          <span className={styles["logo"]}>
            <Image src={logo} alt={`tickitz`} className={styles["img-logo"]} />
          </span>
          <h2 className={styles["title"]}>wait, watch, wow!</h2>
        </section>
        <section className={styles["right-side"]}>
          <h3>Sign In</h3>
          <p>
            Sign in with your data that you entered during your registration
          </p>
          <form className={styles["form"]} onSubmit={loginHandler}>
            <span className={styles["input"]}>
              <label className={styles["label-email"]}>Email</label>
              <input
                type="text"
                name="email"
                className={styles["email"]}
                placeholder="Write your email"
                onChange={changeHandler}
                required
              />
            </span>
            <span className={styles["input"]}>
              <label className={styles["label-password"]}>Password</label>
              <input
                // type={toggle ? "text" : "password"}
                type={showPass ? "text" : "password"}
                name="password"
                className={styles["password"]}
                placeholder="Write your password"
                onChange={changeHandler}
                required
              />
              <span
                className={styles["view-icon-section"]}
                onClick={handleHidePwd}
              >
                {showPass ? (
                  <ViewIcon className={styles["view-icon"]} />
                ) : (
                  <ViewOffIcon className={styles["view-icon"]} />
                )}
              </span>
            </span>
            <Button initBtnSubmit={`Sign In`} />
          </form>
          <p className={styles["direct-to-reset"]}>
            Forgot your password ?{" "}
            <span onClick={() => router.push("/auth/forgot")}>Reset now</span>
          </p>
          <p className={styles["or"]}>Or</p>
          <span className={styles["social-btn-section"]}>
            <span className={styles["social-btn"]}>
              <Image
                src={googleIcon}
                alt={``}
                className={styles["social-btn-icon"]}
              />
              <p className={styles["social-btn-title"]}>Google</p>
            </span>
            <span className={styles["social-btn"]}>
              <Image
                src={facebook}
                alt={``}
                className={styles["social-btn-icon"]}
              />
              <p className={styles["social-btn-title"]}>Google</p>
            </span>
          </span>
        </section>
      </main>
    </>
  );
};

export default Login;
