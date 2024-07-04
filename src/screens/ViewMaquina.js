import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../components/MyText";
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";

const ViewMaquina = ({ navigation }) => {
    const [codigo, setCodigo] = useState("");
    const [maquinaData, setMaquinaData] = useState(null);

    const getMaquinaData = async () => {
        setMaquinaData(null);
        if (!codigo.trim()) {
            Alert.alert("El código identificatorio es requerido");
            return;
        }

        try {
            const maquina = await AsyncStorage.getItem(codigo);
            if (maquina) {
                setMaquinaData(JSON.parse(maquina));
            } else {
                Alert.alert("La máquina no existe");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error al buscar máquina");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.KeyboardView}>
                            <MyText text="Filtro de máquina" style={styles.text} />
                            <MyInputText
                                style={styles.inputStyle}
                                placeholder="Código identificatorio de la máquina a buscar"
                                onChangeText={(text) => setCodigo(text)}
                            />
                            <MySingleButton title="Buscar" customPress={getMaquinaData} />
                            <View style={styles.presenterView}>
                                <MyText text={`Código Identificatorio: ${maquinaData ? maquinaData.codigo : ''}`} style={styles.presenterText} />
                                <MyText text={`Tipo de Máquina: ${maquinaData ? maquinaData.tipoMaquina : ''}`} style={styles.presenterText} />
                                <MyText text={`Número de Sala: ${maquinaData ? maquinaData.sala : ''}`} style={styles.presenterText} />
                               
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ViewMaquina;

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
