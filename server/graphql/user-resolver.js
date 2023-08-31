const UserModel = require("../models/user");

const userResolver = {
  Query: {
    getUser: async (root, arguments) => {
      const user = await UserModel.findById(arguments.id);
      if (!user) {
        console.error("Error: No User has been found.");
      }
      return user;
    },
    searchUsers: async (root, { search }) => {
      const stringToRegEx = `.*${search}.*`;
      const regExpression = new RegExp(stringToRegEx, "g");
      return await UserModel.find({ username: regExpression });
    },
  },
  Mutation: {
    addUser: async (root, arguments) => {
      try {
        const user = new AuthorModel(arguments.input);
        await user.save();
        return user;
      } catch (err) {
        console.error("Error has occurred adding a new user", err);
      }
    },
    editUser: async (root, arguments) => {
      try {
        return await UserModel.findByIdAndUpdate(
          arguments.input.id,
          arguments.input,
          { new: true }
        );
      } catch (err) {
        console.error("Error has occurred editing user", err);
      }
    },
    deleteUser: async (root, arguments) => {
      try {
        return await UserModel.findByIdAndRemove(arguments.id);
      } catch (err) {
        console.log("Error has occurred when deleting user", err);
      }
    },
  },
};

module.exports = userResolver;
