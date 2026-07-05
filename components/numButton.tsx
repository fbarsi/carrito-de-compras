import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("window");
export const BUTTON_PADDING = 8;
export const BUTTON_WIDTH =
  (Math.round(width / 10) * 10 - BUTTON_PADDING * 5) / 4;
export const BUTTON_HEIGHT = BUTTON_WIDTH - 25;

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
  fontSize = 45,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.boton,
        estiloEspecial,
        texto === "=" ? styles.botonIgual : null,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.texto, { fontSize: fontSize }]}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: "#1c1c1c",
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: BUTTON_PADDING / 2,
  },
  botonIgual: {
    height: BUTTON_HEIGHT * 2 + BUTTON_PADDING,
  },
  texto: {
    color: "#fff",
    fontWeight: "900",
  },
});
