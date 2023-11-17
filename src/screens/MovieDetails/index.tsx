import Header from '@/components/Header';
import COLORS from '@/constants/Colors';
import {MainStackParamList} from '@/navigation/MainStack';
import {addToFavorites, removeFavoriteItem} from '@/redux/slices/dataReducer';
import {Movie} from '@/types/movie.interface';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

type MovieDetailsProps = NativeStackScreenProps<
  MainStackParamList,
  'MovieDetails'
> & {
  data: Movie | undefined;
};

export default function MovieDetailsScreen(
  props: MovieDetailsProps,
): JSX.Element {
  const dispatch = useDispatch();
  const {data} = props?.route?.params;
  const [item, setItem] = useState(data);

  useEffect(() => {
    console.log(data);
  }, []);

  const _onAddToFavorites = () => {
    const tempItem = {...item, isFavorite: !item.isFavorite};
    if (!item.isFavorite) {
      dispatch(addToFavorites(tempItem));
    } else {
      dispatch(removeFavoriteItem(item));
    }
    setItem(tempItem);
  };

  return (
    <View className="flex-1 bg-primary_bg">
      <Header headerTitle="Details" />
      <View className="flex items-center bg-primary_bg">
        <Image
          source={{uri: item.artworkUrl100}}
          resizeMode={'contain'}
          style={{height: 150, aspectRatio: 1 / 1}}
          className="rounded-md m-4"
        />
        <View className="flex-row flex-grow justify-center items-center">
          <Text className="text-white justify-self-start font-bold text-xl mx-4">
            {item?.trackName}
          </Text>
          <TouchableOpacity onPress={() => _onAddToFavorites()}>
            <Icon
              name={item?.isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={COLORS.PRIMARY_COLOR}
            />
          </TouchableOpacity>
        </View>
        <Text className="text-primary my-2 font-bold text-lg">{`$${item?.trackPrice}`}</Text>
        <View className="flex-row items-center">
          <View className="flex bg-input_gray rounded-lg items-center m-4">
            <Text className="flex-none p-2 text-secondary font-bold">
              {item?.primaryGenreName}
            </Text>
          </View>
        </View>
        <Text className="flex-none p-2 text-white text-m m-4">
          {item?.longDescription}
        </Text>
      </View>
    </View>
  );
}
