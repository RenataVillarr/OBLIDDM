import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import MyButton from "../components/MyButton";

const HomeEjercicio = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <MyButton
                            title="Registrar ejercicio"
                            btnColor="#3498DB"
                            btnIcon="plus"
                            customPress={() => navigation.navigate("RegisterEjercicio")}
                        />
                        <MyButton
                            title="Editar ejercicio"
                            btnColor="#27AE60"
                            btnIcon="edit"
                            customPress={() => navigation.navigate("UpdateEjercicio")}
                        />
                        <MyButton
                            title="Eliminar ejercicio"
                            btnColor="#E74C3C"
                            btnIcon="trash"
                            customPress={() => navigation.navigate("DeleteEjercicio")}
                        />
                        <MyButton
                            title="Ver todos los ejercicios"
                            btnColor="#F350CB"
                            btnIcon="list"
                            customPress={() => navigation.navigate("ViewAllEjercicio")}
                        />
                        <MyButton
                            title="Ver ejercicio"
                            btnColor="#D4AC0D"
                            btnIcon="eye"
                            customPress={() => navigation.navigate("ViewEjercicio")}
                        />
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeEjercicio;

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
