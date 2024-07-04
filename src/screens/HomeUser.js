import React from "react";
import {StyleSheet, View, SafeAreaView, ScrollView } from "react-native";

import MyButton from "../components/MyButton";

const HomeUser = ({ navigation }) => {
    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.viewContainer }>
                <View style={ styles.generalView }>
                    <View style={ styles.generalView }>
                        <ScrollView>
                            <MyButton
                                title="Registrar usuario"
                                btnColor="#3498DB"
                                btnIcon="user-plus"
                                customPress={() => navigation.navigate("RegisterUser")}
                            />
                            <MyButton
                                title="Editar usuario"
                                btnColor="#27AE60"
                                btnIcon="edit"
                                customPress={() => navigation.navigate("UpdateUser")}
                            />
                            <MyButton
                                title="Eliminar usuario"
                                btnColor="#E74C3C"
                                btnIcon="trash"
                                customPress={() => navigation.navigate("DeleteUser")}
                            />
                            <MyButton
                                title="Ver todos los usuarios"
                                btnColor="#F350CB"
                                btnIcon="search"
                                customPress={() => navigation.navigate("ViewAllUsers")}
                            />
                            <MyButton
                                title="Ver usuario"
                                btnColor="#D4AC0D"
                                btnIcon="eye"
                                customPress={() => navigation.navigate("ViewUser")}
                            />
                        </ScrollView>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeUser;

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