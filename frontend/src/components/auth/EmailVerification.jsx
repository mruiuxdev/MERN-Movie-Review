import { useEffect, useRef, useState } from "react";
import Heading from "../form/Heading";
import Submit from "../form/Submit";

const OTPLength = 6;

const EmailVerification = () => {
  const [OTP, setOTP] = useState(new Array(OTPLength).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);

  const inputRef = useRef();

  const handleOTPChange = ({ target }, i) => {
    const { value } = target;

    const newOtp = [...OTP];
    newOtp[i] = value.substring(value.length - 1, value.length);

    setOTP([...newOtp]);
    setActiveOTPIndex(i + 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  return (
    <div className="fixed dark:bg-gray-900 inset-0 -z-10 flex flex-col items-center justify-center p-2">
      <Heading>Enter the OTP to verify account</Heading>
      <p className="text-center mb-5 dark:text-white">
        OTP has been sent to your email
      </p>
      <form className="flex w-full max-w-md flex-col">
        <div className="flex gap-4 justify-center mb-5">
          {OTP.map((_, i) => (
            <input
              key={i}
              type="number"
              value={OTP[i] || ""}
              onChange={(e) => handleOTPChange(e, i)}
              ref={activeOTPIndex === i ? inputRef : null}
              className="w-10 h-11  border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 rounded-lg text-center text-md"
            />
          ))}
        </div>
        <Submit>Verify</Submit>
      </form>
    </div>
  );
};

export default EmailVerification;
