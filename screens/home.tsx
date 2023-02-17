import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { PostCard } from "../components";
import { Post, User, NavProps, PostComment } from "../types";
import PostsUsersContext from "../context";
import { findCommentsForPost } from "../utils";
import { ActivityIndicator } from "react-native-paper";
const Home = ({ navigation }: NavProps) => {
  const ctx = useContext(PostsUsersContext);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [comments, setComments] = useState<PostComment[] | null>(null);
  useEffect(() => {
    if (!ctx?.loading && ctx?.posts && ctx?.posts && ctx?.comments) {
      setPosts(ctx?.posts);
      setUsers(ctx?.users);
      setComments(ctx?.comments);
    }
  }, [ctx?.loading, ctx?.users, ctx?.comments, ctx?.posts]);

  const Posts = ({ navigation }: NavProps) => {
    return !ctx?.loading ? (
      <View>
        {posts!.map((post: Post) => (
          <PostCard
            navigation={navigation}
            key={post.id}
            id={post.id}
            user={users!.find((obj) => obj.id === post.user_id) || post.user_id}
            comments={findCommentsForPost(post.id, comments)}
            title={post.title}
            content={post.body}
          />
        ))}
      </View>
    ) : (
      <ActivityIndicator />
    );
  };
  return (
    <ScrollView style={styles.container}>
      {posts && users ? (
        <Posts navigation={navigation} />
      ) : (
        <View style={styles.noPosts}>
          <Text>No Posts</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  noPosts: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
