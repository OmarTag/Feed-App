import { StyleSheet, Text, View } from "react-native";
import { PostComment } from "../types";
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
const Comment = ({ name, body }: PostComment) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Ionicons name="person-circle" size={30} color="black" />
      </View>
      <View style={styles.content}>
        <Text style={styles.userInfoText}>{name}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
      <Divider />
    </View>
  );
};

export default Comment;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  avatar: {
    fontSize: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  body: {
    fontSize: 15,
    fontFamily: "Roboto_400Regular",
  },
  userInfoText: {
    fontSize: 13,
    fontFamily: "Roboto_700Bold",
  },
  content: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 10,
    marginBottom: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "rgba(35, 28, 68, 0.034)",
    borderRadius: 10,
  },
});
