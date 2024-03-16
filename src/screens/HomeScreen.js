import { View, Text, TouchableOpacity, Image } from'react-native';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-deck-swiper';
import useAuth from '../../hooks/useAuth';
import tw from 'tailwind-react-native-classnames';

const HomeScreen = () => {
    const { user , logOut} = useAuth();
    const navigation = useNavigation();
    const swipeRef = useRef();

    return (
        <SafeAreaView style={tw.style("flex-1 mt-6")}>
          <View style={tw.style("flex-row items-center justify-between px-5")}>
         <Text>Petswipe!</Text>
          </View>
        </SafeAreaView>
      );
    };

export default HomeScreen;
