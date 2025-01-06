import { TextInput } from "flowbite-react";
import React from "react";

const FormInput = ({ name, placeholder, icon, ...rest }) => {
  return (
    <TextInput
      id={name}
      placeholder={placeholder}
      icon={icon}
      {...rest}
      required
    />
  );
};

export default FormInput;
