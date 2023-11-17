import COLORS from '@/constants/Colors';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Headerprops {
  renderLeftButton?: () => JSX.Element;
  renderRightButton?: () => JSX.Element;
  headerTitle: string;
}

export default function Header(props: Headerprops): JSX.Element {
  const navigation = useNavigation();

  const renderBackButton = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color={COLORS.PRIMARY_COLOR} />
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-row justify-between items-center p-4">
      {props.renderLeftButton ? props.renderLeftButton() : renderBackButton()}
      <Text className="flex text-white text-2xl">{props.headerTitle}</Text>
      {props.renderRightButton ? (
        props.renderRightButton()
      ) : (
        <View className="mr-4" />
      )}
    </View>
  );
}
