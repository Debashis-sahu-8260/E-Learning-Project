import React from "react";
import { Link } from "react-router-dom";
import "./poppercard.css";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { addToCartFunction } from "../../Redux/cart/action";
import { addToWishlistFunction } from "../../Redux/wishlist/action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PopperCard = ({ data }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((store) => store.cart);
  const { wishlistloading } = useSelector((store) => store.wishlist);
  const { user } = useSelector((store) => store.auth);

  const handleAddToCart = () => {
    if (!user?.user?._id) {
      alert("Please log in to add items to the cart.");
      return;
    }

    const cartSchema = {
      userId: user.user._id,
      productId: data._id,
    };

    const URL = "http://localhost:8080/cart/";
    dispatch(addToCartFunction(cartSchema, URL));
    
    // Show success toast
    toast.success("Item added to cart!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleAddToWishlist = () => {
    if (!user?.user?._id) {
      alert("Please log in to add items to the wishlist.");
      return;
    }

    const wishlistSchema = {
      userId: user.user._id,
      productId: data._id,
    };

    const URL = "http://localhost:8080/wishlist/";
    dispatch(addToWishlistFunction(wishlistSchema, URL));
    
    // Show success toast
    toast.success("Item added to wishlist!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="poppercard">
      <Link className="p-title" to={"#"}>
        {data?.title}
      </Link>
      <div className="p-date-con">
        <span className="p-date-up">Updated</span>
        <span className="p-date">December 2021</span>
      </div>
      <div className="p-level">
        <span>All Levels</span>
        <span className="p-sub">Subtitles</span>
      </div>
      <div className="p-desc">{data?.description}</div>
      <div className="highlights">
        {data?.details.map((el, index) => (
          <PoperPoint key={index} text={el} />
        ))}
      </div>
      <div className="p-btn-div">
        {error ? (
          <Alert className="alert" severity="error">
            <p>Something went wrong</p>
          </Alert>
        ) : (
          <ColorButton onClick={handleAddToCart} style={{background:"blue",width:"50%"}}>
            {loading ? (
              <CircularProgress style={{ color: "white" }} />
            ) : (
              "Add to cart"
            )}
          </ColorButton>
        )}
        <button className="heart-cir" onClick={handleAddToWishlist}>
          {wishlistloading ? (
            <CircularProgress style={{ color: "black" }} />
          ) : (
            <FavoriteBorderOutlinedIcon fontSize="medium" />
          )}
        </button>
      </div>
      <ToastContainer
        position="top-right" // Set position here
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        style={{ zIndex: 9999 }} // Ensure it appears above other elements
      />
    </div>
  );
};

const PoperPoint = ({ text }) => {
  return (
    <div className="point-con">
      <CheckIcon />
      <p>{text}</p>
    </div>
  );
};

export const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#a435f0",
  height: "2.8rem",
  borderRadius: "5px",
  fontSize: "1rem",
  width: "100%",
  fontWeight: "700",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#8710d8",
  },
}));
