import styled from "styled-components";

const Backdrop = () => {
  return <Backdroper></Backdroper>;
};

export default Backdrop;

const Backdroper = styled.div`
  opacity: 0.6;
  display: inline-block;
  height: 100%;
  width: 100%;
  background-color: #00000061;
  position: absolute;
  backdrop-filter: blur(35px);
  z-index: 2;
`;
