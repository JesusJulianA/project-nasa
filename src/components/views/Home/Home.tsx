import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../../components/Header";
import fetchApi from "../../utils/fetch";
import TodaysImage from "../../Todaysimage/Todaysimage";
import { PostImage } from "../../types";
import { format, sub } from "date-fns";
import LastFiveDaysImages from "../../LastFiveDaysImages/LastFiveDayImagenes";

const Home = () => {
  const [todaysImage, setTodaysImage] = useState<PostImage>();
  const [lastFiveDaysImages, setLastFiveDaysImages] = useState<PostImage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar la imagen del día
        const todaysImageRepose = await fetchApi();
        setTodaysImage(todaysImageRepose);

        // Cargar las imágenes de los últimos cinco días
        const date = new Date();
        const todaysDate = format(date, 'yyyy-MM-dd');
        const fiveDaysAgoDate = format(sub(date, {days: 5}), 'yyyy-MM-dd');

const lastFiveDaysImagesResponse = await fetchApi(`&start_date=${fiveDaysAgoDate}&end_date=${todaysDate}`);
        setLastFiveDaysImages(lastFiveDaysImagesResponse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); 

  return (
    <View style={styles.container}>
      <Header />
      <TodaysImage {...todaysImage} />
      <LastFiveDaysImages postImages={lastFiveDaysImages}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(7,26,93,255)',
  },
});

export default Home;
