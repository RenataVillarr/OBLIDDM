import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, KeyboardAvoidingView, Alert, ScrollView } from "react-native";
import MySingleButton from "../components/MySingleButton";
import MyText from "../components/MyText";
import { Text } from 'react-native';
import { FlatList } from "react-native";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Filter = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [users, setUsers] = useState([]);
    const dia = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const [rutinas, setRutinas] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const result = await AsyncStorage.multiGet(keys);
                const usersList = result.map(req => JSON.parse(req[1]));
                if (usersList.length > 0) {
                    setUsers(usersList);
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
                Alert.alert("Error");
            }
        };
        fetchUsers();
    }, [navigation]);

    const fetchRutinas = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
            const allRutinas = result.map(req => JSON.parse(req[1]));
            const filterRutinas = allRutinas.filter(rutina => 
                rutina.userName === userName && rutina.dia === selectedDay
            );
            setRutinas(filterRutinas);
        } catch (error) {
            console.error(error);
            Alert.alert("Error");
        }
    };

    const listItemView = (item) => {
        return (
            <View key={item.rutinaId} style={styles.listItemView}>
                <MyText text="ID de la rutina: " style={styles.text} />
                <MyText text={item.rutinaId} style={styles.text} />

                <MyText text="Dia de la semana: " style={styles.text} />
                <MyText text={item.dia} style={styles.text} />

                <MyText text="Nombre del usuario: " style={styles.text} />
                <MyText text={item.userName} style={styles.text} />

                <MyText text="Ejercicio: " style={styles.text} />
                <MyText text={item.video} style={styles.text} />

                <MyText text="Tiempo de la rutina: " style={styles.text} />
                <MyText text={item.tiempo} style={styles.text} />

                <MyText text="Cantidad de repeticiones: " style={styles.text} />
                <MyText text={item.cantidad} style={styles.text} />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <Text style={styles.subtitle}>Usuarios:</Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={userName}
                                onValueChange={(itemValue) => setUserName(itemValue)}
                            >
                                <Picker.Item label="Seleccione un usuario" value="" />
                                {users.map((user) => (
                                    <Picker.Item label={user.userName} value={user.userName} key={user.userName} />
                                ))}
                            </Picker>

                            <Text style={styles.subtitle}>Día de la semana:</Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={selectedDay}
                                onValueChange={(itemValue) => setSelectedDay(itemValue)}
                            >
                                {dia.map((day) => (
                                    <Picker.Item label={day} value={day} key={day} />
                                ))}
                            </Picker>
                            <MySingleButton
                                title="Buscar Rutina"
                                customPress={fetchRutinas}
                            />
                            <View>
                            <View>
                                <FlatList
                                    contentContainerStyle={{ paddingHorizontal: 20 }}
                                    data={rutinas}
                                    keyExtractor={(item) => item.rutinaId}
                                    renderItem={({ item }) => listItemView(item)}
                                />
                            </View>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Filter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    generalView: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    input: {
        padding: 15,
        textAlignVertical: 'top',
        color: '#000000',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: -70,
        marginTop: 10,
        marginLeft: 29,
    },
    picker: {
        size: 13,
        marginTop: 0,
    },
    listItemView: {
        padding: 10,
        backgroundColor: "#f8f8f8",
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    text: {
        color: '#333',
        fontSize: 16,
    }
});