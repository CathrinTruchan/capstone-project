import { nanoid } from "nanoid";
import { useState } from "react";
import styled from "styled-components";

export default function CreateFlowForm({ flows, setFlows, setOpen }) {
  const [hoursValidation, setHoursValidation] = useState(0);

  function handleHoursValidation(event) {
    setHoursValidation(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const { hours, minutes } = data;
    const name = data.name.trim();

    if (name.length === 0) {
      alert("Please enter a valid name");
    } else
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
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel htmlFor="flow-name">Name:</StyledLabel>
      <StyledInput
        width="10rem"
        type="text"
        id="flow-name"
        name="name"
        minLength="5"
        required
      />
      <StyledFieldset>
        <section>
          <StyledLabel htmlFor="hours">Hours</StyledLabel>
          <StyledInput
            width="3rem"
            type="number"
            id="hours"
            name="hours"
            min="0"
            max="2"
            onChange={handleHoursValidation}
          />
        </section>
        <section>
          <StyledLabel htmlFor="minutes">Minutes</StyledLabel>
          <StyledInput
            width="3rem"
            type="number"
            id="minutes"
            name="minutes"
            min={hoursValidation === "0" ? "10" : "0"}
            max="59"
          />
        </section>
      </StyledFieldset>
      <StyledSubmitButton>Add</StyledSubmitButton>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  background-color: var(--primary-light);
  padding: 1rem 0;
  margin: 0 2rem -3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 22px;
  box-shadow: var(--drop-shadow-gray);
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
  font-size: var(--font-small);
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
  font-size: var(--font-small);
`;

const StyledLabel = styled.label`
  font-size: var(--font-small);
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
