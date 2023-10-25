import { useEffect, useState, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/NotificationContext";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      fetch("/api/comments/list")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          setComments(data.comments);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Commenting...",
      message: "Adding a comment!",
      status: "pending",
    });

    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify({ commentData }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        notificationCtx.showNotification({
          title: "Success",
          message: "Comment Added!",
          status: "success",
        });
        const updatedComments = [...comments, data.comment];
        setComments(updatedComments);
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
