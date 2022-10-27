import { nanoid } from "nanoid";

export default function CreateFlowForm({ flows, setFlows }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { name, duration } = Object.fromEntries(formData);

    setFlows([
      ...flows,
      {
        id: nanoid(),
        name: name,
        asanas: [],
        duration: duration,
        description: "",
      },
    ]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="flow-name">Name:</label>
      <input type="text" id="flow-name" name="name" />

      <label>Duration</label>
      <input type="time" id="duration" name="duration" />

      <button>Add</button>
    </form>
  );
}
