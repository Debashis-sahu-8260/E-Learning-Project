import "../Header/header.css";
import banner from "../../assets/generated.jpg";
import award from "../../assets/bestAward.png";
import { Link } from "react-router-dom";
import { ProdCard, SuggestionCard, TechCard } from "../ProdCard/ProdCard";
import { PopperCard } from "../ProdCard/popperprodcard";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";

import { Bottombar } from "../Bottom/Bottombar";

export const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    padding: "0",
  },
}));
export const Landigpage = () => {
  return (
    <>
      <Banner />
    </>
  );
};

const Banner = () => {
  // const [loading, setLoading] = useState(true);
  const loading = useRef(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/courses")
      .then(({ data }) => {
        // console.log(data);
        loading.current = false;
        setProducts([...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <section>
        <div className="midbanner">
          <div
            className="bannercard"
            style={{
              marginLeft: "3.5rem",
              marginTop: "4rem",
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow

            }}
          >
            {" "}
            <div>
              <h1>Dream big</h1>
              <p>
                Find a course to help you reach where you want to go. Starting
                at ₹455 through March 31.
              </p>
            </div>
          </div>
          <div className="bannerdiv">
            <img src={banner} alt="img" />
          </div>
        </div>
      </section>

      {loading.current ? (
        <>
          <SkeltonLoading />
          <SkeltonLoading />
        </>
      ) : (
        <>
          <section>
            <div className="headline">
              <div className="headline_main-text">
                A broad selection of courses
              </div>
              <div className="headline_sub-text">
                Choose from 183,000 online video courses with new additions
                published every month
              </div>
            </div>
          </section>
          <section>
            <div className="data-comp">
              <div className="data-cont">
                <div className="topic-btn">
                  <button>
                    <span>Python</span>
                  </button>
                  <button>
                    <span>Excel</span>
                  </button>
                  <button>
                    <span>Web Development</span>
                  </button>
                  <button>
                    <span>JavaScrip</span>
                  </button>
                  <button>
                    <span>Data Science</span>
                  </button>
                  <button>
                    <span>AWS Certification</span>
                  </button>
                  <button>
                    <span>AWS Certification</span>
                  </button>
                  <button>
                    <span>Drawing</span>
                  </button>
                </div>
                <div className="skill-hub">
                  <div className="skill-desc">
                    <h2>Unlock New Career Opportunities with Our Courses</h2>
                    <p>
                      Explore E-learning's diverse selection of courses designed to elevate your skills and expand your career potential. Whether you’re a complete beginner or an experienced developer, our programs offer something for everyone. Choose from a variety of courses tailored to your skill level, and start creating everything from interactive games to dynamic websites and innovative apps. Join us today and take the first step towards mastering the skills that will set you apart in the tech industry!
                    </p>
                    <Link className="skill-titl-btn" to={"#"}>
                      <span>Explore All Courses</span>
                    </Link>
                  </div>
                  <div className="prod-cont">
                    {products.map((el) => (
                      <LightTooltip
                        arrow
                        placement="right"
                        title={<PopperCard data={el} />}
                      >
                        <div className="prod-card">
                          <ProdCard data={el} />
                        </div>
                      </LightTooltip>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>


          <section>
            <TechCard />
          </section>
          <section>
            <div className="featured">
              <div className="feature-cont">
                <h2>Featured topic by category</h2>
                <div>
                  <div>
                    <h3>Development</h3>
                    <div className="topic">
                      <Link className="trendlink" to={"#"}>
                        Python
                      </Link>
                      <span>34,280,976 students</span>
                    </div>
                    <div className="topic">
                      <Link className="trendlink" to={"#"}>
                        Python
                      </Link>
                      <span>34,280,976 students</span>
                    </div>
                    <div className="topic">
                      <Link className="trendlink" to={"#"}>
                        Python
                      </Link>
                      <span>34,280,976 students</span>
                    </div>
                  </div>
                  <div>
                    <h3>Development</h3>
                    <div className="topic">
                      <Link className="trendlink" to={"#"}>
                        Python
                      </Link>
                      <span>34,280,976 students</span>
                    </div>
                    <div className="topic">
                      <Link className="trendlink" to={"#"}>
                        Python
                      </Link>
                      <span>34,280,976 students</span>
                    </div>
                    <div className="topic">
                      <Link className="trendlink" to={"#"}>
                        Python
                      </Link>
                      <span>34,280,976 students</span>
                    </div>
                  </div>
                  <div>
                    <h3>Development</h3>
                    <div className="topic">
                      <Link className="trendlink" to={"#"}>
                        Python
                      </Link>
                      <span>34,280,976 students</span>
                    </div>
                    <div className="topic">
                      <Link className="trendlink" to={"#"}>
                        Python
                      </Link>
                      <span>34,280,976 students</span>
                    </div>
                    <div className="topic">
                      <Link className="trendlink" to={"#"}>
                        Python
                      </Link>
                      <span>34,280,976 students</span>
                    </div>
                  </div>
                  <div>
                    <h3>Development</h3>
                    <div className="topic">
                      <Link className="trendlink" to={"#"}>
                        Python
                      </Link>
                      <span>34,280,976 students</span>
                    </div>
                    <div className="topic">
                      <Link className="trendlink" to={"#"}>
                        Python
                      </Link>
                      <span>34,280,976 students</span>
                    </div>
                    <div className="topic">
                      <Link className="trendlink" to={"#"}>
                        Python
                      </Link>
                      <span>34,280,976 students</span>
                    </div>
                  </div>
                </div>
                <a className="com-btn" href="/">
                  <span>Explore more topics</span>
                </a>
              </div>
            </div>
          </section>

          <section>
            <div className="poster1">
              <div className="poster-cont">
                <img
                  className="banner-2"
                  src="https://img.freepik.com/premium-photo/young-businesswoman-is-standing-holding-file-her-hand_1218867-243870.jpg?w=740"
                  alt=""
                />
                <div>
                  <PitchCard
                    title={"Become an instructor"}
                    des={
                      "Instructors from around the world teach millions of students on Udemy. We provide the tools and skills to teach what you love."
                    }
                    btn={"Start teaching today"}
                  />
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="partner">
              <Patner />
            </div>
          </section>
          <section>
            <div className="poster1">
              <div className="poster-cont">
                <div>
                  <PitchCard2 />
                </div>
                <img
                  className="banner-2"
                  src="https://img.freepik.com/premium-vector/learning-logo_96278-175.jpg?w=740"
                  alt=""
                />
              </div>
            </div>
          </section>
          <section>
            <div className="poster1">
              <div className="poster-cont">
                <img
                  className="banner-2"
                  src="https://img.freepik.com/premium-photo/student-using-laptop-classroom_1293807-4593.jpg?w=826"
                  alt=""
                />
                <div>
                  <PitchCard
                    title={"Transform your life through education"}
                    des={
                      "Learners around the world are launching new careers, advancing in their fields, and enriching their lives."
                    }
                    btn={"Find out how"}
                  />
                </div>
              </div>
            </div>
          </section>
          <section></section>
        </>
      )}
      <Bottombar />
    </>
  );
};
/*
 */
const PitchCard = ({ title, des, btn }) => {
  return (
    <div className="pitch-cont">
      <h1 className="pitchHead">{title}</h1>
      <p className="pitchdec">{des}</p>
      <UdemyBtn btn={btn} />
    </div>
  );
};
const PitchCard2 = () => {
  return (
    <div className="pitch-cont">
      <img
        className="pitchcard2img"
        src="https://static.vecteezy.com/system/resources/thumbnails/002/294/890/small_2x/digital-education-web-banner-design-teacher-on-monitor-to-explain-the-graph-online-education-e-learning-digital-education-platform-concept-header-or-footer-banner-free-vector.jpg"
        alt=""
      />
      <p className="pitchdec">
        Get unlimited access to 6,000+ of E-learning's top courses for your team.
        Learn and improve skills across business, tech, design, and more.
      </p>
      <UdemyBtn btn={"Get E-learning Business"} />
    </div>
  );
};

const UdemyBtn = ({ btn }) => {
  return (
    <div>
      <Link to={"#"} className="udemylinkbtn">
        {btn}
      </Link>
    </div>
  );
};

const Patner = () => {
  return (
    <div>
      <h3 className="partner-title">Trusted by companies of all sizes</h3>
      <div className="parner-logo-cont">
        <img
          src="https://s.udemycdn.com/partner-logos/v4/nasdaq-dark.svg"
          alt=""
        />
        <img
          src="https://s.udemycdn.com/partner-logos/v4/volkswagen-dark.svg"
          alt=""
        />
        <img
          src="https://s.udemycdn.com/partner-logos/v4/box-dark.svg"
          alt=""
        />
        <img
          src="https://s.udemycdn.com/partner-logos/v4/netapp-dark.svg"
          alt=""
        />
        <img
          src="https://s.udemycdn.com/partner-logos/v4/eventbrite-dark.svg"
          alt=""
        />
      </div>
    </div>
  );
};

const SkeltonLoading = () => {
  return (
    <>
      <div className="skelton">
        <Skeleton className="line" variant="text" animation="wave" />
        <div className="midskel">
          <Skeleton
            className="rectangel"
            variant="rectangular"
            width={50}
            height={50}
          />
          <div>
            <Part />
          </div>
        </div>
      </div>
    </>
  );
};
const Part = () => {
  return (
    <>
      <Skeleton variant="text" className="wave" animation="wave" />
      <Skeleton variant="text" className="wave" animation="wave" />
      <Skeleton variant="text" className="wave" animation="wave" />
      <Skeleton variant="text" className="wave" animation="wave" />
    </>
  );
};

