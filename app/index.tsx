import NumButton, {
  BUTTON_PADDING,
  BUTTON_WIDTH,
} from "@/components/numButton";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
        <Text style={[styles.inputText]}>x</Text>
        {/* entrada de cantidad */}
        <Pressable
          style={styles.inputQuantitySection}
          onPress={() => setIsInputingPrice(false)}
        >
          <Text
            style={[
              styles.inputText,
              !isInputingPrice && styles.activeInput,
              !quantityInput && styles.placeholder,
            ]}
          >
            {!!quantityInput ? quantityInput : "1"}
          </Text>
        </Pressable>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  inputContainer: {
    backgroundColor: "#1c1c1c",
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
    alignItems: "center",
    width: BUTTON_WIDTH * 4 + BUTTON_PADDING * 3,
  },
  inputPriceSection: {
    flex: 4,
    padding: 16,
  },
  inputQuantitySection: {
    flex: 1,
    padding: 16,
    alignItems: "flex-end",
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
  inputText: {
    color: "#ffffff",
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
  placeholder: {
    opacity: 0.5,
  },
});
