import { LineChart } from "react-native-line-chart";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

const graphic = () => {
  const screenWidth = Dimensions.get("window").width;

  //Configuracion para el grafico
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

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

  return (
    <View>
      <LineChart
        data={{
          datasets: [
            {
              data: data.map((el) => el.heartRate),
            },
          ],
        }}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
    </View>
  );
};

export default graphic;
