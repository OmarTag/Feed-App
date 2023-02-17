import { useRef, useMemo, useCallback } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FAB, Divider } from "react-native-paper";
import { NavAndRouteProps, PostComment } from "../types";
import { Comment } from "../components";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
const PostDetails = ({ route }: NavAndRouteProps) => {
  const { user, title, content, comments } = route.params;
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%", "70%"], []);

  const handleSnapPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const handleDismiss = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);
  const RenderComments = () => {
    return (
      <View style={styles.commentsContainer}>
        {comments!.map((comment: PostComment) => (
          <View key={comment.id + comment.name}>
            <Comment id={comment.id} name={comment.name} body={comment.body} />
            <Divider />
          </View>
        ))}
      </View>
    );
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Divider />
        <View style={styles.userInfo}>
          <Text style={{ fontFamily: "Roboto_700Bold" }}>by: </Text>
          <Ionicons name="person-circle" size={30} color="rgba(0,0,0,0.8)" />
          <Text style={styles.userInfoText}>{user?.name || user}</Text>
        </View>

        <View style={styles.content}>
          <Text
            style={[
              styles.content_text,
              {
                marginBottom: comments!.length > 0 ? 80 : 0,
              },
            ]}
          >
            {content}
          </Text>
        </View>

        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetRef}
            style={{ flex: 1 }}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSnapPress}
            enablePanDownToClose
            enableDismissOnClose
            onDismiss={handleDismiss}
          >
            <View style={styles.comments_heading}>
              <Text style={styles.comments_heading_text}>
                {comments!.length}{" "}
                {comments!.length === 1 ? `Comment` : `Comments`}
              </Text>
            </View>
            <BottomSheetScrollView style={{ flex: 1 }}>
              <RenderComments />
            </BottomSheetScrollView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </ScrollView>
      {comments!.length > 0 && (
        <FAB
          color="black"
          icon={() => (
            <Ionicons name="chatbubbles-outline" size={20} color="black" />
          )}
          label={`${comments!.length} ${
            comments!.length === 1 ? `Comment` : `Comments`
          }`}
          style={styles.comments_btn}
          onPress={handleSnapPress}
        />
      )}
    </GestureHandlerRootView>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.93)",
  },

  header: {
    marginBottom: 20,
    marginTop: 10,
  },
  commentsContainer: {
    flex: 1,
    padding: 5,
  },
  comments_heading: {
    marginBottom: 10,
    alignItems: "center",
  },
  comments_heading_text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  comments_btn: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
    fontFamily: "Roboto_400Regular",
    right: 20,
  },
  content: {},
  content_text: {
    fontSize: 25,
    fontFamily: "Roboto_400Regular",
  },
  userInfo: {
    fontSize: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    margin: 0,
    fontSize: 30,
    padding: 0,
    fontFamily: "Roboto_900Black",
  },
  userInfoText: {
    fontSize: 18,
    fontFamily: "Roboto_700Bold",
  },
});
