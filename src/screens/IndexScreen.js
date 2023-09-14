import { StyleSheet, Text, View, Button, FlatList,TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Context } from "../context/BlogContext";
import { Entypo } from '@expo/vector-icons';
export default function IndexScreen({navigation}) {
  const { state, addBlogPost ,handleDelete} = useContext(Context);
  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogpost) => blogpost.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={()=>navigation.navigate('ShowBlog',{id:item.id})}>

            <View style={styles.row}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity onPress={()=>handleDelete(item.id)}>

              <Entypo name="trash" size={24} color="black" />
              </TouchableOpacity>
            </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderTopWidth:1,
    paddingHorizontal:12,
    paddingVertical:20,
    borderColor:'#9E9FA5'
    
  },
  title:{
    fontSize:20
  }
});
