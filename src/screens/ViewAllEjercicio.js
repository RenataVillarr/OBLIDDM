import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../components/MyText";

const ViewAllEjercicios = ({ navigation }) => {
    const [ejercicios, setEjercicios] = useState([]);

    useEffect(() => {
        const fetchEjercicios = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const result = await AsyncStorage.multiGet(keys);
                const ejerciciosList = result.map(req => JSON.parse(req[1]));
                if (ejerciciosList.length > 0) {
                    setEjercicios(ejerciciosList);
                } else {
                    Alert.alert(
                        "Mensaje",
                        "Aún no se tiene datos",
                        [{ text: "OK", onPress: () => navigation.navigate("HomeScreen") }],
                        { cancelable: false }
                    );
                }
            } catch (error) {
                console.error(error);
                Alert.alert("Error al cargar ejercicios");
            }
        };
        fetchEjercicios();
    }, []);

    const listItemView = (item) => {
        return (
            <View key={item.ejercicioId} style={styles.listItemView}>
                <MyText text="ID de Ejercicio: " style={styles.text} />
                <MyText text={item.ejercicioId} style={styles.text} />

                <MyText text="Nombre: " style={styles.text} />
                <MyText text={item.nombre} style={styles.text} />

                <MyText text="Tipo de Máquina: " style={styles.text} />
                <MyText text={item.tipomaquina} style={styles.text} />

                <MyText text="Video: " style={styles.text} />
                <MyText text={item.video} style={styles.text} />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View>
                    <FlatList
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        data={ejercicios}
                        keyExtractor={(item) => item.ejercicioId}
                        renderItem={({ item }) => listItemView(item)}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ViewAllEjercicios;

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
    listView: {
        marginTop: 20,
    },
    listItemView: {
        backgroundColor: "white",
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
    text: {
        padding: 5,
        marginLeft: 10,
        color: "black",
        alignContent: "center",
        alignItems: "center",
    },
});
