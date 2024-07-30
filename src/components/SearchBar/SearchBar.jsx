import css from './SearchBar.module.css';
import { useSearchParams } from 'react-router-dom';

export default function SearchBar() {
  const [params, setParams] = useSearchParams();
  const queryFilter = params.get('query') ?? '';

  const changeMovieFilter = newFilter => {
    params.set('query', newFilter.trim());
    setParams(params);
  };

  const hundleSubmit = e => {
    e.preventDefault();
    const form = e.target;

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
            value={queryFilter}
            onChange={e => changeMovieFilter(e.target.value)}
          />
        </label>
        
      </form>
    </div>
  );
}