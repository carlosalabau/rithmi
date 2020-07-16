import { LineChart } from "react-native-line-chart";
import { Dimensions, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

const graphic = () => {
  const screenWidth = Dimensions.get("window").width;
  const styles = StyleSheet.create({
    graphic: {
      marginLeft:2
    }
  })
  //Configuracion para el grafico
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
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
    <ScrollView>
      {data.length > 0 && (
        <LineChart
          data={{
            datasets: [
              {
                data: data.map((el) => el.heartRate),
              },
            ],
          }}
          style={styles.graphic}
          width={screenWidth/1.01}
          height={220}
          chartConfig={chartConfig}
        />
      )}
    </ScrollView>
  );
};

export default graphic;
