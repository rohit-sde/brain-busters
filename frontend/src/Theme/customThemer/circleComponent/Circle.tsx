import styled from "styled-components";

const Circle = ({
  colors,
  func,
  isActive,
}: {
  colors?: string;
  isActive: boolean;
}) => {
  return (
    <Circlediv
      colors={colors || "red,yellow"}
      onClick={func}
      active={isActive}
    ></Circlediv>
  );
};

const Circlediv = styled.div<{ colors: string; active: boolean }>`
  height: 23px;
  width: 23px;
  border-radius: 16px;
  filter: brightness(1.6);
  cursor: pointer;
  background: linear-gradient(${(props) => props.colors});
  transition: all 0.4s;
  transform: ${(props) => (props.active ? "scale3d(1.5, 1.5, 1.5)" : "none")};
  &:hover {
    transform: scale3d(1.5, 1.5, 1.5);
  }
`;

export default Circle;
