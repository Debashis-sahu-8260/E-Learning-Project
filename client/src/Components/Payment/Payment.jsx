import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./payment.module.css";
import CircularProgress from "@mui/material/CircularProgress";

const Payment = () => {
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token")) || null;
    if (token) {
      axios
        .get(`http://localhost:8080/cart/${token.user._id}`) // Updated URL
        .then(({ data }) => {
          const total = data.reduce((acc, el) => acc + el.productId.price, 0);
          setPrice(total);
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        });
    }
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <div className={style.payment_form_details}>
        {/* Right Part */}
        <div className={style.form_right}>
          <h1>Checkout</h1>
          <p>Billing Address</p>
          <div className={style.selectplace}>
            <div className={style.select_country}>
              <label htmlFor="select_country">Country</label>
              <select id="select_country" className={style.select_country}>
                <option value="india">India</option>
                <option value="united_states">United States</option>
                <option value="europe">Europe</option>
              </select>
            </div>
            <div className={style.select_state}>
              <label htmlFor="select_state">State</label>
              <select id="select_state" className={style.select_state}>
                <option value="disabled">Please select...</option>
                <option value="karnataka">Karnataka</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="kerala">Kerala</option>
              </select>
            </div>
          </div>

          {/* Payment Options */}
          <div className={style.payment_options}>
            <div className={style.creditcard_option}>
              <input
                type="radio"
                className={style.input_radio}
                name="payment"
              />
              <span className={style.radio_span}>Credit/Debit Card</span>
              <span className={style.payment_span_images}>
                <img
                  src="https://www.udemy.com/staticx/udemy/images/v9/card-mastercard.svg"
                  alt="MasterCard"
                />
                <img
                  src="https://www.udemy.com/staticx/udemy/images/v9/card-visa.svg"
                  alt="Visa"
                />
                <img
                  src="https://www.udemy.com/staticx/udemy/images/v9/card-discover.svg"
                  alt="Discover"
                />
                <img
                  src="https://www.udemy.com/staticx/udemy/images/v9/card-dinersclub.svg"
                  alt="Diners Club"
                />
                <img
                  src="https://www.udemy.com/staticx/udemy/images/v9/card-amex.svg"
                  alt="American Express"
                />
                <img
                  src="https://www.udemy.com/staticx/udemy/images/v9/card-rupay.svg"
                  alt="Rupay"
                />
              </span>
            </div>

            <div className={style.creditcard_option}>
              <input
                type="radio"
                className={style.input_radio}
                name="payment"
              />
              <span className={style.radio_span}>UPI</span>
              <span className={style.payment_span_images}>
                <img
                  src="https://www.udemy.com/staticx/udemy/images/v9/hpp-upi.svg"
                  alt="UPI"
                />
              </span>
            </div>

            <div className={style.creditcard_option}>
              <input
                type="radio"
                className={style.input_radio}
                name="payment"
              />
              <span className={style.radio_span}>PayTM</span>
              <span className={style.payment_span_images}>
                <img
                  src="https://www.udemy.com/staticx/udemy/images/v9/hpp-paytm.svg"
                  alt="PayTM"
                />
              </span>
            </div>

            <div className={style.creditcard_option}>
              <input
                type="radio"
                className={style.input_radio}
                name="payment"
              />
              <span className={style.radio_span}>Net Banking</span>
              <span className={style.payment_span_images}>
                <img
                  src="https://www.udemy.com/staticx/udemy/images/v9/hpp-billdesk-online.svg"
                  alt="Net Banking"
                />
              </span>
            </div>

            <div className={style.creditcard_option}>
              <input
                type="radio"
                className={style.input_radio}
                name="payment"
              />
              <span className={style.radio_span}>Mobile Wallets</span>
            </div>
          </div>

          {/* Card Details */}
          <div className={style.card_detailsDiv}>
            <div className={style.input_cardnameDiv}>
              <input
                className={style.input_cardname}
                type="text"
                placeholder="Name on Card"
              />
            </div>
            <div className={style.input_cardnumDiv}>
              <input
                className={style.input_cardnum}
                type="text"
                placeholder="Card Number"
              />
            </div>
            <div className={style.cardValidity}>
              <div className={style.cardSelect}>
                <label htmlFor="cardMonth">Card Valid Month</label>
                <select id="cardMonth" className={style.cardValMonth}>
                  <option value="">MM</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>

              <div className={style.cardSelect}>
                <label htmlFor="cardYear">Card Valid Year</label>
                <select id="cardYear" className={style.cardValYear}>
                  <option value="">YYYY</option>
                  {Array.from({ length: 11 }, (_, i) => (
                    <option key={2023 + i} value={2023 + i}>
                      {2023 + i}
                    </option>
                  ))}
                </select>
              </div>

              <div className={style.inputSecurityNumDiv}>
                <label htmlFor="securityCode">Security Code</label>
                <input
                  id="securityCode"
                  className={style.inputSecurityNum}
                  type="text"
                  placeholder="CVV"
                  required
                />
              </div>
            </div>

            <div className={style.checkbox_payment}>
              <input type="checkbox" id="checkbox_payment" />
              <label htmlFor="checkbox_payment">Remember this card</label>
            </div>
          </div>
        </div>

        {/* Left Part */}
        <div className={style.form_left}>
          <h2>Summary</h2>
          <table className={style.price_table}>
            <tbody>
              <tr>
                <td>Original price:</td>
                <td>
                  <span className={style.course_price}> &#8377;{price}</span>
                </td>
              </tr>
              <tr>
                <td>Coupon discounts:</td>
                <td>
                  <span className={style.course_price}>
                    {" "}
                    &#8377;{(price * 0.1).toFixed(2)}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Total:</b>
                </td>
                <td>
                  <span className={style.course_price}>
                    <b>&#8377;{(price - price * 0.1).toFixed(2)}</b>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          {loading ? (
            <CircularProgress />
          ) : (
            <button
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  alert("Payment Success");
                  navigate("/");
                }, 2000);
              }}
              id="complete_payment"
              className={style.complete_payment}
            >
              Complete Payment
            </button>
          )}
          <div className={style.after_total}>
            Udemy is required by law to collect applicable transaction taxes for
            purchases made in certain tax jurisdictions.
          </div>
          <div className={style.terms_conditions}>
            <span>
              By completing your purchase you agree to these{" "}
              <a href="#">Terms of Service</a>.
            </span>
          </div>
          <div className={style.ordersummary}>
            <h2>Order Summary</h2>
            <div className={style.ordersummery_details}>
              <img
                src="https://img-c.udemycdn.com/course/100x100/354176_fe73_5.jpg"
                alt="Course"
              />
              <div className={style.order_course}>
                <h4>
                  Selenium WebDriver with Java-Basics to Advanced + Frameworks
                </h4>
              </div>
              <div>
                <div className={style.course_price}>
                  <span>&#8377;455</span>
                </div>
                <div className={style.course_price}>
                  <span>
                    <del>&#8377;3,499</del>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
    </div>
  );
};

export default Payment;
