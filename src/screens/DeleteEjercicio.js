import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../components/MyText";
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";

const DeleteExercise = ({ navigation }) => {
    const [idEjercicio, setIdEjercicio] = useState("");

    const deleteExercise = async () => {
        try {
            const ejercicio = await AsyncStorage.getItem(idEjercicio);

            if (ejercicio) {
                await AsyncStorage.removeItem(idEjercicio);
                Alert.alert("Ejercicio eliminado");
                navigation.navigate("HomeScreen");
            } else {
                Alert.alert("El ejercicio no existe");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error al eliminar el ejercicio");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <MyText text="Buscar ejercicio a eliminar" style={styles.text} />
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyInputText
                                placeholder="ID del ejercicio"
                                onChangeText={(text) => setIdEjercicio(text)}
                            />
                            <MySingleButton title="Borrar ejercicio" customPress={deleteExercise} />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DeleteExercise;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    generalView: {
        flex: 1,
    },
    text: {
        padding: 5,
        marginLeft: 10,
        color: "black",
    },
    keyboardView: {
        flex: 1,
        justifyContent: "space-between",
    },
});
