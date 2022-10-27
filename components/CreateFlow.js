import { nanoid } from "nanoid";

export default function CreateFlowForm({ flows, setFlows }) {
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
      <input type="text" id="flow-name" name="name" />
      <fieldset>
        <legend>Duration</legend>
        <label>Hours</label>
        <input type="time" id="hours" name="hours" />
        <label>Minutes</label>
        <input type="time" id="min" name="minutes" />
      </fieldset>
      <button>Add</button>
    </form>
  );
}
