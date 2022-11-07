export default function testForm() {
  async function handleSubmit(data) {
    try {
      const response = await fetch("/api/flows", {
        method: "POST",
        body: JSON.stringify(data),
      });
      console.log(data);
      const result = await response.json();
      console.log(result);
      if (result.name) {
        alert("Flow has been created");
      } else {
        alert("Creating a flow did not work!!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const data = {
      name: name,
      description: "test",
      duration: {
        hours: 1,
        minutes: 10,
      },
      asanas: [],
    };

    handleSubmit(data);
  }

  return (
    <form onSubmit={onSubmit} role="form">
      <label htmlFor="flow-name">Name:</label>
      <input
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
      />

      <button aria-label="save" role="button">
        Save
      </button>
    </form>
  );
}
