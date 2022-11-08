import { useState } from "react";
import styled from "styled-components";

export default function CreateFlowForm({
  flows,
  addFlow,
  defaultName,
  defaultHours,
  defaultMinutes,
  editFlowBasicData,
  editFormId,
  cancelEditFlow,
  closeForm,
  handleFlowPost,
  handleFlowUpdate,
  id,
}) {
  const [hours, setHours] = useState("0");

  function handleHoursValidation(event) {
    setHours(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const { hours, minutes } = data;
    const name = data.name.trim();

    const flowData = {
      id: id,
      name: name,
      description: "",
      duration: {
        hours: hours,
        minutes: minutes,
      },
      asanas: [],
    };

    if (name.length === 0) {
      alert("Please enter a valid name");
    } else if (
      flows.some((flow) => flow.name.toLowerCase() === name.toLowerCase()) &&
      defaultName != name
    ) {
      alert("Name exists already. Please enter a new name.");
    } else if (editFormId != null) {
      handleFlowUpdate(flowData);
      //editFlowBasicData(name, hours, minutes, editFormId);
    } else handleFlowPost(flowData);
    //addFlow(name, hours, minutes);
  }

  return (
    <StyledOverlayBackground>
      <StyledForm onSubmit={onSubmit} role="form">
        <StyledLabel htmlFor="flow-name">Name:</StyledLabel>
        <StyledInput
          aria-label="name"
          role="input"
          width="10rem"
          type="text"
          id="flow-name"
          name="name"
          minLength="5"
          maxLength="50"
          required
          autoFocus
          defaultValue={defaultName}
        />
        <StyledFieldset>
          <section>
            <StyledLabel htmlFor="hours">Hours</StyledLabel>
            <StyledInput
              aria-label="hours"
              role="input"
              width="3rem"
              type="number"
              id="hours"
              name="hours"
              min="0"
              max="2"
              onChange={handleHoursValidation}
              defaultValue={defaultHours}
            />
          </section>
          <section>
            <StyledLabel htmlFor="minutes">Minutes</StyledLabel>
            <StyledInput
              aria-label="minutes"
              role="input"
              width="3rem"
              type="number"
              id="minutes"
              name="minutes"
              min={hours === "0" ? "10" : "0"}
              max="59"
              defaultValue={defaultMinutes}
            />
          </section>
        </StyledFieldset>
        <StyledSubmitButton aria-label="save" role="button">
          Save
        </StyledSubmitButton>
        {editFormId != null ? (
          <StyledCancelButton onClick={cancelEditFlow}>
            Cancel
          </StyledCancelButton>
        ) : (
          <StyledCancelButton
            aria-label="cancel"
            role="button"
            onClick={closeForm}
          >
            Cancel
          </StyledCancelButton>
        )}
      </StyledForm>
    </StyledOverlayBackground>
  );
}

const StyledForm = styled.form`
  background: var(--primary-gradient);
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 22px;
  box-shadow: var(--drop-shadow-gray);
  position: absolute;
  width: 80%;
  top: 20%;
  left: 10%;
`;

const StyledInput = styled.input`
  all: unset;
  display: block;
  color: var(--text-dark);
  width: ${(props) => props.width};
  height: 1rem;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  border: none;
  background-color: var(--background-neutral);
  margin: 1rem 0;
  box-shadow: var(--drop-shadow-gray);

  &:focus {
    box-shadow: none;
    border: 1px solid var(--highlight);
    background-color: var(--background-primary);
  }
`;

const StyledFieldset = styled.fieldset`
  all: unset;
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

const StyledLabel = styled.label`
  color: var(--text-light);
`;

const StyledSubmitButton = styled.button`
  width: 12rem;
  display: block;
  padding: 0.5rem 1.5rem;
  border-radius: 12px;
  border: none;
  margin: 1rem 0;
  cursor: pointer;
  box-shadow: var(--drop-shadow-gray);
  color: var(--text-light);
  background: var(--highlight-gradient);
  &:hover {
    background: var(--highlight);
  }
`;

const StyledCancelButton = styled.button`
  width: 12rem;
  display: block;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 12px;
  margin: 0.5rem 0;
  cursor: pointer;
  box-shadow: var(--drop-shadow-gray);
  color: var(--highlight);
  background: var(--background-neutral);
`;

const StyledOverlayBackground = styled.section`
  width: 100%;
  height: 100%;
  background: rgba(245, 245, 245, 0.6);
  backdrop-filter: blur(5.4px);
  -webkit-backdrop-filter: blur(5.4px);
  z-index: 50;
  position: fixed;
  top: 0;
  left: 0;
`;
