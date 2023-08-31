const { Actor, validate } = require("../models/actor");

const actorResolver = {
  Query: {
    findActorById: async (root, arguments) => {
      const user = await Actor.findById(arguments.id);
      if (!user) {
        console.error("Error: No User has been found.");
      }
      return user;
    },
  },
  Mutation: {
    addActor: async (root, arguments) => {
      try {
        const { error } = validate(arguments.input);
        if (error) {
          console.error(
            `Error: An error has occurred adding the actor to the database. More Info: ${error.details[0].message}`
          );
        }
        let actor = new Actor(arguments.input);
        await actor.save();
        return actor;
      } catch (err) {
        console.error("Error has occurred adding a new user", err);
      }
    },
  },
};

module.exports = actorResolver;
