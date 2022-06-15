import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import * as personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("a new name");
  const [newNumber, setNewNumber] = useState("a new number");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchPersons();

    async function fetchPersons() {
      const persons = await personServices.getAll();
      setPersons(persons);
    }
  }, []);

  // create a new person instance
  const addPerson = (e) => {
    e.preventDefault();

    const isNameUnique = persons.every((person) => person.name !== newName);
    const newEntryObj = { name: newName, number: newNumber };

    if (!isNameUnique) {
      const numberOfName = persons.find((person) => person.name === newName).number;
      if (numberOfName !== newNumber) {
        if (
          window.confirm(
            `${newName} is already in the phonebook. Replace the old number with a new one?`
          )
        ) {
          personServices.update(persons.find((person) => person.name === newName).id, newEntryObj);
          setPersons(persons.map((person) => (person.name === newName ? newEntryObj : person)));
        }
      } else {
        alert(`${newName} already exists with its number!`);
      }
    } else {
      personServices.create(newEntryObj).then((newPerson) => {
        setPersons([...persons, newPerson]);
      });
    }
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

  // delete person
  const handleRemove = (id) => {
    personServices.remove(id).then(() => {
      const confirm = window.confirm("Are you sure you want to delete this person?");
      return confirm ? setPersons(persons.filter((person) => person.id !== id)) : null;
    });
  };

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
      <Persons filteredPersons={filteredPersons} handleRemove={handleRemove} />
    </div>
  );
};

export default App;
