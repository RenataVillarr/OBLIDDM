import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../components/MyText";
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";

const ViewRutina = ({ navigation }) => {
    const [rutinaId, setRutinaId] = useState("");
    const [rutinaData, setRutinaData] = useState(null);

    const getRutinaData = async () => {
        setRutinaData(null);
        if (!rutinaId.trim()) {
            Alert.alert("El ID de la rutina es requerido");
            return;
        }

        try {
            const rutina = await AsyncStorage.getItem(rutinaId);
            if (rutina) {
                setRutinaData(JSON.parse(rutina));
            } else {
                Alert.alert("La rutina no existe");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error al buscar la rutina");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyText text="Filtro de rutina" style={styles.text} />
                            <MyInputText
                                style={styles.inputStyle}
                                placeholder="ID de rutina a buscar"
                                onChangeText={(text) => setRutinaId(text)}
                            />
                            <MySingleButton title="Buscar" customPress={getRutinaData} />
                            <View style={styles.presenterView}>
                                <MyText text={`ID de rutina: ${!rutinaData ? '' : rutinaData.rutinaId}`} style={styles.presenterText} />
                                <MyText text={`Nombre de usuario: ${!rutinaData ? '' : rutinaData.userName}`} style={styles.presenterText} />
                                <MyText text={`Ejercicio: ${!rutinaData ? '' : rutinaData.ejercicioId}`} style={styles.presenterText} />
                                <MyText text={`Tiempo en minutos: ${!rutinaData ? '' : rutinaData.tiempo}`} style={styles.presenterText} />
                                <MyText text={`Cantidad de repeticiones: ${!rutinaData ? '' : rutinaData.cantidad}`} style={styles.presenterText} />
                                <MyText text={`Día de la semana: ${!rutinaData ? '' : rutinaData.selectedDay}`} style={styles.presenterText} />
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ViewRutina;

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
    keyboardView: {
        flex: 1,
        justifyContent: 'space-between',
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
        marginTop: 15,
        marginHorizontal: 30,
    },
    presenterText: {
        fontSize: 20,
        marginBottom: 10,
    },
});
