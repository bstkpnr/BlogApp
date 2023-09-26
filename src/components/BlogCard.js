import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'; 

const BlogCard = ({title,onDelete,content,onCardPress}) => {
  return (
<TouchableOpacity onPress={onCardPress}  style={styles.card}>

        <View style={styles.textContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardContent} numberOfLines={3} ellipsizeMode="tail">{content}</Text>
      </View>
        <TouchableOpacity onPress={onDelete}>
        <Feather name="bookmark" size={24} color="black" />
        </TouchableOpacity>
</TouchableOpacity>
  )
}

export default BlogCard

const styles = StyleSheet.create({
    card:{
        flexDirection: 'column',
        width: '45%', 
        height: 200, 
        padding: 16,
        margin: 6,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
   },
    textContent: {
        flex: 1,
        marginBottom: 8
      },
      cardTitle: {
        fontSize: 20,
        marginBottom: 8
      },
      cardContent: {
        fontSize: 16,
        color: 'grey'
      },
      trashIcon: {
        alignSelf: 'flex-end'
      }
    })