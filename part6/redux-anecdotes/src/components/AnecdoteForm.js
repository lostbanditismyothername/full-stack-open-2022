import { useDispatch } from "react-redux";
import { addNew } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnecdote = (e) => {
    e.preventDefault();
    const content = e.target[0].value;
    dispatch(addNew(content));
    e.target[0].value = "";
  };
  return (
    <form onSubmit={addNewAnecdote}>
      <div>
        <input type="text" name="anecdote" />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
