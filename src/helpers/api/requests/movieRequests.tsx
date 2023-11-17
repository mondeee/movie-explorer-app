import axios from 'axios';
import {Movie} from '@/types/movie.interface';

type GetMovieResponse = {
  resultCount: Number;
  results: Movie[];
};

export default async function getMovies() {
  try {
    // 👇️ const data: GetMovieResponse
    const {data, status} = await axios.get<GetMovieResponse>(
      'https://itunes.apple.com/search?term=star&amp;country=au&amp;media=movie&amp;all',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    console.log(JSON.stringify(data, null, 4));
    console.log('response status is: ', status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return Promise.reject('error message: ' + error.message);
    } else {
      console.log('unexpected error: ', error);
      return Promise.reject('An unexpected error occurred');
    }
  }
}
