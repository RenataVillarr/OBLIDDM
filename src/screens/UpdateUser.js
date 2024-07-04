import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";

const UpdateUser = () => {
    const [userNameSearch, setUserNameSearch] = useState("");
    const [userName, setUserName] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [CI, setCI] = useState("");
    const [FN, setFN] = useState("");

    const searchUser = async () => {
        if (!userNameSearch.trim()) {
            Alert.alert("El nombre de usuario es requerido");
            return;
        }

        try {
            const user = await AsyncStorage.getItem(userNameSearch);
            if (user) {
                const userData = JSON.parse(user);
                setUserName(userData.userName);
                setName(userData.name);
                setLastName(userData.lastName);
                setCI(userData.CI);
                setFN(userData.FN);
            } else {
                Alert.alert("Usuario no encontrado");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error al buscar usuario");
        }
    };

    const updateUser = async () => {
        if (!userName.trim()) {
            Alert.alert("El nombre de usuario es requerido");
            return;
        }
        if (!name.trim()) {
            Alert.alert("El nombre es requerido");
            return;
        }
        if (!lastName.trim()) {
            Alert.alert("El apellido es requerido");
            return;
        }
        if (!CI.trim()) {
            Alert.alert("La cédula de identidad es requerida");
            return;
        }
        if (!FN.trim()) {
            Alert.alert("La fecha de nacimiento es requerida");
            return;
        }

        try {
            const user = { userName, name, lastName, CI, FN };
            await AsyncStorage.setItem(userName, JSON.stringify(user));
            Alert.alert("Usuario actualizado");
        } catch (error) {
            console.error(error);
            Alert.alert("Error al actualizar el usuario");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
                    <MyInputText
                        placeholder="Buscar Usuario por Nombre"
                        style={styles.inputStyle}
                        onChangeText={(text) => setUserNameSearch(text)}
                    />
                    <MySingleButton title="Buscar" customPress={searchUser} />

                    <View style={styles.inputContainer}>
                        <MyInputText
                            placeholder="Nombre de Usuario"
                            value={userName}
                            onChangeText={(text) => setUserName(text)}
                            style={styles.input}
                        />
                        <MyInputText
                            placeholder="Nombre"
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={styles.input}
                        />
                        <MyInputText
                            placeholder="Apellido"
                            value={lastName}
                            onChangeText={(text) => setLastName(text)}
                            style={styles.input}
                        />
                        <MyInputText
                            placeholder="Cédula de Identidad"
                            value={CI}
                            onChangeText={(text) => setCI(text)}
                            style={styles.input}
                        />
                        <MyInputText
                            placeholder="Fecha de Nacimiento"
                            value={FN}
                            onChangeText={(text) => setFN(text)}
                            style={styles.input}
                        />
                    </View>

                    <MySingleButton title="Actualizar Usuario" customPress={updateUser} />
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    keyboardAvoidingView: {
        width: "100%",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    inputContainer: {
        width: "100%",
        alignItems: "center",
    },
    input: {
        width: "80%",
        height: 50,
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 8,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: "#FFFFFF",
    },
    inputStyle: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 8,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: "#FFFFFF",
    },
});

export default UpdateUser;
