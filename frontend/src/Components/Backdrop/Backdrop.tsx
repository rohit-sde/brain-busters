import styled from "styled-components";

const Backdrop: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Backdroper>{children}</Backdroper>;
};

export default Backdrop;

const Backdroper = styled.div`
  opacity: 0.9;
  display: inline-block;
  align-content: center;
  justify-items: center;
  height: 100%;
  width: 100%;
  background-color: #00000061;
  position: absolute;
  backdrop-filter: blur(35px);
  z-index: 2;
`;
