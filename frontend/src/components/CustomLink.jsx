import { Link } from "react-router-dom";

export const CustomLink = ({ to, children }) => {
  return (
    <Link to={to} className="hover:text-cyan-700 transition-colors">
      {children}
    </Link>
  );
};
