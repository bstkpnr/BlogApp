import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Context } from "../context/BlogContext";

export default function ShowScreen({ route }) {
  const { state } = useContext(Context);
  console.log(route.params.id); //hangi id yolladıysam onu göreceğim

  const blogPost = state.find((post) => post.id === route.params.id);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>{blogPost.title}</Text>
        <Text style={styles.content}>{blogPost.content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    backgroundColor:'#ffffff',
    flex:1
  },
  container: {
    marginTop: 10,
    alignItems: "center",
    width: "90%",
    padding:5
  },
  label: {
    fontSize: 25,
    
    
  },
  content: {
    fontSize: 20,
    color:'#7D7C7C',
    top:10
  },
});
