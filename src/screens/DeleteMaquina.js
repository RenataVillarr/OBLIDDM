import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../components/MyText";
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";

const DeleteMaquina = ({ navigation }) => {
    const [codigo, setCodigo] = useState("");

    const deleteMaquina = async () => {
        try {
            const maquina = await AsyncStorage.getItem(codigo);

            if (maquina) {
                await AsyncStorage.removeItem(codigo);
                Alert.alert("Máquina eliminada");
                navigation.navigate("HomeMaquina");
            } else {
                Alert.alert("La máquina no existe");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error al eliminar la máquina");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <MyText text="Buscar maquina a eliminar" style={styles.text} />
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyInputText
                                placeholder="Codigo identificatorio"
                                onChangeText={(text) => setCodigo(text)}
                            />
                            <MySingleButton title="Eliminar maquina" customPress={deleteMaquina} />
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

export default DeleteMaquina;
