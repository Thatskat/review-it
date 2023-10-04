const { Actor, validate } = require("../models/actor");

const actorResolver = {
  Query: {
    findActorById: async (root, arguments) => {
      try {
        const actor = await Actor.findById(arguments.id);
        if (!actor) {
          console.error("Error: No Actor has been found.");
        }
        return actor;
      } catch (err) {
        console.error(err);
      }
    },
    findAllActor: async (root, arguments) => {
      try {
        const actors = await Actor.find({});
        if (!actors) {
          console.error("Error: No Actors could be found.");
        }
        return actors;
      } catch (err) {
        console.error(err);
      }
    },
    searchActorByFirstName: async (root, { firstName }) => {
      try {
        const firstNameRegExp = `.*${firstName}.*`;
        const regExp = new RegExp(firstNameRegExp, "g");
        const actor = await Actor.find({ firstName: regExp });
        if (actor.length === 0 || actor.length <= 0) {
          console.error("Error: No Actor with that first name could be found.");
        } else {
          return actor;
        }
      } catch (err) {
        console.error(err);
      }
    },
    searchActorByLastName: async (root, { lastName }) => {
      try {
        const lastNameRegExp = `.*${lastName}.*`;
        const regExp = new RegExp(lastNameRegExp, "g");
        const actor = await Actor.find({ lastName: regExp });
        if (actor.length === 0 || actor.length <= 0) {
          console.log("Error: No Actor with at first name could be found.");
        } else {
          return actor;
        }
      } catch (err) {
        console.error(err);
      }
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
        console.error("Error has occurred adding a new actor", err);
      }
    },
    editActor: async (root, arguments) => {
      try {
        const { error } = validate(arguments.input);
        if (error) {
          console.log(
            `Error: An error has ocurred editing a pre-existing actor in the database. More Info: ${error.details[0].message}`
          );
        }
        return await Actor.findByIdAndUpdate(
          arguments.input.id,
          arguments.input,
          { new: true }
        );
      } catch (err) {
        console.error("Error has occurred editing pre-existing actor.", err);
      }
    },
    deleteActor: async (root, { id }) => {
      try {
        return await Actor.findByIdAndRemove(id);
      } catch (err) {
        console.error("Error has ocurred deleting actor for the database", err);
      }
    },
  },
};

module.exports = actorResolver;
