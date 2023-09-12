import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import React, { useContext } from "react";
import { Context } from "../context/BlogContext";
export default function IndexScreen() {
  const { state, addBlogPost } = useContext(Context);
  return (
    <View>
      <Button onPress={addBlogPost} title="Ekle" />
      <FlatList
        data={state}
        keyExtractor={(blogpost) => blogpost.title}
        renderItem={({ item }) => {
          return <Text>{item.title}</Text>
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
