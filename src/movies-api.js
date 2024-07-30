import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export default async function fetchData(endpoint, query = {}) {
  const response = await axios.get(endpoint, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWY1NzY2MTg5MTg0ZDAyMTc4ZDQ1YTA4YTY0MjdjOSIsInN1YiI6IjY1ZWRmN2M3YTliOWE0MDE2NGQ1OGU3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fGU9I9jYSggrc10jKyE1rX9L6Klj1YuobKvmS5ya-o8',
    },
    params: {
      query,
    },
  });

  return response.data;
}