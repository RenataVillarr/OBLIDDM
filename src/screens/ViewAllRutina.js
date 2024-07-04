import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../components/MyText";

const ViewAllRutinas = ({ navigation }) => {
    const [rutinas, setRutinas] = useState([]);

    useEffect(() => {
        const fetchRutinas = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const result = await AsyncStorage.multiGet(keys);
                const rutinasList = result.map(req => JSON.parse(req[1]));
                if (rutinasList.length > 0) {
                    setRutinas(rutinasList);
                } else {
                    Alert.alert(
                        "Mensaje",
                        "Aún no se tienen datos de rutinas",
                        [{ text: "OK", onPress: () => navigation.navigate("HomeScreen") }],
                        { cancelable: false }
                    );
                }
            } catch (error) {
                console.error(error);
                Alert.alert("Error al cargar rutinas");
            }
        };
        fetchRutinas();
    }, [navigation]);

    const listItemView = (item) => {
        return (
            <View key={item.rutinaId} style={styles.listItemView}>
                <MyText text="ID de rutina: " style={styles.text} />
                <MyText text={item.rutinaId} style={styles.text} />

                <MyText text="Nombre de usuario: " style={styles.text} />
                <MyText text={item.userName} style={styles.text} />

                <MyText text="Ejercicio: " style={styles.text} />
                <MyText text={item.ejercicioId} style={styles.text} />

                <MyText text="Tiempo en minutos: " style={styles.text} />
                <MyText text={item.tiempo} style={styles.text} />

                <MyText text="Cantidad de repeticiones: " style={styles.text} />
                <MyText text={item.cantidad} style={styles.text} />

                <MyText text="Día de la semana: " style={styles.text} />
                <MyText text={item.selectedDay} style={styles.text} />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <FlatList
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    data={rutinas}
                    keyExtractor={(item) => item.rutinaId}
                    renderItem={({ item }) => listItemView(item)}
                />
            </View>
        </SafeAreaView>
    );
};

export default ViewAllRutinas;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    listItemView: {
        backgroundColor: "white",
        marginVertical: 8,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#CCCCCC",
    },
    text: {
        paddingVertical: 5,
        marginLeft: 10,
        color: "black",
    },
});
