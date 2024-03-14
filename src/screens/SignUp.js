import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';

export default function SignUp() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={styles.signUp}
                onPress={() => console.log('Pressed')}
            >
                <Text>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 10,
    },
    signUp: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 15,
        marginBottom: 10,
    },
});