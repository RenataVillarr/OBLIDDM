import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";

import MyButton from "../components/MyButton";

const HomeTipoMaquina = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <MyButton
                            title="Registrar tipo de maquina"
                            btnColor="#3498DB"
                            btnIcon="plus"
                            customPress={() => navigation.navigate("RegisterTipoMaquina")}
                        />
                        <MyButton
                            title="Editar tipo de maquina"
                            btnColor="#27AE60"
                            btnIcon="edit"
                            customPress={() => navigation.navigate("UpdateTipoMaquina")}
                        />
                        <MyButton
                            title="Eliminar tipo de maquina"
                            btnColor="#E74C3C"
                            btnIcon="trash"
                            customPress={() => navigation.navigate("DeleteTipoMaquina")}
                        />
                        <MyButton
                            title="Ver todos los tipos de máquinas"
                            btnColor="#F350CB"
                            btnIcon="list"
                            customPress={() => navigation.navigate("ViewAllTipoMaquina")}
                        />
                        <MyButton
                            title="Ver tipo de máquina"
                            btnColor="#D4AC0D"
                            btnIcon="eye"
                            customPress={() => navigation.navigate("ViewTipoMaquina")}
                        />
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
        justifyContent: "center",
    },
});

export default HomeTipoMaquina;
