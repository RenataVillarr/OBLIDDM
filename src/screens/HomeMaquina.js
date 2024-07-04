import React from "react";
import {StyleSheet, View, SafeAreaView, ScrollView } from "react-native";

import MyButton from "../components/MyButton";

const HomeMaquina = ({ navigation }) => {
    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.viewContainer }>
                <View style={ styles.generalView }>
                    <View style={ styles.generalView }>
                        <ScrollView>
                            <MyButton
                                title="Registrar máquina"
                                btnColor="#3498DB"
                                btnIcon="plus"
                                customPress={() => navigation.navigate("RegisterMaquina")}
                            />
                            <MyButton
                                title="Editar máquina"
                                btnColor="#27AE60"
                                btnIcon="edit"
                                customPress={() => navigation.navigate("UpdateMaquina")}
                            />
                            <MyButton
                                title="Eliminar máquina"
                                btnColor="#E74C3C"
                                btnIcon="trash"
                                customPress={() => navigation.navigate("DeleteMaquina")}
                            />
                            <MyButton
                                title="Ver todos las máquinas"
                                btnColor="#F350CB"
                                btnIcon="list"
                                customPress={() => navigation.navigate("ViewAllMaquina")}
                            />
                            <MyButton
                                title="Ver maquina"
                                btnColor="#D4AC0D"
                                btnIcon="eye"
                                customPress={() => navigation.navigate("ViewMaquina")}
                            />
                        </ScrollView>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeMaquina;

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