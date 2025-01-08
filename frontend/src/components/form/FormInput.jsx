import { TextInput } from "flowbite-react";
import React from "react";

const FormInput = ({ placeholder, icon, ...rest }) => {
  return <TextInput placeholder={placeholder} icon={icon} {...rest} />;
};

export default FormInput;
