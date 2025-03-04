import fetchData from '../../movies-api';
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [params] = useSearchParams();

  const queryFilter = params.get('query') ?? '';

  useEffect(() => {
    if (!queryFilter) return;

    const getData = async () => {
      try {
        setLoading(true);
        setError(false);
        setMovies([]);
        const data = await fetchData('/search/movie', queryFilter);

        if (data.results.length === 0 && queryFilter !== '') {
          toast.error('No results!');
          return;
        }

        setMovies(data.results);
      } catch (error) {
        toast.error('Error! Please reload the page.');
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [queryFilter]);

  return (
    <>
      <SearchBar />
      {loading && <Loader />}

      {error && (
        <ErrorMessage>
          Something went wrong! Please reload the page 🚩
        </ErrorMessage>
      )}

      <MovieList movies={movies} />
      <Toaster />
    </>
  );
}