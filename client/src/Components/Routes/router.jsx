import { Route, Routes, useLocation } from "react-router-dom";
import { CartPage } from "../Cart/Cart";
import { Header } from "../Header/Header";
import { Landigpage } from "../LandingPage/Landin";
import Login from "../Login_Signup/Login";
import Signup from "../Login_Signup/Signup";
import Payment from "../Payment/Payment";
import { Product } from "../Product/Product";
import Wishlist from "../Wishlist/Wishlist";
import Admin from "../Admin/Admin";
import Contact from "../Contact/Contact";

export const AllRoutes = () => {
  const location = useLocation();


  const showHeader = location.pathname !== "/admin";

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Landigpage />} />
        <Route path="/courses/:id" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/join/signup-popup" element={<Signup />} />
        <Route path="/join/login-popup" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </>
  );
};
