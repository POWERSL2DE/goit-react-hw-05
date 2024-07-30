import css from './MovieCard.module.css';

export default function MovieCard({
  movie: { title, poster_path, vote_average },
}) {
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';
  return (
    <>
      <img
        src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : defaultImg}
        alt={`${title} poster`}
        width={280}
      />
      <p className={css.rating}>{Math.floor(vote_average)} / 10 ⭐</p>
    </>
  );
}