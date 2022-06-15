import { useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("a new name");
  const [newNumber, setNewNumber] = useState("a new number");
  const [filter, setFilter] = useState("");

  // create a new person instance
  const addPerson = (e) => {
    e.preventDefault();

    const isNameUnique = persons.every((person) => person.name !== newName);

    isNameUnique
      ? setPersons((persons) => [...persons, { name: newName, number: newNumber }])
      : alert(`${newName} already exists!`);

    setNewName("");
    setNewNumber("");
  };

  // filter people by name
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  // form input handlers
  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewNumber(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
