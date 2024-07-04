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
                                title="filtro"
                                btnColor="#3498DB"
                                btnIcon="plus"
                                customPress={() => navigation.navigate("Filtro")}
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