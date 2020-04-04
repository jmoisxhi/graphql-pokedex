require("dotenv").config;
const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
const resolvers = require("./src/resolvers/Resolvers");
const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: "./src/schema/schema.graphql",
  resolvers: resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

server.start(() => console.log("Server is running on http://localhost:4000"));