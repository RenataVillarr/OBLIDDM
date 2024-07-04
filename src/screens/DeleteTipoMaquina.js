import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../components/MyText";
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";

const DeleteTipoMaquina = ({ navigation }) => {
    const [tipoMaquina, setTipoMaquina] = useState("");

    const deleteTipoMaquina = async () => {
        try {
            // Verificar si el tipo de máquina existe en AsyncStorage
            const tipoJSON = await AsyncStorage.getItem(tipoMaquina);
            const tipo = tipoJSON ? JSON.parse(tipoJSON) : null;

            if (tipo) {
                // Eliminar el tipo de máquina si existe
                await AsyncStorage.removeItem(tipoMaquina);
                Alert.alert("Tipo de máquina eliminado");
                navigation.navigate("HomeTipoMaquina");
            } else {
                Alert.alert("El tipo de máquina no existe");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error al eliminar el tipo de máquina");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <MyText text="Buscar tipo de máquina a eliminar" style={styles.text} />
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyInputText
                                placeholder="Código identificador del tipo de máquina"
                                onChangeText={(text) => setTipoMaquina(text)}
                            />
                            <MySingleButton title="Eliminar tipo de máquina" customPress={deleteTipoMaquina} />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

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

export default DeleteTipoMaquina;
