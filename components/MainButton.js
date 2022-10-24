import styled from "styled-components";

const MainButton = styled.button`
  width: 16rem;
  display: block;
  padding: 1rem 3rem;
  border-radius: 22px;
  font-size: 1.1rem;
  margin: ${(props) => props.margin || "1.5rem"};
  cursor: pointer;
  box-shadow: ${({ type }) =>
    type === "primary" ? "var(--drop-shadow-gray)" : "none"};
  border: ${({ type }) =>
    type === "primary" ? "none" : " 2px solid var(--highlight)"};
  color: ${({ type }) =>
    type === "primary" ? "var(--text-light)" : "var(--highlight)"};
  background: ${({ type }) =>
    type === "primary" ? "var(--highlight-gradient)" : "white"};
  &:hover {
    background: ${({ type }) =>
      type === "primary" ? "var(--highlight)" : "var(--background-neutral)"};
  }
`;

export { MainButton };
