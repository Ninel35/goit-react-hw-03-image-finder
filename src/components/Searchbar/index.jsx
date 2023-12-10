
export const Searchbar = ({handleSubmit}) => {

      return (
        <header className="searchbar">
          <form onSubmit={handleSubmit} className="form">
            <button type="submit" className="button" >
              <span className="button-label">Search</span>
            </button>

            <input
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              name="search"
            />
          </form>
        </header>
      );
    }


