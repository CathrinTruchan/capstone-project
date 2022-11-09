import styled from "styled-components";

const MainButton = styled.button`
  width: ${(props) => props.width || "12rem"};
  display: block;
  padding: 0.8rem 1rem;
  border-radius: 22px;
  font-size: 1rem;
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
  &:disabled {
    background-color: var(--background-neutral);
    color: var(--background-primary);
  }
`;

export { MainButton };
