import React from "react";
import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 999999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case "delete_blogpost":
      return state.map((blogPost) => blogPost.id !== action.payload);
    case "edit_blogpost":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    default:
      return state;
  }
};

const addBlogPost = (dispatch) => {
  return (title, content, callBack) => {
    dispatch({ type: "add_blogpost", payload: { title, content } });
    if (callBack) {
      callBack();
    }
  };
};
const handleDelete = (dispatch) => {
  return (id) => {
    dispatch({ type: "delete_blogpost", payload: id });
  };
};
const editBlogPost = (dispatch) => {
  return (id, title, content, callBack) => {
    dispatch({ type: "edit_blogpost", payload: { id, title, content } });
    if (callBack) {
      callBack();
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, handleDelete, editBlogPost },
  []
);
