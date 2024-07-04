import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../components/MyText";
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";

const ViewEjercicio = ({ navigation }) => {
    const [nombreEjercicio, setNombreEjercicio] = useState("");
    const [ejercicioData, setEjercicioData] = useState(null);

    const getEjercicioData = async () => {
        setEjercicioData(null);
        if (!nombreEjercicio.trim()) {
            Alert.alert("El nombre del ejercicio es requerido");
            return;
        }

        try {
            const ejercicio = await AsyncStorage.getItem(nombreEjercicio);
            if (ejercicio) {
                setEjercicioData(JSON.parse(ejercicio));
            } else {
                Alert.alert("El ejercicio no existe");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error al buscar ejercicio");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.KeyboardView}>
                            <MyText text="Filtro de ejercicio" style={styles.text} />
                            <MyInputText
                                style={styles.inputStyle}
                                placeholder="Nombre del ejercicio a buscar"
                                onChangeText={(text) => setNombreEjercicio(text)}
                            />
                            <MySingleButton title="Buscar" customPress={getEjercicioData} />
                            <View style={styles.presenterView}>
                                <MyText text={`Nombre: ${!ejercicioData ? '' : ejercicioData.nombre}`} style={styles.presenterText} />
                                <MyText text={`Tipo de máquina: ${!ejercicioData ? '' : ejercicioData.tipoMaquina}`} style={styles.presenterText} />
                                <MyText text={`Video: ${!ejercicioData ? '' : ejercicioData.video}`} style={styles.presenterText} />
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ViewEjercicio;

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
    inputStyle: {
        padding: 15,
        margin: 10,
        color: "black",
    },
    presenterView: {
        flex: 2,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        fontSize: 30,
    },
    presenterText: {
        fontSize: 20,
    },
});
