import { HiLockClosed, HiMail } from "react-icons/hi";
import FormInput from "../form/FormInput";
import Heading from "../form/Heading";
import Submit from "../form/Submit";

const SignIn = () => {
  return (
    <div className="fixed dark:bg-gray-900 inset-0 -z-10 flex flex-col items-center justify-center p-2">
      <Heading>Sign In</Heading>
      <form className="flex w-full max-w-md flex-col gap-4">
        <div>
          <FormInput
            type="email"
            name="email"
            placeholder="Email address"
            icon={HiMail}
          />
        </div>
        <div>
          <FormInput
            type="password"
            name="password"
            icon={HiLockClosed}
            placeholder="******"
          />
        </div>
        <div className="flex dark:text-white items-center justify-between gap-2">
          <a href="#" className="hover:text-cyan-700 transition-colors">
            Forget password?
          </a>
        </div>
        <Submit>Sign In</Submit>
        <div className="text-center dark:text-white">
          Don't have an account?{" "}
          <a
            href="#"
            className="underline hover:text-cyan-700 transition-colors"
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
