import { TvShow, validate } from "../models/tvshow";

const tvShowResolver = {
  Query: {
    getTvShow: async (root, arguments) => {
      try {
        const show = await TvShow.findById(arguments.id);
        if (!show) {
          console.error("Error: No Tv Show has been found.");
        }
        return show;
      } catch (err) {
        console.error(err);
      }
    },
    getAllTvShows: async (root, arguments) => {
      try {
        const shows = await TvShow.find({});
        if (!shows) {
          console.error("Error: No Tv Shows could be found.");
        }
        return shows;
      } catch (err) {
        console.error(err);
      }
    },
    searchShows: async (root, { title }) => {
      try {
        const titleRegExp = `.*${title}.*`;
        const regExp = new RegExp(titleRegExp, "g");
        const show = await TvShow.find({ title: regExp });
        if (show.length === 0 || show.length <= 0) {
          console.error("Error: No Tv Show with that title could be found.");
        } else {
          return show;
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
  Mutation: {
    addTvShow: async (root, arguments) => {
      try {
        const { error } = validate(arguments.input);
        if (error) {
          console.error(
            `Error: An error has ocurred adding the thv show to the database. More Info: ${error.details[0].message}`
          );
        }
        let show = new TvShow(arguments.input);
        await show.save();
        return show;
      } catch (err) {
        console.error("Error has ocurred adding a new show", err);
      }
    },
    editTvShow: async (root, arguments) => {
      try {
        const { error } = validate(arguments.input);
        if (error) {
          console.error(
            `Error: An error has ocurred editing a pre-existing tv show in the database. More Info: ${error.details[0].message}`
          );
        }
        return await TvShow.findByIdAndUpdate(
          arguments.input.id,
          arguments.input,
          { new: true }
        );
      } catch (err) {
        console.error("Error has ocurred editing pre-existing show.", err);
      }
    },
    deleteTvShow: async (root, { id }) => {
      try {
        return await TvShow.findByIdAndRemove(id);
      } catch (err) {
        console.error(
          "Error has ocurred deleting tv show from the database",
          err
        );
      }
    },
  },
};

module.exports = tvShowResolver;
