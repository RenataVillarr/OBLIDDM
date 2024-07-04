import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const MyInputText = (props) => {
    return (
        <View style = {StyleSheet.container}>
            <TextInput
            underlineColorAndroid= "transparent" //para que tenga color o no cuando escribimos
            maxLength={props.maxLength} //maximo que vamos a escribir
            minLength={props.minLength} //minimo 
            onChangeText={props.onChangeText} //comportamineto
            placeholder={props.placeholder} //lo que muestra cuando esta vacio el campo
            placeholderTextColor="black" //el color
            keyboardType={props.keyboardType} //tipo de teclado
            secureTextEntry = {props.secureTextEntry}//entrada de texto segura
            returnKeyType={props.returnKeyType}
            numberOfLines={props.numberOfLines}//cant de lineas
            multiline={props.multiline}
            onSubmitEditing={props.onSubmitEditing}
            style= {StyleSheet.input}
            blurOnSubmit= {false}
            value={props.value}
            defaultValue={props.defaultValue}
        />
        </View>
    );
};

export default MyInputText;
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        marginLeft: 30, //margen izq
        marginRight:30, //margen der
        marginTop: 10, //margen superior
        marginBottom: 10, //margen inferior
        borderColor: "#d3d3d3",// color del borde
        borderWidth: 1, //tamaño del borde
        padding: 15, //padding de todos lados 
    },
});