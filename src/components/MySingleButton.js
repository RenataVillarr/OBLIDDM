import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";

const MySingleButton = (props) => {
    return (
        <TouchableOpacity style= {styles.button} onPress = {props.customPress}>
            <View>
                <Text style = {styles.text}> {props.title} </Text>
            </View>
        </TouchableOpacity>
    );
};
export default MySingleButton;

const styles = StyleSheet.create({
    button:{
        alignContent : 'center',
        backgroundColor: 'black',
        color: '#ffffff',
        padding: 20,
        marginTop: 15,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        alignItems: 'center',

    },
    text: {
        color: 'white' //color del texto
    },
});

 