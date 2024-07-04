import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert, Button, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import MySingleButton from "../components/MySingleButton";

const RegisterUser = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [CI, setCI] = useState('');
    const [FN, setFN] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const clearData = () => {
        setUserName("");
        setName("");
        setLastName("");
        setCI("");
        setFN(new Date());
    };

    const registerUser = async () => {
        if (!userName.trim() || !name.trim() || !lastName.trim() || !CI.trim() || !FN) {
            Alert.alert("Todos los campos son obligatorios");
            return;
        }

        try {
            const existingUser = await AsyncStorage.getItem(userName);
            if (existingUser !== null) {
                Alert.alert("Nombre de Usuario ya utilizado");
                return;
            }

            const user = { userName, name, lastName, CI, FN };
            await AsyncStorage.setItem(userName, JSON.stringify(user));
            clearData();
            Alert.alert(
                "Éxito",
                "Usuario registrado",
                [{ text: "OK", onPress: () => navigation.navigate("HomeScreen") }],
                { cancelable: false }
            );
        } catch (error) {
            console.error(error);
            Alert.alert("Error al registrar usuario.");
        }
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || FN;
        setShowDatePicker(Platform.OS === 'ios');
        setFN(currentDate);
    };

    const handleDateConfirm = () => {
        setShowDatePicker(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Registro de Usuario</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre de Usuario"
                        onChangeText={setUserName}
                        value={userName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre"
                        onChangeText={setName}
                        value={name}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Apellido"
                        onChangeText={setLastName}
                        value={lastName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Cédula de Identidad"
                        onChangeText={setCI}
                        value={CI}
                    />
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.datePickerText}>
                            {FN ? FN.toDateString() : "Seleccione la Fecha de Nacimiento"}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={FN}
                            mode="date"
                            display="default"
                            onChange={onChange}
                            onCancel={() => setShowDatePicker(false)}
                            onConfirm={handleDateConfirm}
                        />
                    )}
                    <MySingleButton
                        title="Guardar usuario"
                        customPress={registerUser}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '80%',
        maxWidth: 400,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
    },
    datePickerText: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        textAlignVertical: 'center',
    },
});

export default RegisterUser;
