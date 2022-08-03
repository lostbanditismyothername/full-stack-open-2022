import { incrementBad, incrementGood, incrementOk, resetStats } from "./actions";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state);

  return (
    <div>
      <button onClick={() => dispatch(incrementGood())}>good</button>
      <button onClick={() => dispatch(incrementOk())}>ok</button>
      <button onClick={() => dispatch(incrementBad())}>bad</button>
      <button onClick={() => dispatch(resetStats())}>reset stats</button>
      <div>good {stats.good}</div>
      <div>ok {stats.ok}</div>
      <div>bad {stats.bad}</div>
    </div>
  );
};

export default App;
