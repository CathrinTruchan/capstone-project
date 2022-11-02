import styled from "styled-components";
import { useState } from "react";
import CreateFlowForm from "../../components/CreateFlowForm";
import { nanoid } from "nanoid";
import FlowCard from "../../components/FlowCard";
import useLocalStorage from "../../hooks/useLocalStorage";
import { flowDummys } from "../../db";

export default function CreateFlow() {
  const [openForm, setOpenForm] = useState(false);
  const [editFormId, setEditFormId] = useState(null);
  const [flows, setFlows] = useLocalStorage("flows", flowDummys);

  function toggleOpenForm() {
    setOpenForm((prev) => (prev = !prev));
  }

  function addFlow(name, hours, minutes) {
    setFlows([
      ...flows,
      {
        id: nanoid(),
        name: name,
        duration: {
          hours: hours,
          minutes: minutes,
        },
        asanas: [],
      },
    ]);
    setOpenForm(false);
  }

  function deleteFlow(flowCardId) {
    setFlows(flows.filter((flow) => flow.id !== flowCardId));
  }

  function editFlowBasicData(
    updatedName,
    updatedHours,
    updatedMinutes,
    cardId
  ) {
    setFlows(
      flows.map((flow) =>
        flow.id === cardId
          ? {
              ...flow,
              name: updatedName,
              duration: { hours: updatedHours, minutes: updatedMinutes },
            }
          : flow
      )
    );
    setEditFormId(null);
  }

  function cancelEditFlow() {
    setEditFormId(null);
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
          deleteFlow={() => deleteFlow(flow.id)}
          setEditFormId={() => setEditFormId(flow.id)}
        />
      ))}
      {openForm && <CreateFlowForm flows={flows} addFlow={addFlow} />}
      {editFormId != null &&
        flows.map((flow) =>
          flow.id === editFormId ? (
            <CreateFlowForm
              editFormId={editFormId}
              defaultName={flow.name}
              defaultHours={flow.duration.hours}
              defaultMinutes={flow.duration.minutes}
              editFlowBasicData={(updatedName, updatedHours, updatedMinutes) =>
                editFlowBasicData(
                  updatedName,
                  updatedHours,
                  updatedMinutes,
                  flow.id
                )
              }
              cancelEditFlow={cancelEditFlow}
            />
          ) : (
            ""
          )
        )}
      <StyledAddButton onClick={toggleOpenForm}>
        {openForm ? "x" : "+"}
      </StyledAddButton>
    </>
  );
}

const StyledAddButton = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 2rem;
  z-index: 60;
  border: none;
  display: block;
  margin: 5rem auto;
  background: var(--highlight-gradient);
  box-shadow: var(--drop-shadow-gray);
  color: var(--text-light);
  font-size: 1.5rem;
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
