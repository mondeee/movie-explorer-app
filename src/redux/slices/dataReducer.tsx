import {Movie} from '@/types/movie.interface';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState = {
  movies: [] as Movie[],
  favorite_movies: [] as Movie[],
  genres: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    setMovies: (state, {payload}) => {
      state.movies = payload;
    },
    setFavoriteMovies: (state, {payload}) => {
      state.favorite_movies = payload;
    },
    addToFavorites: (state, action: PayloadAction<Movie>) => {
      const payload = action.payload;
      const index = state.favorite_movies.findIndex(
        movie => movie.trackId === payload.trackId,
      );
      if (index === -1) {
        state.favorite_movies.push(payload);
      } else {
        state.favorite_movies[index] = {
          ...state.favorite_movies[index],
          isFavorite: !state.favorite_movies[index].isFavorite,
        };
      }
    },
    removeFavoriteItem: (state, action: PayloadAction<Movie>) => {
      const payload = action.payload;
      const index = state.favorite_movies.findIndex(
        movie => movie.trackId === payload.trackId,
      );
      if (index !== -1) {
        state.favorite_movies.splice(index, 1);
      }
    },
    clearFavorites: state => {
      state.favorite_movies = [];
    },
  },
});

export const dataReducer = dataSlice.reducer;
export const {
  setMovies,
  setFavoriteMovies,
  removeFavoriteItem,
  addToFavorites,
  clearFavorites,
} = dataSlice.actions;
