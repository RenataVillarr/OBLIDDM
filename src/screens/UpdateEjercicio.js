import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";

const UpdateEjercicio = () => {
    const [ejercicioIdSearch, setEjercicioIdSearch] = useState("");
    const [nombre, setNombre] = useState("");
    const [tipomaquina, setTipomaquina] = useState("");
    const [video, setVideo] = useState("");

    const searchEjercicio = async () => {
        if (!ejercicioIdSearch.trim()) {
            Alert.alert("El ID del ejercicio es requerido");
            return;
        }

        try {
            const ejercicio = await AsyncStorage.getItem(ejercicioIdSearch);
            if (ejercicio) {
                const ejercicioData = JSON.parse(ejercicio);
                setNombre(ejercicioData.nombre);
                setTipomaquina(ejercicioData.tipomaquina);
                setVideo(ejercicioData.video);
            } else {
                Alert.alert("Ejercicio no encontrado");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error al buscar ejercicio");
        }
    };

    const updateEjercicio = async () => {
        if (!nombre.trim()) {
            Alert.alert("El nombre del ejercicio es requerido");
            return;
        }
        if (!tipomaquina.trim()) {
            Alert.alert("El tipo de máquina es requerido");
            return;
        }
        if (!video.trim()) {
            Alert.alert("El video es requerido");
            return;
        }

        try {
            const ejercicio = { nombre, tipomaquina, video };
            await AsyncStorage.setItem(ejercicioIdSearch, JSON.stringify(ejercicio));
            Alert.alert("Ejercicio actualizado");
        } catch (error) {
            console.error(error);
            Alert.alert("Error al actualizar el ejercicio");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
                    <MyInputText
                        placeholder="Buscar Ejercicio por ID"
                        style={styles.inputStyle}
                        onChangeText={(text) => setEjercicioIdSearch(text)}
                    />
                    <MySingleButton title="Buscar" customPress={searchEjercicio} />

                    <View style={styles.inputContainer}>
                        <MyInputText
                            placeholder="Nombre"
                            value={nombre}
                            onChangeText={(text) => setNombre(text)}
                            style={styles.input}
                        />
                        <MyInputText
                            placeholder="Tipo de Máquina"
                            value={tipomaquina}
                            onChangeText={(text) => setTipomaquina(text)}
                            style={styles.input}
                        />
                        <MyInputText
                            placeholder="Video"
                            value={video}
                            onChangeText={(text) => setVideo(text)}
                            style={styles.input}
                        />
                    </View>

                    <MySingleButton title="Actualizar Ejercicio" customPress={updateEjercicio} />
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

export default UpdateEjercicio;
