const { Comment, validate } = require("../models/comment");

const commentResolver = {
  Query: {
    getAllComments: async (root, args) => {
      try {
        const comments = await Comment.find({});
        if (!comments) {
          console.error("Error: No Comments could be found.");
        }
        return comments;
      } catch (err) {
        console.error(err);
      }
    },
    getAllCommentsByUser: async (root, { userId }) => {
      try {
        const comments = await Comment.find({ author: userId });
        if (!comments) {
          console.error("Error: This user has made no comments.");
        }
        return comments;
      } catch (err) {
        console.error(err);
      }
    },
    getCommentById: async (root, { commentId }) => {
      try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
          console.error("Error: No comment could be found.");
        }
        return comment;
      } catch (err) {
        console.error(err);
      }
    },
    getAllCommentsForShow: async (root, { showId }) => {
      try {
        const comments = await Comment.find({ show: showId });
        if (!comments) {
          console.error("Error: This show has no comments.");
        }
        return comments;
      } catch (err) {
        console.error(err);
      }
    },
  },
  Mutation: {
    createComment: async (root, args) => {
      try {
        const { error } = validate(args.input);
        if (error) {
          console.error(
            `Error: An error has occurred adding new comment to the database. More Info: ${error.details[0].message}`
          );
        }
        let comment = new Comment(args.input);
        await comment.save();
        return comment;
      } catch (err) {
        console.error("Error has occurred adding comment", err);
      }
    },
    editComment: async (root, { id, userId, input }) => {
      try {
        let comment = await Comment.findById(id);
        if (!comment) {
          console.error("Error: Comment not found");
        }
        if (comment.author !== userId) {
          console.error("Error: This user cannot edit this comment");
        }
        const { error } = validate(input);
        if (error) {
          console.error(
            `Error: An error has occurred editing a pre-existing comment in the database. More Info: ${error.details[0].message}`
          );
        }
        return await Comment.findByIdAndUpdate(id, input, { new: true });
      } catch (err) {
        console.error("Error has occurred editing pre-existing comment.", err);
      }
    },
    deleteComment: async (root, { commentId }) => {
      try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
          console.error("Error: Comment not found.");
        }
        return await Comment.findByIdAndRemove(commentId);
      } catch (err) {
        console.error(
          "Error has occurred deleting comment from the database",
          err
        );
      }
    },
  },
};

module.exports = commentResolver;
