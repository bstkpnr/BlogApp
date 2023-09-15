import React from "react";
import createDataContext from "./createDataContext";
import jsonServer from "../../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    // isteğimizi apiye attığımız için bu case ihtiyacımız kalmadı
    // case "add_blogpost":
    //   return [
    //     ...state,
    //     {
    //       id: Math.floor(Math.random() * 999999),
    //       title: action.payload.title,
    //       content: action.payload.content,
    //     },
    //   ];
    case "delete_blogpost":
      return state.map((blogPost) => blogPost.id !== action.payload);
    case "edit_blogpost":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case "get_blogposts":
      return action.payload;
    default:
      return state;
  }
};

const addBlogPost = (dispatch) => {
  return async(title, content, callBack) => {
    const res=await jsonServer.post('/blogposts',{title,content}) //api devreye girdiği için dispatch kısmını yorum satırına aldık
    // dispatch({ type: "add_blogpost", payload: { title, content } });
    if (callBack) {
      callBack();
    }
  };
};
const handleDelete = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`) 
    // dispatch({ type: "delete_blogpost", payload: id });
  };
};
const editBlogPost = (dispatch) => {
  return async (id, title, content, callBack) => {
    await jsonServer.put(`/blogposts/${id}`,{title,content})
    // dispatch({ type: "edit_blogpost", payload: { id, title, content } });
    if (callBack) {
      callBack();
    }
  };
};
const getBlogPosts =(dispatch) => {
  return async ()=>{
  try {
    const res = await jsonServer.get("/blogposts");
    dispatch({ type: "get_blogposts", payload: res.data });
  } catch (error) {
    console.error("Blog posts getirilirken bir hata meydana geldi:", error);
  }
};
}



export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, handleDelete, editBlogPost, getBlogPosts },
  []
);
