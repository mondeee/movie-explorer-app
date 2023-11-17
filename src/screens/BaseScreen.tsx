import {MainStackParamList} from '@/navigation/MainStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

type BaseScreenProps = NativeStackScreenProps<MainStackParamList, 'Base'>;

interface DataListState {
  data: {
    sample: string;
  };
}

export const useTypedListSelector: TypedUseSelectorHook<DataListState> = useSelector;

export default function SplashScreen(props: BaseScreenProps): JSX.Element {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-black">{'BaseScreen'}</Text>
      </View>
    </SafeAreaView>
  );
}
