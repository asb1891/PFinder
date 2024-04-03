import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../database/firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(''); //Email input
  const [password, setPassword] = useState(''); //Password input
  const [loading, setLoading] = useState(false); //Loading indicator

  const auth = FIREBASE_AUTH; //Get the auth object from the database

  //Handle the login button press
  const handleLogin = async () => {
    setLoading(true);
    try {
      // Sign in with email and password
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      // Navigate to the home screen
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);;
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
    } catch (error) {
      console.log(error);
      alert('Sign Up Failed' + error.message);
    } finally {
      setLoading(false);
    }
  };
  



  return (
    <View style={styles.container}>
      <Text style={styles.logo}>PetSwipe</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
