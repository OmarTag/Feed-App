import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RouteProp, NavigationProp } from "@react-navigation/native";
export type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
};

export type PostComment = {
  id: number;
  post_id?: number;
  name: string;
  email?: string;
  body: string;
};
export type PostCardProps = NavProps & {
  id: number;
  user: User | number;
  title: string;
  content: string;
  comments: PostComment[] | null;
};
export type PostDetailsProps = PostCardProps & RouteProps;
export type PostsProps = {
  navigate: (
    id: number,
    user: User | number,
    title: string,
    content: string
  ) => void;
};
export type RootStackParamList = {
  Feed: undefined;
  PostDetails: {
    id: number;
    user: User | number;
    title: string;
    content: string;
    comments: PostComment[] | null;
  };
};
export type NavProps = {
  navigation: NavigationProp<RootStackParamList, "Feed", "PostDetails">;
};
export type NavAndRouteProps = NativeStackScreenProps<
  RootStackParamList,
  "PostDetails"
>;

export type RouteProps = {
  route: RouteProp<RootStackParamList, "PostDetails">;
};
