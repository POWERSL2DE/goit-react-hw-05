import css from './MovieList.module.css';
import MovieCard from '../MovieCard/MovieCard';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li className={css.item} key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <h2 className={css.title}>{movie.title}</h2>
            <MovieCard movie={movie} />
          </Link>
        </li>
      ))}
    </ul>
  );
}