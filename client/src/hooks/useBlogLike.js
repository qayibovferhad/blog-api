import { useSelector, useDispatch } from "react-redux";
import axios from "../lib/axios";
import { toggleBlogLike } from "../redux/features/blogSlice";
export function useBlogLike(blog) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  async function handleLikeClick(blogId) {
    dispatch(
      toggleBlogLike({
        blogId,
        userId: currentUser._id,
      })
    );
    await axios.put(`/blogs/${blogId}/like`);
  }
  const isBlogLiked = blog.likes.includes(currentUser._id);
  return [isBlogLiked, handleLikeClick];
}
