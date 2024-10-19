import React, { useEffect, useRef, useState } from "react";
import style from "./Cart.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Rating from "@mui/material/Rating";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import paymentsvg from "../../assets/payment.png";
import Media from "./media";

export const CartPage = () => {
  const [data, setData] = useState([]);
  const loading = useRef(true);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token && token.user && token.user._id) {
      axios
        .get(`http://localhost:8080/cart/${token.user._id}`)
        .then(({ data }) => {
          console.log(data); // Log the fetched data
          loading.current = false;
          setData([...data]);
        })
        .catch((error) => {
          console.error("Error fetching cart:", error);
          loading.current = false;
        });
    } else {
      console.warn("User ID is not available");
      loading.current = false;
    }
  }, []);

  const handleDelete = (productId) => {
    axios.delete(`http://localhost:8080/cart/${productId}`)
      .then(() => {
        setData((prevData) => prevData.filter((el) => el.productId?._id !== productId));
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  const TotalPrice = () => {
    const total = data.reduce((acc, el) => acc + (el.productId?.price || 0), 0);
    return <div>₹{total}</div>;
  };

  return (
    <div className={style.container}>
      <h1 className={style.heading}>Shopping Cart</h1>
      <div className={style.cartLayout}>
        <div className={style.cartItemsContainer}>
          {loading.current ? (
            <Media loading />
          ) : (
            <div className={style.cartItems}>
              <p>Courses in Cart</p>
              {data.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div className={style.cartItemsList}>
                  {data.map((el) => (
                    <div key={el.productId?._id} className={style.cartItem}>
                      <div className={style.cartItemContainer}>
                        <div className={style.productImg}>
                          <img 
                            src={el.productId?.image || "default_image_url.jpg"} 
                            alt={el.productId?.title || "Default Title"} 
                          />
                          <div>
                            <h4 className={style.productTitle}>{el.productId?.title || "Default Title"}</h4>
                            <p className={style.productAuthor}>{el.productId?.author || "Unknown Author"}</p>
                          </div>
                        </div>
                        <div className={style.productDetails}>
                          <div className={style.productExtras}>
                            <button className={style.bestsellerBadge}>Bestseller</button>
                            <div className={style.ratingSection}>
                              <span className={style.ratingValue}>{el.productId?.rating || 4.5}</span>
                              <Rating
                                name="read-only"
                                size="small"
                                precision={0.5}
                                value={el.productId?.rating || 4.5}
                                readOnly
                              />
                            </div>
                          </div>
                          <ul className={style.productInfoList}>
                            <li>2.5 total hours</li>
                            <li>33 lectures</li>
                            <li>{el.productId?.level || "N/A"}</li>
                          </ul>
                          <div className={style.priceSection}>
                            <h3 className={style.productPrice}>Rs. ₹{el.productId?.price || 0}</h3>
                            <div className={style.actionsSection}>
                              <DeleteForeverIcon 
                                onClick={() => handleDelete(el.productId?._id)} 
                                style={{ cursor: 'pointer' }} 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className={style.paymentOptions}>
          <div className={style.totalDiv}>
            <div className={style.totalPrice}>
              <p>Total: </p>
              <h1><TotalPrice /></h1>
            </div>
            <div className={style.checkOutButton}>
              <button onClick={() => navigate("/payment")}>
                <h4>Checkout</h4>
              </button>
            </div>
            <div className={style.promotion}>
              <h4>Promotions</h4>
              <div className={style.promotionDiv}>
                <CloseIcon className={style.closeicon} />
                <p>
                  <span>KEEPLEARNING </span>is applied
                </p>
              </div>
              <div className={style.couponInput}>
                <input
                  type="text"
                  className={style.inputCop}
                  placeholder="Enter Coupon"
                />
                <button className={style.applybtn}>Apply</button>
              </div>
            </div>
            <div className={style.lastDiv}>
              <p>Buy now, pay later for orders of $25 and over</p>
              <img className={style.klarna} src={paymentsvg} alt="klarna" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
