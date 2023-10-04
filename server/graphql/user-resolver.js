const { User, validate } = require("../models/user");

const userResolver = {
  Query: {
    getUser: async (root, arguments) => {
      try {
        const user = await User.findById(arguments.id);
        if (!user) {
          console.error("Error: No User has been found.");
        }
        return user;
      } catch (err) {
        console.err(err);
      }
    },
    searchUsers: async (root, { search }) => {
      try {
        const stringToRegEx = `.*${search}.*`;
        const regExpression = new RegExp(stringToRegEx, "i");
        const user = await User.find({ username: regExpression });
        if (user === 0 || user <= 0) {
          console.log("Error: Username not found");
        } else {
          return user;
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
  Mutation: {
    addUser: async (root, arguments) => {
      try {
        const { error } = validate(arguments.input);
        if (error) {
          console.error(
            `Error: An error has occurred adding the user to the database. More Info: ${error.details[0].message}`
          );
        }
        const user = new User(arguments.input);
        await user.save();
        return user;
      } catch (err) {
        console.error("Error has occurred adding a new user", err);
      }
    },
    editUser: async (root, arguments) => {
      try {
        const {error} = validate(arguments.input);
        if(error){
          console.error(`Error: An error has occurred editing user. More Info: ${error.details[0].message}`)
        }
        return await User.findByIdAndUpdate(
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
        return await User.findByIdAndRemove(arguments.id);
      } catch (err) {
        console.error("Error has occurred when deleting user", err);
      }
    },
  },
};

module.exports = userResolver;
