import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

export default function EditScreen({ route,navigation }) {
  const { state ,editBlogPost} = useContext(Context);
  console.log("id", route.params.id);
  const blogPost = state.find((blogPost) => blogPost.id === route.params.id);
  const id=route.params.id;
  return (
    <View>
      <BlogPostForm  initialValues={{title:blogPost.title,content:blogPost.content}} isEditable={true} onSubmit={(title,content)=>{
        editBlogPost(id,title,content,()=>navigation.pop())
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({});
