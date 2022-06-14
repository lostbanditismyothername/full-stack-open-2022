const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  const [pt1, pt2, pt3] = parts;
  return (
    <div>
      <Part pt={pt1} />
      <Part pt={pt2} />
      <Part pt={pt3} />
    </div>
  );
};

const Part = ({ pt }) => (
  <p>
    {pt["name"]}: {pt["exercises"]}
  </p>
);

const Total = ({ parts }) => {
  const sum = parts.reduce((prev, cur) => {
    console.log(prev);
    console.log(cur);
    return prev + cur.exercises;
  }, 0);
  return <p>Number of exercises: {sum} </p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
