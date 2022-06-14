const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} pt={part} />
      ))}
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
    return prev + cur.exercises;
  }, 0);
  return <p>Number of exercises: {sum} </p>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
