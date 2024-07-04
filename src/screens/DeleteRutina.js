import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../components/MyText";
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";

const DeleteRutina = ({ navigation }) => {
    const [rutinaId, setRutinaId] = useState("");

    const deleteRutina = async () => {
        try {
            const rutina = await AsyncStorage.getItem(rutinaId);

            if (rutina) {
                await AsyncStorage.removeItem(rutinaId);
                Alert.alert("Rutina eliminada");
                navigation.navigate("HomeRutina");
            } else {
                Alert.alert("La rutina no existe");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error al eliminar la rutina");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <MyText text="Buscar rutina a eliminar" style={styles.text} />
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyInputText
                                placeholder="ID de la rutina"
                                onChangeText={(text) => setRutinaId(text)}
                            />
                            <MySingleButton title="Eliminar rutina" customPress={deleteRutina} />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DeleteRutina;

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
