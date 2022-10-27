import styled from "styled-components";
import { forwardRef, useState } from "react";
import CreateFlowForm from "../../components/CreateFlow";
import { nanoid } from "nanoid";

const flowDummys = [
  {
    id: nanoid(),
    name: "Flow 1",
    asanas: [],
    duration: {
      hours: 1,
      minutes: 40,
    },
    description: "lorem ipsum",
  },
  {
    id: nanoid(),
    name: "Flow 2",
    asanas: [],
    duration: {
      hours: 0,
      minutes: 50,
    },
    description: "lorem ipsum",
  },
];

export default function CreateFlow() {
  const [open, setOpen] = useState(false);
  const [flows, setFlows] = useState(flowDummys);

  function toggleOpen() {
    setOpen((prev) => (prev = !prev));
  }

  return (
    <>
      <h1>Create a new Flow</h1>
      <StyledAddButton onClick={toggleOpen}>{open ? "X" : "+"}</StyledAddButton>
      {open && <CreateFlowForm setFlows={setFlows} flows={flows} />}

      {flows.map((flow) => flow.name)}
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
