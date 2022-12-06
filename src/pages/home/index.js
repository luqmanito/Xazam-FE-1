import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import styles from "../../styles/Home.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";

import spiderman from "src/assets/images/spiderman-home.png";
import lion from "src/assets/images/lion-home.png";
import movie from "../../assets/images/movie-home.png";
import Search from "components/Search";
import movieAction from "src/redux/actions/movie";

const Home = () => {
  const router = useRouter();
  const [clickText, setClickText] = useState(false);
  const [upcomingShow, setUpcomingShow] = useState(true);
  const [show, setShow] = useState(true);
  const [upComing, setUpComing] = useState(5);
  const [nowShowing, setNowShowing] = useState(5);
  const dispatch = useDispatch();
  const moviesNowShowing = useSelector(
    (state) => state.movie.showTimes?.nowShowing
  );
  const moviesUpComing = useSelector(
    (state) => state.movie.showTimes?.upComing
  );

  const handleClickText = () => {
    setClickText(!clickText);
  };

  useEffect(() => {
    dispatch(movieAction.showTimesThunk());
  }, [dispatch]);

  return (
    <>
      <Navbar
        profileAndBtn={
          <>
            <button
              className={styles["sign-up-btn"]}
              onClick={() => router.push("/auth/register")}
            >
              Sign-up
            </button>
          </>
        }
        propsOnclick={handleClickText}
      />
      <Search showInputText={clickText} />
      <main className={styles["main"]}>
        <section
          className={
            upcomingShow
              ? show
                ? `${styles["section"]} ${styles["section_one"]}`
                : `${styles.none}`
              : `${styles.none}`
          }
        >
          <span className={styles["title"]}>
            <p>Nearest Cinema, Newest Movie.</p>
            <h1>Find out now!</h1>
          </span>
          <span className={styles["title-image"]}>
            <ul className={styles["list-images-section"]}>
              <li className={styles["list-image1"]}>
                <Image
                  src={spiderman}
                  alt={`spiderman`}
                  className={styles["content-list-image1"]}
                  objectFit="cover"
                />
              </li>
              <li className={styles["list-image2"]}>
                <Image
                  src={lion}
                  alt={`lion`}
                  className={styles["content-list-image2"]}
                  objectFit="cover"
                />
              </li>
              <li className={styles["list-image3"]}>
                <Image
                  src={movie}
                  alt={`movie`}
                  className={styles["content-list-image3"]}
                  objectFit="cover"
                />
              </li>
            </ul>
          </span>
        </section>
        <section
          className={
            upcomingShow
              ? `${styles["section"]} ${styles["section_two"]}`
              : `${styles.none}`
          }
        >
          <span className={`${styles["section__header"]}`}>
            <h1>Now Showing</h1>
            <p
              onClick={() => {
                show ? setShow(false) : setShow(true);
                setNowShowing(nowShowing === 5 ? 20 : 5);
              }}
            >
              {show ? `view all` : `view less`}
            </p>
          </span>
          <ul className={`${styles["list-movies"]}`}>
            {moviesNowShowing &&
              moviesNowShowing.map((movie, idx) => {
                console.log(movie);
                if (idx < nowShowing) {
                  return (
                    <li
                      className={styles["movie-spesific-to-image"]}
                      key={idx}
                      onClick={() => router.push(`/movie/${movie.id}`)}
                    >
                      <Image
                        src={movie.image}
                        alt={`movie`}
                        className={styles["movie-images"]}
                        width={500}
                        height={500}
                      />
                    </li>
                  );
                }
              })}
          </ul>
        </section>
        <section
          className={
            show
              ? `${styles["section"]} ${styles["section_tree"]}`
              : `${styles.none}`
          }
        >
          <span className={`${styles["section__header"]}`}>
            <h1>Upcoming Showing</h1>
            <p
              onClick={() => {
                upcomingShow ? setUpcomingShow(false) : setUpcomingShow(true);
                setUpComing(upComing === 5 ? 20 : 5);
              }}
            >
              {upcomingShow ? `view all` : `view less`}
            </p>
          </span>
          <ul className={`${styles["section__header__month"]}`}>
            <li>January</li>
            <li>February</li>
            <li>March</li>
            <li>April</li>
            <li>May</li>
            <li>June</li>
            <li>Juli</li>
            <li>August</li>
            <li>Sepetember</li>
            <li>October</li>
            <li>November</li>
            <li>December</li>
          </ul>
          <span className={`${styles["section__header__movie"]}`}>
            <ul className={`${styles["list-movies"]}`}>
              {moviesUpComing?.map((movie, idx) => {
                if (idx < upComing) {
                  return (
                    <li className={`${styles["movie"]}`} key={idx}>
                      <Image
                        src={movie.image ? movie.image : sample}
                        alt={`movie`}
                        className={styles["movie-images"]}
                        width={500}
                        height={500}
                      />
                      <h3 className={styles[`title`]}>{movie.name}</h3>
                      <p className={styles["description"]}>{movie.category}</p>
                      <button
                        className={styles["btn-movie"]}
                        onClick={() => router.push(`/movie/${movie.id}`)}
                      >{`Details`}</button>
                    </li>
                  );
                }
              })}
            </ul>
          </span>
        </section>
        <section className={`${styles["section"]} ${styles["section_fourth"]}`}>
          <span className={styles["section_fourth_border"]}>
            <p>Be the vanguard of the</p>
            <h1>Moviegoers</h1>
            <span className={styles["btn-input-section"]}>
              <input type="text" placeholder="Type your email" />
              <button className={styles["btn-join"]}>Join now</button>
            </span>
            <description className={styles["decs"]}>
              By joining you as a Tickitz member, we will always send you the
              latest updates via email.
            </description>
          </span>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
