import "./loader.css";

const Loader = ({ size = 21 }) => {
  const loaderStyle = {
    height: `${size}px`,
  };

  return <div style={loaderStyle} className="loader"></div>;
};

export default Loader;
