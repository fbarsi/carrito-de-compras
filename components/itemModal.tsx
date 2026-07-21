import { ItemProp, useCartStore } from "@/store/cartStore";
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
  onClose: () => void;
};

export default function ItemModal({
  isVisible,
  itemToModify,
  onClose,
}: itemModalProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const addItem = useCartStore((state) => state.addItem);
  const modifyItem = useCartStore((state) => state.modifyItem);

  useEffect(() => {
    if (itemToModify) {
      setTitle(itemToModify.title);
      setPrice(itemToModify.price.toString());
      setQuantity(itemToModify.quantity.toString());
    } else {
      setTitle("");
      setPrice("");
      setQuantity("");
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

  const deleteButton = () => {};
  const cancelButton = () => {};

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalCard}>
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
    padding: 32,
    paddingTop: 48,
    borderRadius: 16,
    marginBottom: 200,
  },
  modalText: {
    color: "#ffffff",
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 4,
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
});
