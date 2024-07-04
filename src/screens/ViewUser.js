import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../components/MyText";
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";

const ViewUser = ({ navigation }) => {
    const [userName, setUserName] = useState("");
    const [userData, setUserData] = useState(null);

    const getUserData = async () => {
        setUserData(null);
        if (!userName.trim()) {
            Alert.alert("El nombre de usuario es requerido");
            return;
        }

        try {
            const user = await AsyncStorage.getItem(userName);
            if (user) {
                setUserData(JSON.parse(user));
            } else {
                Alert.alert("El usuario no existe");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error al buscar usuario");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.KeyboardView}>
                            <MyText text="Filtro de usuario" style={styles.text} />
                            <MyInputText
                                style={styles.inputStyle}
                                placeholder="Nombre de usuario a buscar"
                                onChangeText={(text) => setUserName(text)}
                            />
                            <MySingleButton title="Buscar" customPress={getUserData} />
                            <View style={styles.presenterView}>
                                <MyText text={`Nombre: ${!userData ? '' : userData.name}`} style={styles.presenterText} />
                                <MyText text={`Apellido: ${!userData ? '' : userData.lastName}`} style={styles.presenterText} />
                                <MyText text={`Cedula de Identidad: ${!userData ? '' : userData.CI}`} style={styles.presenterText} />
                                <MyText text={`Fecha de Nacimiento: ${!userData ? '' : userData.FN}`} style={styles.presenterText} />
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ViewUser;

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
