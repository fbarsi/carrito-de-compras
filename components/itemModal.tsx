import { ItemProp, useCartStore } from "@/store/cartStore";
import { Feather } from "@react-native-vector-icons/feather";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type itemModalProps = {
  isVisible: boolean;
  itemToModify: ItemProp | null;
  inputStates: { price: string; quantity: string };
  onClose: () => void;
};

export default function ItemModal({
  isVisible,
  itemToModify,
  inputStates,
  onClose,
}: itemModalProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(inputStates.price);
  const [quantity, setQuantity] = useState(inputStates.quantity);

  const addItem = useCartStore((state) => state.addItem);
  const modifyItem = useCartStore((state) => state.modifyItem);
  const removeItem = useCartStore((state) => state.removeItem);

  useEffect(() => {
    if (itemToModify) {
      setTitle(itemToModify.title);
      setPrice(itemToModify.price.toString());
      setQuantity(itemToModify.quantity.toString());
    } else {
      setTitle("");
      setPrice(inputStates.price);
      setQuantity(inputStates.quantity);
    }
  }, [itemToModify, isVisible]);

  const handleSubmit = () => {
    const priceNum = parseFloat(price.replace(",", ".")) || 0;
    const quantityNum = parseFloat(quantity.replace(",", ".")) || 1;
    if (itemToModify) {
      modifyItem({
        id: itemToModify.id,
        title: title,
        price: priceNum,
        quantity: quantityNum,
      });
    } else {
      addItem({
        id: Date.now().toString(),
        title: title,
        price: priceNum,
        quantity: quantityNum,
      });
    }
  };

  const confirmButton = () => {
    handleSubmit();
    onClose();
  };

  const deleteButton = () => {
    if (itemToModify) {
      removeItem(itemToModify);
      onClose();
    }
  };
  const cancelButton = () => {
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalCard}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Pressable
              onPress={deleteButton}
              style={[styles.actionButton, { borderColor: "#f00" }]}
            >
              <Feather
                name="trash"
                size={28}
                color={itemToModify ? "rgb(201, 34, 34)" : "#202020"}
              />
            </Pressable>
            <Text style={styles.modalTitleText}>
              {itemToModify ? "Modificar item" : "Agregar item"}
            </Text>
            <Pressable
              onPress={cancelButton}
              style={[styles.actionButton, { borderColor: "#fff" }]}
            >
              <Feather name="x" size={32} color="#bdbdbd" />
            </Pressable>
          </View>

          <View style={{ padding: 32 }}>
            <Text style={styles.modalText}>Nombre del articulo</Text>
            <TextInput
              style={[styles.modalTextInput, { width: 140 * 2 + 16 }]}
              autoFocus
              value={title}
              onChangeText={setTitle}
            />
            <View style={styles.modalRowContainer}>
              <View>
                <Text style={styles.modalText}>Precio</Text>
                <TextInput
                  style={[styles.modalTextInput, { width: 140 }]}
                  value={price}
                  onChangeText={setPrice}
                />
              </View>
              <View>
                <Text style={styles.modalText}>Cantidad</Text>
                <TextInput
                  style={[styles.modalTextInput, { width: 140 }]}
                  value={quantity}
                  onChangeText={setQuantity}
                />
              </View>
            </View>
            <Pressable onPress={confirmButton} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "#000000e1",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "#202020",
    borderRadius: 16,
    marginBottom: 200,
  },
  modalText: {
    color: "#ffffff",
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 6,
  },
  modalTitleText: {
    color: "#ffffff",
    fontWeight: 700,
    fontSize: 26,
  },
  modalTextInput: {
    backgroundColor: "#383838",
    color: "#ffffff",
    padding: 16,
    borderRadius: 8,
    width: 140 * 2 + 16,
  },
  modalRowContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 16,
    marginBottom: 28,
  },
  modalButton: {
    backgroundColor: "#eeeeee",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    width: 140 * 2 + 16,
  },
  modalButtonText: {
    color: "#000000",
    fontWeight: 700,
  },
  actionButton: {
    padding: 16,
    aspectRatio: 1,
  },
});
