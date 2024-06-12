import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../database/firebase";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState(""); //Email input
  const [password, setPassword] = useState(""); //Password input
  const [loading, setLoading] = useState(false); //Loading indicator
  const navigation = useNavigation(); //Pass the navigation function to the useNavigation hook

  const auth = FIREBASE_AUTH; //Get the auth object from the database;

  //Handle the login button logic
  const handleLogin = async () => {
    setLoading(true);
    try {
      // Sign in with email and password
      const response = await signInWithEmailAndPassword(auth, email, password); //Sign in with email and password
      console.log(response);
      // Navigate to the home screen
      navigation.navigate("Home"); //Navigate to the home screen
      console.log("navigating");
    } catch (error) {
      console.log("navigation error");
    } finally {
      setLoading(false);
    }
  };
  //Handle the sign up button press
  const signUp = async () => {
    setLoading(true);
    try {
      // Sign up with email and password
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ); //Sign up with email and password
      console.log(response);
      alert("Sign Up Success");
      navigation.navigate("Home"); //Navigate to the home screen
      console.log(navigation);
    } catch (error) {
      console.log(error);
      alert("Sign Up Failed" + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/PetSwipeLogo.png")}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <View>
        <TouchableOpacity
          className="bg-yellow-400 p-3 rounded-lg mt-6 items-center"
          onPress={handleLogin}
        >
          <Text className="text-white text-lg">Login</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          className="bg-blue-500 p-3 rounded-lg mt-6 items-center"
          onPress={signUp}
        >
          <Text className="text-white text-lg">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  forgotPassword: {
    marginTop: 10,
    color: "blue",
  },
  signUp: {
    marginTop: 10,
    color: "red",
  },
});

export default LoginScreen;
