import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");
const BUTTON_SIZE = (width - 40) / 4;

type Props = {
  texto: string;
  onPress?: () => void;
  estiloEspecial?: any;
  fontSize?: number;
};

export default function NumButton({
  texto,
  onPress,
  estiloEspecial,
  fontSize = 55,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.boton,
        estiloEspecial,
        texto === "=" ? styles.botonIgual : null,
      ]}
      onPress={() => console.log(texto)}
    >
      <Text style={[styles.texto, { fontSize: fontSize }]}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: "#1c1c1c",
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
  },
  botonIgual: {
    height: BUTTON_SIZE * 2 + 8,
  },
  texto: {
    color: "#fff",
    fontWeight: "900",
  },
});
