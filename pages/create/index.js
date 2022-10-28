import styled from "styled-components";
import { useState } from "react";
import CreateFlowForm from "../../components/CreateFlow";
import { nanoid } from "nanoid";
import FlowCard from "../../components/FlowCard";
import useLocalStorage from "../../hooks/useLocalStorage";
import { flowDummys } from "../../db";

export default function CreateFlow() {
  const [open, setOpen] = useState(false);
  const [flows, setFlows] = useLocalStorage("flows", flowDummys);

  function toggleOpen() {
    setOpen((prev) => (prev = !prev));
  }

  function addFlow({ name, hours, minutes }) {
    setFlows([
      ...flows,
      {
        id: nanoid(),
        name: name,
        asanas: [],
        duration: {
          hours: hours,
          minutes: minutes,
        },
        description: "",
      },
    ]);
    setOpen(false);
  }

  return (
    <>
      <h1>Create a new Flow</h1>

      {flows.map((flow) => (
        <FlowCard
          key={flow.id}
          name={flow.name}
          hours={flow.duration.hours}
          minutes={flow.duration.minutes}
          id={flow.id}
        />
      ))}
      {open && (
        <CreateFlowForm
          setFlows={setFlows}
          flows={flows}
          setOpen={setOpen}
          addFlow={addFlow}
        />
      )}
      <StyledAddButton onClick={toggleOpen}>{open ? "x" : "+"}</StyledAddButton>
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
