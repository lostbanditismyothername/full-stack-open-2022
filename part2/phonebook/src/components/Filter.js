const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      filter shown with: <input placeholder="search.." onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
