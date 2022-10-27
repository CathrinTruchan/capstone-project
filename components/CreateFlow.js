import { nanoid } from "nanoid";
import { useState } from "react";

export default function CreateFlowForm({ flows, setFlows }) {
  const [hoursValidation, setHoursValidation] = useState(0);

  function handleHoursValidation(event) {
    setHoursValidation(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { name, hours, minutes } = Object.fromEntries(formData);

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
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="flow-name">Name:</label>
      <input type="text" id="flow-name" name="name" required />
      <fieldset>
        <legend>Duration</legend>
        <label htmlFor="hours">Hours</label>
        <input
          type="number"
          id="hours"
          name="hours"
          min="0"
          max="3"
          onChange={handleHoursValidation}
        />
        <label htmlFor="minutes">Minutes</label>
        <input
          type="number"
          id="minutes"
          name="minutes"
          min={hoursValidation === "0" ? "10" : "0"}
          max="59"
        />
      </fieldset>
      <button>Add</button>
    </form>
  );
}
