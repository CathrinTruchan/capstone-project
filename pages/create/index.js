import styled from "styled-components";
import { useState } from "react";

export default function CreateFlow() {
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen((prev) => (prev = !prev));
  }

  return (
    <>
      <h1>Create a new Flow</h1>
      <StyledAddButton onClick={toggleOpen}>{open ? "X" : "+"}</StyledAddButton>
      {open && <p>testtext</p>}
    </>
  );
}

const StyledAddButton = styled.button`
  border: none;
  display: block;
  margin: 5rem auto;
  background: var(--highlight-gradient);
  color: var(--text-light);
  font-size: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  &:active {
    background-color: var(--highlight);
    color: var(--text-light);
  }
`;
