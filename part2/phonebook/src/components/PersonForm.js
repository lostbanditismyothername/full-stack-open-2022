const PersonForm = ({ addPerson, newName, newNumber, handleNameChange, handlePhoneChange }) => {
  return (
    <form onSubmit={addPerson}>
      <h3>Add a new</h3>
      <div>
        name:{" "}
        <input placeholder="a new name..." value={newName} onChange={handleNameChange} required />
      </div>
      <div>
        number:{" "}
        <input placeholder="a new number" value={newNumber} onChange={handlePhoneChange} required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
