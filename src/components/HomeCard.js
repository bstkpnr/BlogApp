import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from '@expo/vector-icons';

const HomeCard = ({ user }) => {
  const greetings = () => {
    let myDate = new Date();
    let hours = myDate.getHours();
    let greet;
    if (hours < 12) {
      greet = "Günaydın";
    } else if (hours >= 12 && hours <= 17) {
      greet = "İyi Günler";
    } else if (hours >= 17 && hours <= 24) {
      greet = "İyi Akşamlar";
    }
    return greet;
  };
  return (
    <View style={styles.mainContainer}>
    <View style={styles.avatarContainer}>
      <View style={styles.container}></View>
    </View>
    <Text style={styles.text}>
      {greetings()}, {user.username}!
    </Text>
    <Ionicons name="notifications" size={24} color="black" />
  </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderRadius: 8,
      },
      avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      container: {
        height: 70,
        width: 70,
        backgroundColor: "#98EECC",
        borderRadius: 35,
        elevation: 3,
      },
      text: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        color: 'grey',
        marginLeft: 8,
        marginRight: 8,
      },
});
