import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import axios from 'axios';



export default function App() {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    h1:{
      marginLeft: 20,
      marginTop: 10,
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
      width: screen.width / 2
    },
    rate:{
      paddingRight: 5,
      marginTop: 2,
    }
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
          <View>
        <Text style={styles.h1}>{el.date.slice(0,10).split('-').reverse().join('-')}</Text>
        </View>
         <View style={styles.time}>
        <Text style={styles.hour}>{el.date.slice(11,16)}</Text>
        <Text style={styles.rate}>{el.heartRate} ppm</Text>
        {el.hasAnomaly ? 
        <Text>azul</Text>
        :
        <Text>rojo</Text>
      }
        
        </View>
        </div>
        ))}  
        
         
      
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}


