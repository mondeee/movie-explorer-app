import getMovies from '@/helpers/api/requests/movieRequests';
import {clearFavorites, setMovies} from '@/redux/slices/dataReducer';
import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import COLORS from '../../constants/Colors';
import {MainStackParamList} from '@/navigation/MainStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Movie} from '@/types/movie.interface';
import {updateLocalData} from '@/helpers/data/data_helper';

type SplashScreenProps = NativeStackScreenProps<MainStackParamList, 'Splash'>;

interface DataListState {
  data: {
    movies: [Movie];
    favorite_movies: [Movie];
  };
}
export const useTypedListSelector: TypedUseSelectorHook<DataListState> =
  useSelector;

export default function SplashScreen(props: SplashScreenProps): JSX.Element {
  const dispatch = useDispatch();
  const favorite_movies = useTypedListSelector(
    state => state.data.favorite_movies,
  );
  useEffect(() => {
    // dispatch(clearFavorites());
    const fetchData = async () => {
      try {
        const movieData = await getMovies();
        const tempArr: Movie[] = [...movieData.results];
        tempArr.forEach(i => (i.isFavorite = false));
        const finalArr = updateLocalData(tempArr, favorite_movies);
        dispatch(setMovies(finalArr));
        props.navigation.navigate('Home');
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-primary_bg">
      <Text className="text-white font-medium text-2xl">{'F MOVIES'}</Text>
      <ActivityIndicator className="m-4" color={COLORS.PRIMARY_COLOR} />
    </View>
  );
}
