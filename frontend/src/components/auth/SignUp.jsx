import { HiLockClosed, HiMail, HiUser } from "react-icons/hi";
import { CustomLink } from "../CustomLink";
import FormInput from "../form/FormInput";
import Heading from "../form/Heading";
import Submit from "../form/Submit";

const SignUp = () => {
  return (
    <div className="fixed dark:bg-gray-900 inset-0 -z-10 flex flex-col items-center justify-center p-2">
      <Heading>Sign Up</Heading>
      <form className="flex w-full max-w-md flex-col gap-4">
        <div>
          <FormInput type="text" name="name" placeholder="Name" icon={HiUser} />
        </div>
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
            placeholder="Password"
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
