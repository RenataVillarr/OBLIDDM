import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../components/MyText";

const ViewAllTipoMaquina = ({ navigation }) => {
    const [tiposMaquina, setTiposMaquina] = useState([]);

    useEffect(() => {
        const fetchTiposMaquina = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const result = await AsyncStorage.multiGet(keys);
                const tiposMaquinaList = result.map(req => JSON.parse(req[1]));
                console.log("Tipos de Máquina:", tiposMaquinaList); // Verifica los datos aquí
                if (tiposMaquinaList.length > 0) {
                    setTiposMaquina(tiposMaquinaList);
                } else {
                    Alert.alert(
                        "Mensaje",
                        "Aún no se tienen datos de tipos de máquinas",
                        [{ text: "OK", onPress: () => navigation.navigate("HomeScreen") }],
                        { cancelable: false }
                    );
                }
            } catch (error) {
                console.error(error);
                Alert.alert("Error al cargar tipos de máquinas");
            }
        };
        fetchTiposMaquina();
    }, []);

    const listItemView = ({ item }) => {
        return (
            <View key={item.codigoIdentificador} style={styles.listItemView}>
                <MyText text="Código de Identificación: " style={styles.text} />
                <MyText text={item.codigoIdentificador} style={styles.text} />

                <MyText text="Tipo de Máquina: " style={styles.text} />
                <MyText text={item.tipoMaquina} style={styles.text} />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                contentContainerStyle={{ paddingHorizontal: 20 }}
                data={tiposMaquina}
                keyExtractor={(item) => item?.codigoIdentificador?.toString() ?? Math.random().toString()} 
                renderItem={listItemView}
                ListEmptyComponent={<Text>No hay datos de tipos de máquinas</Text>}
            />
        </SafeAreaView>
    );
};

export default ViewAllTipoMaquina;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItemView: {
        backgroundColor: "green",
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
    text: {
        padding: 5,
        marginLeft: 10,
        color: "black",
    },
});
