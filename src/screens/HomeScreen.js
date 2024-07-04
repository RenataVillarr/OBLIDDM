import React from "react";
import {StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../components/MyButton";

const HomeScreen = ({ navigation }) => {
    const exitApp = () => {
        Alert.alert(
            "Salir", 
            "¿Estas seguro que quieres salir de la aplicacion?",
            [
                { text: "Cancelar", styles: "cancel" },
                { text: "Salir", onPress: () => {
                    //Codigo que agregamos para salir de la aplicacion
                }}
            ],
            { cancelable: false }
        );
    };

    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.viewContainer }>
                <View style={ styles.generalView }>
                    <View style={ styles.generalView }>
                        <ScrollView>
                            <MyButton
                                title="Registro de Usuarios"
                                btnColor="#2980B9"
                                btnIcon="user"
                                customPress={() => navigation.navigate("HomeUser")}
                            />
                            <MyButton
                                title="Registro de Maquinas"
                                btnColor="#27AE60"
                                btnIcon="cogs"
                                customPress={() => navigation.navigate("HomeMaquina")}
                            />
                            <MyButton
                                title="Registro de Tipo de Maquinas"
                                btnColor="#8E44AD"
                                btnIcon="cogs"
                                customPress={() => navigation.navigate("HomeTipoMaquina")}
                            />
                            <MyButton
                                title="Registro de Ejercicios"
                                btnColor="#E67E22"
                                btnIcon="user"
                                customPress={() => navigation.navigate("HomeEjercicio")}
                            />
                             <MyButton
                                title="Registro de Rutinas"
                                btnColor="#E74C3C"
                                btnIcon="user"
                                customPress={() => navigation.navigate("HomeRutina")}
                            />
                              <MyButton
                                title="Registro de Filtro"
                                btnColor="#F39C12"
                                btnIcon="user"
                                customPress={() => navigation.navigate("HomeFiltro")}
                            />
                            <MyButton
                                title="Salir de la Aplicacion"
                                btnColor="red"
                                btnIcon="sign-out"
                                customPress={exitApp}
                            /> 
                        </ScrollView>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        flex: 1,
        backgroundColor: "#5D6D7E",
    },
    generalView: {
        flex: 1,
        justifyContent: "center",
    },
});
