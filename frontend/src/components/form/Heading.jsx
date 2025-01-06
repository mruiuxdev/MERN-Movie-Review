const Heading = ({ children }) => {
  return (
    <div className="mb-5">
      <h1 className="text-center dark:text-white font-bold text-2xl">
        {children}
      </h1>
    </div>
  );
};

export default Heading;
