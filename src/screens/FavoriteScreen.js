import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();

  // Assuming you have a similar structure for articles in your Redux store
  const favoriteArticles = useSelector((state) => state.favorites);
  const favoriteArticlesList = favoriteArticles?.favoriteArticles || [];

  if (favoriteArticlesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite articles yet!</Text>
        {/* add back button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "#2563EB",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
            width: 100,
            alignItems: "center ",
          }}
        >
          <Text style={{ color: "#fff" }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      {/* Heading */}
      <View testID="FavoriteArticles">

        <Text
          style={{ fontSize: hp(3.8), marginTop: hp(4), marginLeft: 20 }}
          className="font-semibold text-neutral-600"
        >
          My Favorite Articles
        </Text>

        <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "#2563EB",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          width: 100,
          alignItems: "center",
          marginLeft: 20,
        }}
        >
        <Text style={{ color: "#fff" }}>Go back</Text>
        </TouchableOpacity>

         <FlatList
        data={favoriteArticlesList}
        contentContainerStyle={styles.listContentContainer}
        keyExtractor={(item) => item.idArticle} // Update the key according to your article data
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => navigation.navigate("ArticleDetail", item)} // Navigate to the article detail screen
          >
            <Image
              source={{ uri: item.thumbnail }} // Assuming your articles have a thumbnail field
              style={styles.articleImage}
            />
            <Text style={styles.articleTitle}>
              {item.title.length > 20
                ? `${item.title.slice(0, 20)}...`
                : item.title}
            </Text>
          </TouchableOpacity>
        )}
        />
        
      </View>
    
     
     
    </>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: hp(2.5),
    color: "#6B7280", // text-neutral-600
  },
  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  cardContainer: {
    backgroundColor: "white",
    marginBottom: hp(2),
    padding: wp(4),
    borderRadius: 10,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  articleImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: 10,
    marginRight: wp(4),
  },
  articleTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
  },
});
