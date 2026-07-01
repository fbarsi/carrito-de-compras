import NumButton from "@/components/numButton";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [isInputingPrice, setIsInputingPrice] = useState(true);
  const [priceInput, setPriceInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");

  const insertInput = (i: string) => {
    if (isInputingPrice) {
      if (priceInput.length < 11) {
        setPriceInput(priceInput + i);
      }
    } else {
      if (quantityInput.length < 3) {
        setQuantityInput(quantityInput + i);
      }
    }
  };

  const clearInput = () => {
    if (isInputingPrice) {
      setPriceInput("");
    } else {
      setQuantityInput("");
    }
  };

  const deleteInput = () => {
    if (isInputingPrice) {
      setPriceInput(priceInput.slice(0, -1));
    } else {
      setQuantityInput(quantityInput.slice(0, -1));
    }
  };

  const insertComma = () => {
    if (isInputingPrice) {
      if (priceInput.includes(",")) {
        return;
      }
      setPriceInput(priceInput + ",");
    } else {
      if (quantityInput.includes(",")) {
        return;
      }
      setQuantityInput(quantityInput + ",");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* entrada de precio y cantidad */}
        <View style={styles.inputContainer}>
          {/* entrada de precio */}
          <Pressable
            style={styles.inputPriceSection}
            onPress={() => setIsInputingPrice(true)}
          >
            <Text
              style={[styles.inputText, isInputingPrice && styles.activeInput]}
            >
              {priceInput}
            </Text>
          </Pressable>
          {/* wrapper */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.inputText, { paddingVertical: 16 }]}>x</Text>
            {/* entrada de cantidad */}
            <Pressable
              style={styles.inputQuantitySection}
              onPress={() => setIsInputingPrice(false)}
            >
              {quantityInput !== "" ? (
                <Text
                  style={[
                    styles.inputText,
                    !isInputingPrice && styles.activeInput,
                  ]}
                >
                  {quantityInput}
                </Text>
              ) : (
                <Text style={[styles.inputText, { color: "#666" }]}>1</Text>
              )}
            </Pressable>
          </View>
        </View>

        {/* teclado numerico */}
        <View style={styles.keyboard}>
          {/* bloque izquierdo  */}
          <View style={styles.columnBlock}>
            <View style={styles.rowBlock}>
              <NumButton texto="7" onPress={() => insertInput("7")} />
              <NumButton texto="8" onPress={() => insertInput("8")} />
              <NumButton texto="9" onPress={() => insertInput("9")} />
            </View>
            <View style={styles.rowBlock}>
              <NumButton texto="4" onPress={() => insertInput("4")} />
              <NumButton texto="5" onPress={() => insertInput("5")} />
              <NumButton texto="6" onPress={() => insertInput("6")} />
            </View>
            <View style={styles.rowBlock}>
              <NumButton texto="1" onPress={() => insertInput("1")} />
              <NumButton texto="2" onPress={() => insertInput("2")} />
              <NumButton texto="3" onPress={() => insertInput("3")} />
            </View>
            <View style={styles.rowBlock}>
              <NumButton texto="0" onPress={() => insertInput("0")} />
              <NumButton texto="," onPress={() => insertComma()} />
              <NumButton
                texto="del"
                onPress={() => deleteInput()}
                fontSize={35}
              />
            </View>
          </View>
          {/* bloque derecho  */}
          <View style={styles.columnBlock}>
            <NumButton texto="AC" onPress={() => clearInput()} fontSize={35} />
            <NumButton
              texto="X"
              onPress={() => setIsInputingPrice(!isInputingPrice)}
            />
            <NumButton texto="=" onPress={() => console.log("=")} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3f3f3f",
    justifyContent: "flex-end",
    paddingHorizontal: 33,
  },
  inputContainer: {
    backgroundColor: "#1c1c1c",
    flexDirection: "row",
    padding: 4,
    borderRadius: 8,
    marginBottom: 4,
    justifyContent: "space-between",
  },
  inputPriceSection: {
    width: 230,
    padding: 16,
  },
  inputQuantitySection: {
    padding: 16,
    width: 80,
    alignItems: "flex-end",
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
  inputText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 26,
  },
  activeInput: {
    color: "#ffaa80",
  },
  keyboard: {
    flexDirection: "row",
    justifyContent: "center",
  },
  columnBlock: {
    flexDirection: "column",
  },
  rowBlock: {
    flexDirection: "row",
  },
});
