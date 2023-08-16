const Form = ({ searchInput, handleChange, handleSubmit }) => (
  <form className="header" onSubmit={handleSubmit}>
    <i className="fa-solid fa-location-dot" />
    <input type="text" className="search-input" placeholder="Tap to search" value={searchInput} onChange={handleChange} />
    <button type="submit">
      <i className="fa-solid fa-magnifying-glass"></i>
    </button>
  </form>
);

export default Form;
