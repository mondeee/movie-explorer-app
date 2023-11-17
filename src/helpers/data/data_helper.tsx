import {Movie} from '@/types/movie.interface';

export const updateLocalData = (movies: Movie[], favorite_movies: Movie[]) => {
  const updatedLocalData = movies.map(item => {
    const matchingFavorite = favorite_movies.find(
      favItem => favItem.trackId === item.trackId,
    );
    return {
      ...item,
      isFavorite: matchingFavorite ? matchingFavorite.isFavorite : false,
    };
  });
  return updatedLocalData;
};
