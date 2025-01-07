import { HiMail } from "react-icons/hi";
import FormInput from "../form/FormInput";
import Heading from "../form/Heading";
import Submit from "../form/Submit";
import { CustomLink } from "../CustomLink";

const ForgetPassword = () => {
  return (
    <div className="fixed dark:bg-gray-900 inset-0 -z-10 flex flex-col items-center justify-center p-2">
      <Heading>Enter Your Email</Heading>
      <form className="flex w-full max-w-md flex-col gap-4">
        <div>
          <FormInput
            type="email"
            name="email"
            placeholder="Email address"
            icon={HiMail}
          />
        </div>
        <Submit>Send</Submit>
        <div className="flex justify-between dark:text-white">
          <CustomLink to="/auth/sign-in">Sign In</CustomLink>
          <CustomLink to="/auth/sign-up">Sign Up</CustomLink>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
