import React from 'react';
import style from './Contact.module.css';

const Contact = () => {
  return (
    <section className={style.contact}>
      <div className={style.content}>
        <h2>Contact Us</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
      </div>
      <div className={style.container}>
        <div className={style.contactInfo}>
          <div className={style.box}>
            <div className={style.icon}></div>
            <div className={style.text}>
              <h3>Address</h3>
              <p>1234 Street Name, City, Country</p>
            </div>
          </div>
          <div className={style.box}>
            <div className={style.icon}>

            </div>
            <div className={style.text}>
              <h3>Phone</h3>
              <p>(123) 456-7890</p>
            </div>
          </div>
          <div className={style.box}>
            <div className={style.icon}>

            </div>
            <div className={style.text}>
              <h3>Email</h3>
              <p>email@example.com1</p>
            </div>
          </div>
        </div>

        <div className={style.contactForm}>
          <form style={{ marginLeft: "0px" }}>
            <h2>Send Message</h2>
            <div className={style.inputBox}>
              <input type="text" name="fullName" required="required" />
              <span>Full Name</span>
            </div>
            <div className={style.inputBox}>
              <input type="text" name="email" required="required" />
              <span>Email</span>
            </div>
            <div className={style.inputBox}>
              <textarea required="required"></textarea>
              <span>Type your Message...</span>
            </div>
            <div className={style.inputBox}>
              <input type="submit" value="Send" />
            </div>
          </form>
        </div>
      </div>

    </section>
  );
};

export default Contact;
