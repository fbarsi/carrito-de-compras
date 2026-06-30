import NumButton from "@/components/numButton";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.contenedor}>
        
        <View style={styles.teclado}>
          <View style={styles.bloqueIzquierdo}>
            <View style={styles.fila}>
              <NumButton texto="7" />
              <NumButton texto="8" />
              <NumButton texto="9" />
            </View>
            <View style={styles.fila}>
              <NumButton texto="4" />
              <NumButton texto="5" />
              <NumButton texto="6" />
            </View>
            <View style={styles.fila}>
              <NumButton texto="1" />
              <NumButton texto="2" />
              <NumButton texto="3" />
            </View>
            <View style={styles.fila}>
              <NumButton texto="0" />
              <NumButton texto="." />
              <NumButton texto="del" fontSize={45} />
            </View>
          </View>

          <View style={styles.bloqueDerecho}>
            <NumButton texto="AC" fontSize={45} />
            <NumButton texto="X" />
            <NumButton texto="=" />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#d3d3d3",
    justifyContent: "flex-end",
    padding: 8,
  },
  teclado: {
    flexDirection: "row",
    justifyContent: "center",
  },
  bloqueIzquierdo: {
    flexDirection: "column",
  },
  bloqueDerecho: {
    flexDirection: "column",
  },
  fila: {
    flexDirection: "row",
  },
});
