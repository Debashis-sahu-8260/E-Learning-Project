import Favicon from "react-favicon";
import { AllRoutes } from "./Components/Routes/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';




export const App = () => {
  return (
    <GoogleOAuthProvider clientId="1008450012110-9p26l4gn530kuvs05qefgam7urgepggm.apps.googleusercontent.com">
    <div className="main-cont">
      <Favicon url="https://poltekapp.ac.id/wp-content/uploads/2021/04/elearning.png" />
      <AllRoutes />
    </div>
    </GoogleOAuthProvider>
  );
};
