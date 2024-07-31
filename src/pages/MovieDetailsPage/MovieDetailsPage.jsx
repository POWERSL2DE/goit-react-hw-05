import css from './MovieDetailsPage.module.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import fetchData from '../../movies-api';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowLeftLong } from 'react-icons/fa6';
import clsx from 'clsx';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/');

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchData(`/movie/${movieId}`, movieId);
        setMovie(data);
      } catch (error) {
        toast.error('Error! Please reload the page.');
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <div className={css.wrapper}>
      <Link className={css.link} to={backLinkRef.current}>
        <FaArrowLeftLong /> Go back
      </Link>

      {loading && <Loader />}

      {error && (
        <ErrorMessage>
          Something went wrong! Please reload the page 🚩
        </ErrorMessage>
      )}

      <div className={css.container}>
        <img
          className={css.image}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : defaultImg
          }
          alt={`${movie.title} poster`}
        />
        <div className={css.description}>
          <h1 className={css.text}>{movie.title}</h1>
          {movie.tagline && (
            <p className={css.text}>
              <i>{`"${movie.tagline}"`}</i>
            </p>
          )}
          {movie.overview && (
            <p>
              <span className={css.span}>Overview:</span> {movie.overview}
            </p>
          )}

          {movie.genres && movie.genres.length > 0 && (
            <p>
              <span className={css.span}>Genres:</span>{' '}
              {movie.genres.map(genre => genre.name).join(', ')}
            </p>
          )}

          {movie.vote_average > 0 && (
            <p>
              <span className={css.span}>Average rating:</span>{' '}
              {Math.floor(movie.vote_average)} / 10 ⭐
            </p>
          )}

          {movie.vote_count > 0 && (
            <p>
              <span className={css.span}>Vote count:</span>{' '}
              {Math.floor(movie.vote_count)}
            </p>
          )}

          {movie.release_date && (
            <p>
              <span className={css.span}>Release date:</span>{' '}
              {movie.release_date}
            </p>
          )}

          {!loading && (
            <nav className={css.sabpages}>
              <NavLink
                className={({ isActive }) => {
                  return clsx(css.navLink, isActive && css.isActive);
                }}
                to="cast"
              >
                Cast
              </NavLink>
              <NavLink
                className={({ isActive }) => {
                  return clsx(css.navLink, isActive && css.isActive);
                }}
                to="reviews"
              >
                Reviews
              </NavLink>
            </nav>
          )}
        </div>
      </div>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>

      <Toaster />
    </div>
  );
}