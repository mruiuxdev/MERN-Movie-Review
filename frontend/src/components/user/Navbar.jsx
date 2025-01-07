import { Button, DarkThemeToggle, Navbar, TextInput } from "flowbite-react";
import { MdOutlineSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../../logo.svg";

const Menu = () => {
  return (
    <Navbar className="shadow-lg">
      <Navbar.Brand href="https://flowbite-react.com">
        <img src={Logo} className="mr-1 w-20" alt="Flowbite React Logo" />
      </Navbar.Brand>
      <div className="flex  gap-2 md:order-2">
        <DarkThemeToggle />
        <TextInput
          id="search"
          type="text"
          icon={MdOutlineSearch}
          placeholder="Search"
          required
        />
        <Button as="div">
          <Link to="/auth/sign-in">Sign In</Link>
        </Button>
      </div>
    </Navbar>
  );
};

export default Menu;
