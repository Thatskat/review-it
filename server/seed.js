const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const { TvShow } = require("./models/tvshow");

const url = "https://www.imdb.com/chart/tvmeter/?ref_=nv_tvv_mptv";

request(url, (err, response, html) => {
  if (!err & (response.statusCode == 200)) {
    const $ = cheerio.load(html);

    const tvShows = $(".ipc-metadata-list li");
    const tvShowsData = [];

    tvShows.each((i, el) => {
      const tvShow = {};

      tvShow.poster = $(el).find(".ipc-poster").attr("src");
      tvShow.description = $(el).find(".sc-7316798c-2").text();
      tvShow.yearsActive = $(el).find(".sc-b51a3d33-5 .sc-b51a3d33-6").first().text();
      tvShow.name = $(el).find(".ipc-title").text();

      tvShowsData.push(tvShow);

      let show = new TvShow(tvShow);
      console.log(show);
      show.save();
    });
    fs.writeFile(
      "tvshows.json",
      JSON.stringify(tvShowsData, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Data has been written successfully");
      }
    );
  }
});
