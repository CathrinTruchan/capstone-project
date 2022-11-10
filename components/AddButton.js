import styled from "styled-components";

const AddButton = styled.button`
  position: fixed;
  bottom: 3rem;
  right: 2rem;
  z-index: 30;
  border: none;
  display: block;
  margin: auto;
  background: var(--highlight-gradient);
  box-shadow: var(--drop-shadow-gray);
  color: var(--text-light);
  font-size: 2rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  &:active {
    background-color: var(--highlight);
    color: var(--text-light);
  }
`;

export { AddButton };
