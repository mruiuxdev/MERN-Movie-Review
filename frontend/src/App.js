import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ConfirmPassword from "./components/auth/ConfirmPassword";
import EmailVerification from "./components/auth/EmailVerification";
import ForgetPassword from "./components/auth/ForgetPassword";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Menu from "./components/user/Navbar";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route
          path="/auth/verification-email"
          element={<EmailVerification />}
        />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/confirm-password" element={<ConfirmPassword />} />
      </Routes>
    </>
  );
}

export default App;
