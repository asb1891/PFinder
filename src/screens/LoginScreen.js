import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../database/firebase';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState(''); //Email input
  const [password, setPassword] = useState(''); //Password input
  const [loading, setLoading] = useState(false); //Loading indicator
  const navigation = useNavigation(); //Pass the navigation function to the useNavigation hook


  const auth = FIREBASE_AUTH; //Get the auth object from the database; 

  //Handle the login button press
  const handleLogin = async () => {
    setLoading(true);
    try {
      // Sign in with email and password
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      // Navigate to the home screen
      navigation.navigate('Home');
      console.log("navigating")
    } catch (error) {
      console.log("navigation error");;
    } finally {
      setLoading(false);
    }
  };
  //Handle the sign up button press
  const signUp = async () => {
    setLoading(true);
    try {
      // Sign up with email and password
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Sign Up Success');
      navigation.navigate('Home');
      console.log(navigation)
    } catch (error) {
      console.log(error);
      alert('Sign Up Failed' + error.message);
    } finally {
      setLoading(false);
    }
  };
  



  return (
    <View style={styles.container}>
      <Image source={require('../../assets/PetSwipeLogo.png')} style={styles.logo} />
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
      <Button title="Login" onPress={handleLogin} />
      <Button 
      title = "Create Account"
        style={styles.signUp}
        onPress={signUp}>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  forgotPassword: {
    marginTop: 10,
    color: 'blue',
  },
  signUp: {
    marginTop: 10,
    color: 'red'
  }
});

export default LoginScreen;
