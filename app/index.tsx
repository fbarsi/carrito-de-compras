import Item from "@/components/item";
import ItemModal from "@/components/itemModal";
import NumButton, {
  BUTTON_PADDING,
  BUTTON_WIDTH,
} from "@/components/numButton";
import { ItemProp, useCartStore } from "@/store/cartStore";
import { AR_currency } from "@/utils/format";
import React, { useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const flatListRef = useRef<FlatList<ItemProp>>(null);
  const [isInputingPrice, setIsInputingPrice] = useState<boolean>(true);
  const [priceInput, setPriceInput] = useState<string>("");
  const [quantityInput, setQuantityInput] = useState<string>("");
  const [itemToModify, setItemToModify] = useState<ItemProp | null>(null);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalTitleInput, setModalTitleInput] = useState<string>("");
  const [modalPriceInput, setModalPriceInput] = useState<string>("");
  const [modalQuantityInput, setModalQuantityInput] = useState<string>("");

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
      if (priceInput.includes(",") || !priceInput) {
        return;
      }
      setPriceInput(priceInput + ",");
    } else {
      if (quantityInput.includes(",") || !quantityInput) {
        return;
      }
      setQuantityInput(quantityInput + ",");
    }
  };

  const handleSubmit = () => {
    const price = parseFloat(modalPriceInput.replace(",", ".")) || 0;
    const quantity = parseFloat(modalQuantityInput.replace(",", ".")) || 1;
    addItem({
      id: Date.now().toString(),
      title: modalTitleInput,
      price: price,
      quantity: quantity,
    });

    setModalTitleInput("");
    setModalPriceInput("");
    setModalQuantityInput("");
  };

  const confirmButton = () => {
    setIsModalVisible(false);
    handleSubmit();
  };

  const handleModal = () => {
    setItemToModify(null);
    setModalPriceInput(priceInput);
    setModalQuantityInput(quantityInput);
    setIsModalVisible(true);
  };

  const modify = (item: ItemProp | null) => {
    setItemToModify(item);
    setIsModalVisible(true);
  };

  const onClose = () => {
    setIsModalVisible(false);
    setPriceInput("");
    setQuantityInput("");
    setIsInputingPrice(true);
  };

  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const addItem = useCartStore((state) => state.addItem);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <SafeAreaView style={styles.container}>
      {/* total */}
      <View style={styles.headerContainer}>
        <Pressable style={styles.totalButton} onPress={clearCart}>
          <Text style={styles.inputText}>nuevo</Text>
        </Pressable>
        <View style={styles.totalContainer}>
          <Text style={styles.inputText}>Total:</Text>
          <Text style={styles.inputText}>$ {AR_currency.format(total)}</Text>
        </View>
      </View>
      <ItemModal
        isVisible={isModalVisible}
        itemToModify={itemToModify}
        inputStates={{ price: priceInput, quantity: quantityInput }}
        onClose={onClose}
      />
      {/* lista */}
      <FlatList
        key={items.length === 0 ? "empty" : "populated"}
        ref={flatListRef}
        style={styles.itemList}
        data={items}
        renderItem={({ item }) => (
          <Pressable onPress={() => modify(item)}>
            <Item item={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        contentContainerStyle={items.length === 0 && styles.emptyItemList}
        ListEmptyComponent={
          <Text style={[styles.inputText]}>No hay items en la lista.</Text>
        }
      />
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
          <NumButton texto="=" onPress={handleModal} />
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: BUTTON_WIDTH * 4 + BUTTON_PADDING * 3,
    backgroundColor: "#1c1c1c",
    borderRadius: 8,
    marginTop: 8,
    padding: 4,
  },
  totalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  totalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  itemList: {
    backgroundColor: "#1c1c1c",
    flex: 1,
    width: BUTTON_WIDTH * 4 + BUTTON_PADDING * 3,
    marginVertical: 8,
    borderRadius: 8,
    padding: 4,
  },
  emptyItemList: {
    flex: 1,
    justifyContent: "center",
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
