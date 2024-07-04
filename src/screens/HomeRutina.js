import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";

import MyButton from "../components/MyButton";

const HomeRutina = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <MyButton
                        title="Registrar Rutina"
                        btnColor="#3498DB"
                        btnIcon="plus"
                        customPress={() => navigation.navigate("RegisterRutina")}
                    />
                    <MyButton
                        title="Editar Rutina"
                        btnColor="#27AE60"
                        btnIcon="edit"
                        customPress={() => navigation.navigate("UpdateRutina")}
                    />
                    <MyButton
                        title="Eliminar Rutina"
                        btnColor="#E74C3C"
                        btnIcon="trash"
                        customPress={() => navigation.navigate("DeleteRutina")}
                    />
                    <MyButton
                        title="Ver Todas las Rutinas"
                        btnColor="#F350CB"
                        btnIcon="search"
                        customPress={() => navigation.navigate("ViewAllRutinas")}
                    />
                    <MyButton
                        title="Ver Rutina"
                        btnColor="#D4AC0D"
                        btnIcon="eye"
                        customPress={() => navigation.navigate("ViewRutina")}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default HomeRutina;

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
        justifyContent: "center",
    },
});

