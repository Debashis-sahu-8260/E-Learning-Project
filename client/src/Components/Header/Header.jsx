import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../Redux/login/action";
import { addToCart } from "../../Redux/cart/action";
import eLogo from "../../assets/elearning.webp";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const Header = () => {
  const { cart } = useSelector((store) => store.cart);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token")) || null;
    if (user.user == null) {
      if (token != null) {
        dispatch(auth(token));
      }
    }
    if (token != null)
      axios
        .get(`https://udemy-vr4p.onrender.com/cart/${token?.user?._id}`)
        .then(({ data }) => {
          dispatch(addToCart(data.length));
        });
  }, [dispatch, user]);

  const navigate = useNavigate(); // Initialize useNavigate
  const [isLoggedOut, setIsLoggedOut] = useState(false); // State variable for logout

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(auth(null));
    setIsLoggedOut(true); 
    window.location.reload(); 
  };

  // Redirect after logout
  useEffect(() => {
    if (isLoggedOut) {
      navigate("/"); // Redirect to landing page
    }
  }, [isLoggedOut, navigate]); // Add navigate to the dependency array

  return (
    <>
      <header>
        <div className="topnavbar">
          <Link className="udemylink" to={"/"}>
            <img className="udemylogo" src={eLogo} alt="" />
          </Link>

          <div className="searchbar">
            <button>
              <SearchIcon />
            </button>
            <input type="text" placeholder="Search for anything" />
          </div>
          <div>
            <Link className="linkstyle" to={"/Contact"}>
              <span className="nav-span">Contact Us</span>
            </Link>
          </div>

          {user?.user && (
            <div>
              <Link className="linkstyle" to={"#"}>
                <span className="nav-span">My learning</span>
              </Link>
            </div>
          )}
          {user?.user && (
            <div>
              <Link to={"/wishlist"}>
                <button className="cart">
                  <FavoriteBorderOutlinedIcon />
                </button>
              </Link>
            </div>
          )}
          <div>
            <Link to={"/cart"}>
              <button className="cart">
                <Badge color="secondary" badgeContent={cart}>
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </button>
            </Link>
          </div>
          {user?.user && (
            <div>
              <Link to={"#"}>
                <button className="cart">
                  <Badge color="secondary" badgeContent={0}>
                    <NotificationsNoneOutlinedIcon />
                  </Badge>
                </button>
              </Link>
            </div>
          )}
          {user?.user && (
            <div>
              <button className="cart" onClick={() => setOpenModal(true)}>
                <Badge
                  color="secondary"
                  overlap="circular"
                  badgeContent=" "
                  variant="dot"
                >
                  <Avatar sx={{ bgcolor: red[500] }}>
                    {user.user.name[0].toUpperCase()}
                  </Avatar>
                </Badge>
              </button>
            </div>
          )}
          {!user?.user && (
            <div>
              <Link to={"/join/login-popup"}>
                <button className="login">Log in</button>
              </Link>
            </div>
          )}
          {!user?.user && (
            <div>
              <Link to={"/join/signup-popup"}>
                <button className="signup">Sign up</button>
              </Link>
            </div>
          )}
          {!user?.user && (
            <div>
              <Link to={"#"}>
                <button className="lang">
                  <LanguageIcon />
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Logout Confirmation Modal */}
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="logout-modal-title"
          aria-describedby="logout-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(140%, -180%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 id="logout-modal-title">Logout</h2>
            <p id="logout-modal-description">
              Are you sure you want to log out?
            </p>
            <Button
              variant="contained"
              onClick={handleLogout}
              style={{ background: "red" }}
            >
              Log Out
            </Button>
            <Button
              variant="outlined"
              onClick={() => setOpenModal(false)}
              style={{ marginLeft: "50px" }}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
      </header>
    </>
  );
};
