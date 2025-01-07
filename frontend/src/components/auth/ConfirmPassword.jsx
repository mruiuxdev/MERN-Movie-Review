import { HiLockClosed } from "react-icons/hi";
import FormInput from "../form/FormInput";
import Heading from "../form/Heading";
import Submit from "../form/Submit";

const ConfirmPassword = () => {
  return (
    <div className="fixed dark:bg-gray-900 inset-0 -z-10 flex flex-col items-center justify-center p-2">
      <Heading>Add New Password</Heading>
      <form className="flex w-full max-w-md flex-col gap-4">
        <div>
          <FormInput
            type="password"
            name="newPassword"
            icon={HiLockClosed}
            placeholder="New Password"
          />
        </div>
        <div>
          <FormInput
            type="password"
            name="confirmPassword"
            icon={HiLockClosed}
            placeholder="Confirm New Password"
          />
        </div>
        <Submit>Confirm Password</Submit>
      </form>
    </div>
  );
};

export default ConfirmPassword;
