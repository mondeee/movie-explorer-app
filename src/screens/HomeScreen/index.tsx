import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '@/navigation/MainStack';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {Movie} from '@/types/movie.interface';
import {FlashList} from '@shopify/flash-list';
import COLORS from '@/constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {addToFavorites, removeFavoriteItem} from '@/redux/slices/dataReducer';
import Header from '@/components/Header';
import {useIsFocused} from '@react-navigation/native';
import {updateLocalData} from '@/helpers/data/data_helper';

type HomeScreenProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

interface DataListState {
  data: {
    movies: [Movie];
    favorite_movies: [Movie];
  };
}
export const useTypedListSelector: TypedUseSelectorHook<DataListState> =
  useSelector;

export default function HomeScreen(props: HomeScreenProps): JSX.Element {
  const {
    navigation: {navigate},
  } = props;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [showSearchBar, setShowSearchBar] = useState<Boolean>(false);
  const [isDataLoading, setDataLoading] = useState(false);
  const movies = useTypedListSelector(state => state.data.movies);
  const favorite_movies = useTypedListSelector(
    state => state.data.favorite_movies,
  );
  const [searchInput, setSearchInput] = useState('');
  const [localData, setLocalData] = useState<Movie[]>(movies);

  useEffect(() => {
    const newArr = updateLocalData(movies, favorite_movies);
    setLocalData(newArr);
    setShowSearchBar(false);
  }, [isFocused]);

  useEffect(() => {
    setTimeout(() => {
      const tempArr = [...movies];
      if (searchInput && searchInput?.length > 2) {
        setDataLoading(true);
        const lowerCaseSearch = searchInput.toLowerCase();
        const filteredArr = tempArr.filter(i =>
          i.trackName?.toLowerCase().includes(lowerCaseSearch),
        );
        const finalArr = updateLocalData(filteredArr, favorite_movies);
        setLocalData(finalArr);
      } else {
        const finalArr = updateLocalData(movies, favorite_movies);
        setLocalData(finalArr);
      }
      setDataLoading(false);
    }, 1000);
  }, [searchInput]);

  const _onAddToFavorites = (item: Movie) => {
    const tempArr = [...localData];
    const tempItem = {...item, isFavorite: !item.isFavorite};
    if (!item?.isFavorite) {
      dispatch(addToFavorites(tempItem));
    } else {
      dispatch(removeFavoriteItem(item));
    }
    const index = tempArr.findIndex(i => i.trackId === item.trackId);
    if (index !== -1) {
      tempArr[index] = {
        ...tempArr[index],
        isFavorite: !tempArr[index].isFavorite,
      };
      setLocalData(tempArr);
    }
  };

  const renderLeftHeaderButton = () => {
    return (
      <TouchableOpacity onPress={() => navigate('Favorites')}>
        <Icon name="heart" size={24} color={COLORS.PRIMARY_COLOR} />
      </TouchableOpacity>
    );
  };

  const renderRightHeaderButton = () => {
    return (
      <TouchableOpacity onPress={() => setShowSearchBar(!showSearchBar)}>
        <Icon name="search" size={24} color={COLORS.PRIMARY_COLOR} />
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <Header
        headerTitle={'Home'}
        renderLeftButton={renderLeftHeaderButton}
        renderRightButton={renderRightHeaderButton}
      />
    );
  };

  const renderSearchBar = () => {
    return (
      <View className="flex-row mb-4 p-4 bg-gray mx-4 rounded-md items-center">
        <Icon name="search" size={24} color={COLORS.PRIMARY_COLOR} />
        <TextInput
          onChangeText={setSearchInput}
          autoCapitalize={'none'}
          className="flex-1 ml-4 text-white"
          placeholder="Search movies..."
        />
        <TouchableOpacity className="rounded-md p-1 items-center justify-center bg-secondary">
          <Text className="text-input_gray p-1 text-center">Search</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderList = () => {
    if (isDataLoading) {
      return (
        <View className="flex-1 py-40">
          <ActivityIndicator color={COLORS.PRIMARY_COLOR} />
        </View>
      );
    }

    return (
      <FlashList
        renderItem={renderMovieItem}
        extraData={localData}
        data={localData}
        estimatedItemSize={50}
        ListEmptyComponent={renderEmpty}
      />
    );
  };

  const renderEmpty = () => {
    return (
      <View className="center items-center justify-center">
        <Text className="text-white text-center font-md text-lg">
          {`no items found for "${searchInput}".`}
        </Text>
      </View>
    );
  };

  const renderMovieItem = ({item}: {item: Movie}) => {
    return (
      <TouchableOpacity
        onPress={() => navigate('MovieDetails', {data: item})}
        className="flex-row m-4 my-8">
        <Image
          source={{uri: item.artworkUrl100}}
          resizeMode={'stretch'}
          style={{height: 100, aspectRatio: 1 / 1}}
          className="rounded-md mr-4"
        />
        <View className="flex-auto pr-8">
          <Text className="text-white font-medium mb-1">
            {item.trackName || item?.collectionName}
          </Text>
          <Text numberOfLines={2} className="text-white">
            {item.shortDescription}
          </Text>
          <Text className="text-primary my-2 font-bold text-lg">{`$${item?.trackPrice}`}</Text>
          <View className="flex-row items-center">
            <View className="flex-auto bg-input_gray rounded-lg items-center">
              <Text className="flex-none p-2 text-secondary font-bold">
                {item?.primaryGenreName}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => _onAddToFavorites(item)}
              className="mx-4">
              <Icon
                name={item?.isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={COLORS.PRIMARY_COLOR}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-primary_bg">
      {renderHeader()}
      {showSearchBar && renderSearchBar()}
      {renderList()}
    </View>
  );
}
