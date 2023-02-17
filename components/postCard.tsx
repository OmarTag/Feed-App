import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Divider, Button } from "react-native-paper";
import { PostCardProps } from "../types";

const PostCard = ({
  id,
  user,
  title,
  content,
  comments,
  navigation,
}: PostCardProps) => {
  const pressHandler = () => {
    navigation.navigate("PostDetails", {
      id,
      user,
      title,
      content,
      comments,
    });
  };
  return (
    <Card style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.info}>
          <View style={styles.userInfo}>
            <Ionicons name="person-circle" size={40} color="rgba(0,0,0,0.8)" />
            <Text style={styles.userInfoText}>{user?.name || user}</Text>
          </View>
          <View style={styles.comments}>
            <Ionicons
              style={{ marginRight: 2 }}
              name="chatbubbles-outline"
              size={20}
              color="rgba(0,0,0,0.8)"
            />
            <Text style={styles.userInfoText}>{comments?.length}</Text>
          </View>
        </View>
        <Divider />
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.content}>
          <Text numberOfLines={6} style={styles.content_text}>
            {content}
          </Text>
          <LinearGradient
            colors={["transparent", "white"]}
            style={styles.content_border}
          ></LinearGradient>
        </View>
        <Pressable
          android_ripple={{ color: "#e7e7e7e7" }}
          onPress={pressHandler}
          style={styles.readMore}
        >
          <Button style={styles.fullWidthBtn}>
            <Text style={styles.fullWidthBtn_text}>Read More</Text>
          </Button>
        </Pressable>
      </View>
    </Card>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // <==== HERE

    borderRadius: 8,
    marginBottom: 50,
  },
  fullFlex: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 15,
  },
  header: {
    flex: 1,
    marginBottom: 20,
    marginTop: 10,
  },

  info: {
    flex: 1,
    fontSize: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  comments: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
    fontSize: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    margin: 0,
    fontSize: 30,
    padding: 0,
    fontFamily: "Roboto_900Black",
  },
  userInfoText: {
    fontSize: 15,
    fontFamily: "Roboto_700Bold",
  },
  content: {
    position: "relative",
    marginBottom: 20,
  },
  content_text: {
    fontSize: 13,
    fontFamily: "Roboto_400Regular",
  },
  content_border: {
    flex: 1,
    position: "absolute",
    height: 50,
    width: "100%",
    bottom: 0,
  },
  readMore: { flex: 1, alignItems: "center" },
  fullWidthBtn: {
    backgroundColor: "black",
    borderRadius: 8,
    width: "100%",
  },
  fullWidthBtn_text: {
    color: "white",
    fontFamily: "Roboto_500Medium",
  },
});
