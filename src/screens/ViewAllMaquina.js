import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ViewAllMaquina = ({ navigation }) => {
    const [maquinas, setMaquinas] = useState([]);

    useEffect(() => {
        const fetchMaquinas = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const result = await AsyncStorage.multiGet(keys);
                const maquinasList = result.map(req => JSON.parse(req[1]));
                setMaquinas(maquinasList);
            } catch (error) {
                console.error("Error al cargar máquinas:", error);
                Alert.alert("Error", `Hubo un problema al cargar las máquinas: ${error.message}`);
            }
        };
        fetchMaquinas();
    }, []);

    const listItemView = ({ item }) => {
        return (
            <View key={item.codigo} style={styles.listItemView}>
                <Text style={styles.text}>Codigo Identificatorio: {item.codigo}</Text>
                <Text style={styles.text}>Tipo de Maquina: {item.tipoMaquina}</Text>
                <Text style={styles.text}>Numero de Sala: {item.sala}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <FlatList
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    data={maquinas}
                    keyExtractor={(item, index) => index.toString()} // Usar el índice como clave temporal
                    renderItem={listItemView}
                    ListEmptyComponent={<Text>No hay máquinas registradas.</Text>}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    viewContainer: {
        flex: 1,
    },
    listItemView: {
        backgroundColor: "white",
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
    },
    text: {
        padding: 5,
        marginLeft: 10,
        color: "black",
    },
});

export default ViewAllMaquina;
