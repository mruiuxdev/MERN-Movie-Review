import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import { Menu } from "./components/user/Navbar";

function App() {
  return (
    <>
      <Menu />
      <SignIn />
      {/* <SignUp /> */}
    </>
  );
}

export default App;
