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
>;

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

  const renderFooter = () => {
    return (
      <View className="absolute bottom-5 flex flex-row self-center justify-around">
        {/* <Text className="text-primary my-2 font-bold text-lg">{`$${item?.trackPrice}`}</Text> */}
        <TouchableOpacity className="bg-secondary p-4 rounded-full">
          <Text className="text-white font-medium text-lg">
            {'Buy now for '}
            <Text className="text-input_gray my-2 font-bold text-lg">{`$${item?.trackPrice}`}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-primary_bg">
      <Header headerTitle="Details" />
      <View className="flex justify-items bg-primary_bg p-8">
        <Image
          source={{uri: item.artworkUrl100}}
          resizeMode={'contain'}
          style={{height: 150, aspectRatio: 1 / 1}}
          className="flex rounded-md m-4 self-center"
        />
        <View className="flex-row flex-grow justify-between items-center mt-4">
          <Text className="text-white self-center font-bold text-xl">
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
        {/* <Text className="text-primary my-2 font-bold text-lg">{`$${item?.trackPrice}`}</Text> */}
        <View className="flex-row items-center">
          <View className="flex bg-input_gray rounded-lg items-center my-4">
            <Text className="flex-none p-2 text-secondary font-bold">
              {item?.primaryGenreName}
            </Text>
          </View>
        </View>
        <Text className="text-white justify-self-start font-bold text-lg">
          Description
        </Text>
        <Text className="flex-none text-white text-m my-2">
          {item?.longDescription}
        </Text>
      </View>
      {renderFooter()}
      <View />
    </View>
  );
}
