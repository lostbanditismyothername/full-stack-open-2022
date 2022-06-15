import Person from "./Person";

const Persons = ({ filteredPersons, handleRemove }) => {
  return filteredPersons.map((person) => (
    <Person key={person.id} handleDelete={() => handleRemove(person.id)} person={person} />
  ));
};

export default Persons;
