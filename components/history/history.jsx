import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";

const history = () => {

    const screenWidth = Dimensions.get("window").width;
    const styles = StyleSheet.create({
      container: {
        display: "flex",
        backgroundColor: "#fff",
        justifyContent: "center",
        width: screenWidth
      },
      h1: {
        marginLeft: 20,
        fontSize: 16,
        fontWeight: "bold",
      },
      hour: {
        color: "#494A49",
        marginTop: 2,
        paddingRight: 5,
      },
      time: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        width: screenWidth / 2.2,
        paddingRight: 5,
        marginTop: 5,
        marginBottom: 5,
      },
      green: {
        color: "#4FD84F",
      },
      red: {
        color: "#EE5305",
      },
      date: {
        marginTop: 10,
        marginBottom: 10,
      },
    });

    // Aqui guardo los datos que recojo de la API
  const [data, setData] = useState([]);

  // Obtengo y guardo los datos de la API
  const getData = async () => {
    const res = await axios.get(
      "https://rithmi-frontend-test.s3-eu-west-1.amazonaws.com/samples.json"
    );
    const order = res.data.sort((a, b) =>
      a.date < b.date ? 1 : a.date > b.date ? -1 : 0
    );
    setData(order);
  };
  useEffect(() => {
    getData(); // Llamo a la funcion al cargar la pagina
  }, []);

  return(
    <View style={styles.container}>
    {data.map((el) => (
      <div>
        <View style={styles.date}>
          <Text style={styles.h1}>
            {el.date.slice(0, 10).split("-").reverse().join("-")}
          </Text>

          <View style={styles.time}>
            <Text style={styles.hour}>{el.date.slice(11, 16)}</Text>
            <Text style={styles.rate}>{el.heartRate} ppm</Text>
            {el.hasAnomaly ? (
              <FontAwesomeIcon style={styles.green} icon={faHeart} />
            ) : (
              <FontAwesomeIcon style={styles.red} icon={faHeart} />
            )}
          </View>
        </View>
      </div>
    ))}
  </View>
  )
}

export default history;