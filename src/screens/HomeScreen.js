import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react/cjs/react.development";
import Header from "../components/Header";
import {
  API_KEY,
  BASE_URL,
  IMAGE_POSTER_URL,
  MOVIE_TYPE_ENDPOINT,
  ROUTES,
} from "../constants/constants";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const { top } = useSafeAreaInsets();

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}${MOVIE_TYPE_ENDPOINT.POPULAR}?api_key=${API_KEY}`
      );
      const data = await response.json();

      setMovies(data?.results);
    } catch (error) {
      console.error(error);
    }
  };
  // @refresh reset
  useEffect(() => {
    fetchMovies();
  }, []);

  const goToDetailScreen = (movie) => {
    navigation.navigate(ROUTES.DETAILS_SCREEN, { movie });
  };

  return (
    <ImageBackground
      source={require("../../assets/gradient.jpg")}
      style={[styles.container, { paddingTop: top, gap: 16 }]}
    >
      <Header />

      <FlatList
        data={movies}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback onPress={() => goToDetailScreen(item)}>
              <ImageBackground
                style={styles.movieCard}
                imageStyle={styles.imageStyle}
                source={{ uri: IMAGE_POSTER_URL + item.poster_path }}
              ></ImageBackground>
            </TouchableWithoutFeedback>
          );
        }}
      />
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  movieCard: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    margin: 6,
    height: 200,
  },
  imageStyle: {
    borderRadius: 16,
  },
});
