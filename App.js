import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


export default function App() {

  const screenWidth = Dimensions.get("window").width;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    h1:{
      marginLeft: 20,
      fontSize: 16,
      fontWeight: "bold"
    },
    hour:{
      color: "#494A49",
      marginTop: 2,
      paddingRight: 5
    },
    time:{
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      marginLeft: 20,
      marginRight: 20,
      width: screenWidth / 2.2,
      paddingRight: 5,
      marginTop: 5,
      marginBottom: 5
    },
    green: {
      color: "#4FD84F"
    },
    red:{
      color: "#EE5305"
    },
    date:{
      marginTop: 10,
      marginBottom: 10,
      
    },

  });
  const [data,setData] = useState([]);

  const getData = async() => {
    const res = await axios.get("https://rithmi-frontend-test.s3-eu-west-1.amazonaws.com/samples.json");
    const order = res.data.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    setData(order);
  }

  useEffect( () =>{
    getData();
  }, []) 

  return (
    <View style={styles.container}>
        {data.map((el) => (
          
          <div>
          <View style={styles.date}>
        <Text style={styles.h1}>{el.date.slice(0,10).split('-').reverse().join('-')}</Text>
        
         <View style={styles.time}>
        <Text style={styles.hour}>{el.date.slice(11,16)}</Text>
        <Text style={styles.rate}>{el.heartRate} ppm</Text>
        {el.hasAnomaly ? 
        <FontAwesomeIcon style={styles.green} icon={ faHeart } />
        :
        <FontAwesomeIcon style={styles.red} icon={ faHeart } />
      }
        </View>
        </View>
        </div>
        ))}  
      <StatusBar style="auto" />
    </View>
  );
}


