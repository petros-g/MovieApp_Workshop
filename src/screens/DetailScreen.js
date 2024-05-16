import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { GENRES, IMAGE_BACKDROP_URL } from "../constants/constants";

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [imageLoaded, setImageLoaded] = React.useState(false);

  const movie = route?.params?.movie;

  const goBack = () => {
    navigation.goBack();
  };

  const genres = movie?.genre_ids?.map((genreId) => {
    const genre = GENRES.find((genre) => genre.id === genreId);
    return genre?.name;
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        onLoad={() => setImageLoaded(true)}
        resizeMode="cover"
        style={{ width: "100%", height: 400 }}
        source={{ uri: IMAGE_BACKDROP_URL + movie?.backdrop_path }}
      >
        {imageLoaded && (
          <LinearGradient
            colors={["transparent", "black"]}
            style={styles.gradientStyle}
          />
        )}
      </ImageBackground>

      {imageLoaded ? (
        <Animated.View
          entering={FadeInDown.duration(600)}
          style={styles.contentView}
        >
          <View style={styles.headerRow}>
            <View style={styles.headerItem}>
              <Text>
                {movie?.vote_average?.toFixed(1)}
                <Text style={styles.thinText}>/10</Text>
              </Text>
              <Text style={styles.thinText}>Rating</Text>
            </View>

            <View style={styles.headerItem}>
              <Text>{movie?.release_date?.substring(0, 4)}</Text>
              <Text style={styles.thinText}>Release Date</Text>
            </View>
          </View>

          <Text style={styles.title}>{movie?.original_title}</Text>

          <View style={styles.genresContainer}>
            {genres?.map((genre) => (
              <View key={genre} style={styles.genreItem}>
                <Text key={genre}>{genre}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.description}>{movie?.overview}</Text>

          <View style={styles.backButtonContainer}>
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
              <Text style={{ color: "white", fontSize: 32 }}>←</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  description: {
    textAlign: "center",
  },
  contentView: {
    flex: 1,
    paddingTop: 32,
    borderRadius: 20,
    top: -32,
    gap: 16,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  headerItem: {
    gap: 3,
    alignItems: "center",
  },
  thinText: {
    fontWeight: "300",
    color: "gray",
  },
  gradientStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  genreItem: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.65,
    elevation: 8,
  },
  backButton: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 48,
    backgroundColor: "#787878",
  },
  backButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    gap: 16,
    paddingBottom: 12,
  },
});
