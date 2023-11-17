import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '@/screens/HomeScreen';
import MovieDetailsScreen from '@/screens/MovieDetails';
import {Movie} from '@/types/movie.interface';
import FavoriteScreen from '@/screens/FavoriteScreen';
import SearchScreen from '@/screens/SearchScreen';

export type MainStackParamList = {
  Splash: undefined;
  Home: undefined;
  MovieDetails: {data: Movie};
  Favorites: undefined;
  Search: undefined;
};

export default function MainStack(): JSX.Element {
  const Stack = createNativeStackNavigator<MainStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      <Stack.Screen name="Favorites" component={FavoriteScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
