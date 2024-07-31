import css from './SearchBar.module.css';
import { useSearchParams } from 'react-router-dom';

export default function SearchBar() {
  const [params, setParams] = useSearchParams();
  const queryFilter = params.get('query') ?? '';

  

  const hundleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const value = e.target.search.value.trim();
    params.set('query', value);
    setParams(params);
    
    form.reset();
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={hundleSubmit}>

        <h2 className={css.title}>
          <i>Search for movie information and enjoy a new experience!</i>
        </h2>

        <label>
          <input
            className={css.input}
            type="text"
            name="search"
            autoFocus
            placeholder="Enter the movie title"
            defaultValue={queryFilter}
          />
        </label>
        <button className={css.searchButton} type='submit'>Search</button>
      </form>
    </div>
  );
}