const { User, validate } = require("../models/user");
const Joi = require("joi");
const _ = require("lodash");

const userResolver = {
  Query: {
    getUser: async (root, arguments, context) => {
      try {
        isAuthenticatedUser(context);
        const user = await User.findById(arguments.id);
        if (!user) {
          console.error("Error: No User has been found.");
        }
        isAuthorized(user, context);
        return user;
      } catch (err) {
        console.err(err);
      }
    },
    searchUsers: async (root, { search }, context) => {
      try {
        isAuthenticatedUser(context);
        const stringToRegEx = `.*${search}.*`;
        const regExpression = new RegExp(stringToRegEx, "i");
        const user = await User.find({ username: regExpression });
        if (user === 0 || user <= 0) {
          console.log("Error: Username not found");
        } else {
          isAuthorized(user, context);
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

        const token = user.generateToken();
        let data = _.pick(user, [
          "_id",
          "username",
          "firstName",
          "lastName",
          "email",
          "displayName",
          "isAdmin",
        ]);
        data.token = token;
        return data;
      } catch (err) {
        console.error("Error has occurred adding a new user", err);
      }
    },
    loginUser: async (root, arguments) => {
      try {
        const schema = Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        });
        const { value, error } = schema.validate(arguments.input);
        if (error) {
          console.error(error);
        }
        const user = await User.findOne({ email: value.email });
        if (!user) {
          console.error("Invalid email or password");
        }
        const validPassword = await user.comparePassword(
          value.password,
          user.password
        );
        if (!validPassword) {
          console.error("Invalid email or password");
        }
        const token = user.generateToken();

        let data = _.pick(user, [
          "_id",
          "firstName",
          "lastName",
          "username",
          "email",
          "displayName",
          "isAdmin",
        ]);
        data.token = token;
        console.log(token);
        return data;
      } catch (err) {
        console.error(err);
      }
    },
    editUser: async (root, arguments, context) => {
      try {
        isAuthenticatedUser(context);
        const user = await User.findById(arguments.id);
        if (!user) {
          console.error("Error: No user found");
        }
        const { error } = validate(arguments.input);
        if (error) {
          console.error(
            `Error: An error has occurred editing user. More Info: ${error.details[0].message}`
          );
        }
        isAuthorized(user, context);
        return await User.findByIdAndUpdate(
          arguments.input.id,
          arguments.input,
          { new: true }
        );
      } catch (err) {
        console.error("Error has occurred editing user", err);
      }
    },
    deleteUser: async (root, arguments, context) => {
      try {
        isAuthenticatedUser(context);
        const user = await User.findById(arguments.id);
        if (!user) {
          console.error("Error: No user found.");
        }
        isAuthorized(user, context);
        return await User.findByIdAndRemove(arguments.id);
      } catch (err) {
        console.error("Error has occurred when deleting user", err);
      }
    },
  },
};

function isAuthenticatedUser(context) {
  if (!context.user) {
    console.error("User is not authenticated.");
  }
}

function isAuthorized(user, context) {
  if (user._id.toString() !== context.user._id) {
    console.error("User is not authorized to perform this action.");
  }
}

module.exports = userResolver;
