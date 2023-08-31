// REQUIRE APOLLO SERVER AND STAND ALONE SERVER
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
// REQUIRE GLOB
const glob = require("glob");
// REQUIRE GRAPHQL TOOLS
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
// REQUIRE DOTENV
require("dotenv").config();
const config = require("config");
// CONNECTION STRING FROM CONFIG
const connectionString = config.get("database.connectionString");
// REQUIRE DATABASE CONNECTION FUNCTION
const { dbConnect } = require("./utilities/databaseConnection");

if (!connectionString) {
  console.error("Database connection string is required.");
  return process.exit(1);
}

// GET RESOLVERS AND TYPES USING GLOB
const resolvers = glob.sync("graphql/*-resolver.js");
const types = glob.sync("graphql/*-type.js");

// MAP RESOLVERS AND TYPES
const regResolvers = resolvers.map((resolver) => require(`./${resolver}`));
const regTypes = types.map((type) => require(`./${type}`));

// MERGE RESOLVERS AND TYPES USING GRAPHQL MERGE TOOLS
const mergedResolvers = mergeResolvers(regResolvers);
const mergedTypeDefs = mergeTypeDefs(regTypes);

// START APOLLO SERVER
const startApolloServer = async () => {
  try {
    const server = new ApolloServer({
      typeDefs: mergedTypeDefs,
      resolvers: mergedResolvers,
      introspection: true,
    });
    dbConnect(`${connectionString}review-it`);
    const { url } = await startStandaloneServer(server, {
      listen: { port: 5000 },
    });

    console.log(`Server has started on ${url} 🚀`);
  } catch (err) {
    console.error(err);
  }
};

startApolloServer();
