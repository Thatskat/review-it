const { Actor, validate } = require("../models/actor");

const actorResolver = {
  Query: {
    findActorById: async (root, arguments) => {
      const actor = await Actor.findById(arguments.id);
      if (!actor) {
        console.error("Error: No Actor has been found.");
      }
      return actor;
    },
    findAllActor: async (root, arguments) => {
      const actors = await Actor.find({});
      if(!actors) {
        console.error("Error: No Actors could be found.")
      }
      return actors;
    },
    searchActorByFirstName: async(root, arguments) => {}
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
