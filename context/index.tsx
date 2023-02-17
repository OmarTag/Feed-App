import { createContext, useEffect, useState } from "react";
import { User, Post, PostComment } from "../types";
import axios from "axios";
type ContextType = {
  users: User[] | null;
  posts: Post[] | null;
  comments: PostComment[] | null;
  loading: boolean;
};

type ContextProps = {
  children: React.ReactNode;
};
const PostsUsersContext = createContext<ContextType | null>({} as ContextType);

export const PostsUsersContextProvider = ({ children }: ContextProps) => {
  const [posts, setPosts] = useState<Post[] | null>([] as Post[]);
  const [users, setUsers] = useState<User[] | null>([] as User[]);
  const [comments, setComments] = useState<PostComment[] | null>(
    [] as PostComment[]
  );
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [posts, users, comments] = await Promise.all([
          axios.get("https://gorest.co.in/public/v2/posts"),
          axios.get("https://gorest.co.in/public/v2/users"),
          axios.get("https://gorest.co.in/public/v2/comments"),
        ]);
        setPosts(posts.data);
        setUsers(users.data);
        setComments(comments.data);
        setLoading(false);
      } catch (err) {
        setPosts(null);
        setUsers(null);
        setComments(null);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PostsUsersContext.Provider
      value={{
        posts,
        users,
        comments,
        loading,
      }}
    >
      {children}
    </PostsUsersContext.Provider>
  );
};

export default PostsUsersContext;
