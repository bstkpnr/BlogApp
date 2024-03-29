import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { Context } from "../context/BlogContext";
import { Entypo } from "@expo/vector-icons";
import HomeCard from "../components/HomeCard";
import BlogCard from "../components/BlogCard";

export default function IndexScreen({ navigation, route }) {
  const { state, handleDelete, getBlogPosts } = useContext(Context);
  const { user = {} } = route.params || {};
  useEffect(() => {
    getBlogPosts();
    const listener = navigation.addListener("focus", () => {
      getBlogPosts();
    });
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <HomeCard user={user} />
      <View >
        <FlatList
        numColumns={2}
          data={state}
          keyExtractor={(blogpost) => blogpost.id}
          renderItem={({ item }) => {
            return (
              <BlogCard title={item.title} content={item.content} onDelete={()=>handleDelete(item.id)}   onCardPress={() => navigation.navigate("ShowBlog", { id: item.id })}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderColor: "#9E9FA5",
  },
  title: {
    fontSize: 20,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
