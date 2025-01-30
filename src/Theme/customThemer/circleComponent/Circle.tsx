const Circle = ({ colors }: { colors?: string }) => {
  const styleCircle = {
    height: "23px",
    width: "23px",
    borderRadius: "16px",
    filter: "brightness(1.6)",
    cursor: "pointer",
    background: `linear-gradient(${colors})`,
  };
  return <div style={styleCircle}></div>;
};

export default Circle;
