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
            <TouchableOpacity onPress={logout}>
              <Image
                style={tw.style("h-10 w-10 rounded-full")}
                source={{
                  uri: "https://img.freepik.com/free-icon/user_318-159711.jpg",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
              <Image
                style={tw.style("h-14 w-14")}
                // source={require("../assets/logo.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
              <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
            </TouchableOpacity>
          </View>
          <View style={tw.style("flex-1 -mt-6")}>
            <Swiper
              ref={swipeRef}
              containerStyle={{
                backgroundColor: "transparent",
              }}
            //   cards={BIG_BANG_DATA}
              stackSize={5}
              cardIndex={0}
              animateCardOpacity
              verticalSwipe={false}
              onSwipedLeft={(index) => console.log(index)}
              onSwipedRight={match}
              overlayLabels={{
                left: {
                  title: "NOPE",
                  style: {
                    label: {
                      textAlign: "right",
                      color: "red",
                    },
                  },
                },
                right: {
                  title: "LIKE",
                  style: {
                    label: {
                      textAlign: "left",
                      color: "green",
                    },
                  },
                },
              }}
              renderCard={(card) => {
                return card ? (
                  <View
                    key={card.id}
                    style={tw.style("bg-white h-3/4 rounded-xl relative")}
                  >
                    <Image
                      style={tw.style("absolute top-0 h-full w-full rounded-xl")}
                      source={{ uri: card.photoURL }}
                    />
                    <View
                      style={tw.style(
                        "absolute bottom-0 bg-white w-full h-20 justify-between items-center flex-row px-6 py-2 rounded-b-xl shadow-xl"
                      )}
                    >
                      <View>
                        <Text style={tw.style("text-xl font-bold")}>
                          {card.displayName}
                        </Text>
                        <Text>{card.job}</Text>
                      </View>
                      <Text style={tw.style("text-xl font-bold")}>{card.age}</Text>
                    </View>
                  </View>
                ) : (
                  <View
                    style={tw.style(
                      "relative bg-white h-3/4 rounded-xl justify-center items-center shadow-xl"
                    )}
                  >
                    <Text style={tw.style("font-bold pb-5")}>No more profiles</Text>
                    <Image
                      style={tw.style("h-20 w-20")}
                      source={{
                        uri: "https://cdn.shopify.com/s/files/1/1061/1924/products/Crying_Face_Emoji_large.png?v=1571606037",
                      }}
                    />
                  </View>
                );
              }}
            />
          </View>
          <View style={tw.style("flex flex-row justify-evenly")}>
            <TouchableOpacity
              onPress={() => swipeRef.current.swipeLeft()}
              style={tw.style(
                "items-center justify-center rounded-full w-16 h-16 bg-red-200"
              )}
            >
              <Entypo name="cross" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => swipeRef.current.swipeRight()}
              style={tw.style(
                "items-center justify-center rounded-full w-16 h-16 bg-green-200"
              )}
            >
              <Entypo name="heart" size={24} color="green" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    };

export default HomeScreen;
