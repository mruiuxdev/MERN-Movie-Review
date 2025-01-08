import { HiLockClosed, HiMail, HiUser } from "react-icons/hi";
import { CustomLink } from "../CustomLink";
import FormInput from "../form/FormInput";
import Heading from "../form/Heading";
import Submit from "../form/Submit";
import { useState } from "react";
import { createUser } from "../../api/auth";

const validateUserInfo = ({ name, email, password }) => {
  const isValidateName = /^[a-z A-Z]+$/;
  const isValidateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name.trim()) return { ok: false, errorValidate: "Name is missing" };
  if (!isValidateName.test(name))
    return { ok: false, errorValidate: "Invalid name" };

  if (!email.trim()) return { ok: false, errorValidate: "Email is missing" };
  if (!isValidateEmail.test(email))
    return { ok: false, errorValidate: "Invalid email" };

  if (!password.trim())
    return { ok: false, errorValidate: "Password is missing" };
  if (password.length < 8)
    return {
      ok: false,
      errorValidate: "Password is must be at least 8 characters",
    };

  return { ok: true };
};

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { ok, errorValidate } = validateUserInfo(userInfo);
    if (!ok) return console.log(errorValidate);

    const { error, user } = await createUser(userInfo);
    if (error) return console.log(error);

    console.log(user);
  };

  const { name, email, password } = userInfo;

  return (
    <div className="fixed dark:bg-gray-900 inset-0 -z-10 flex flex-col items-center justify-center p-2">
      <Heading>Sign Up</Heading>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4"
      >
        <div>
          <FormInput
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Name"
            icon={HiUser}
          />
        </div>
        <div>
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email address"
            required={false}
            icon={HiMail}
          />
        </div>
        <div>
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            icon={HiLockClosed}
          />
        </div>
        <Submit>Sign Up</Submit>
        <div className="text-center dark:text-white">
          Already have an account?{" "}
          <CustomLink to="/auth/sign-in">Sign in</CustomLink>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
