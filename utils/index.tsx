import { PostComment } from "../types";
export const findCommentsForPost = (
  postId: number,
  comments: PostComment[] | null
) => {
  return comments!.filter((comment: PostComment) => comment.post_id === postId);
};
