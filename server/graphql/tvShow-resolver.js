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
};
