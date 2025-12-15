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

  const favoriteArticlesList = useSelector(
    (state) => state.favorites.favoriteArticles
  );

  if (favoriteArticlesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite articles yet!</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <View testID="FavoriteArticles">
        <Text style={styles.heading}>My Favorite Articles</Text>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>

        <FlatList
          data={favoriteArticlesList}
          contentContainerStyle={styles.listContentContainer}
          keyExtractor={(item) => item.idArticle}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => navigation.navigate("ArticleDetail", item)}
            >
              <Image
                source={{ uri: item.thumbnail }}
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
    paddingHorizontal: wp(4),
  },
  emptyText: {
    fontSize: hp(2.2),
    color: "#4B5563",
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 100,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  heading: {
    fontSize: hp(3.8),
    marginTop: hp(4),
    marginLeft: 20,
    fontWeight: "600",
    color: "#52525B",
  },
  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  cardContainer: {
    marginBottom: hp(2),
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: wp(2),
    flexDirection: "row",
    alignItems: "center",
  },
  articleImage: {
    width: hp(7),
    height: hp(7),
    borderRadius: 9999,
    marginRight: wp(3),
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  articleTitle: {
    fontSize: hp(1.8),
    fontWeight: "500",
    color: "#374151",
    flexShrink: 1,
  },
});
