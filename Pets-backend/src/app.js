import { MongoClient, ObjectID } from "mongodb"; //npm install mongodb
import { GraphQLServer} from "graphql-yoga"; //npm install graphql-yoga
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";

const usr = "protectora";
const pwd = "Hola1234";
const url = "cluster0-nlrjm.gcp.mongodb.net/test";

/**
 * Connects to MongoDB Server and returns connected client
 * @param {string} usr MongoDB Server user
 * @param {string} pwd MongoDB Server pwd
 * @param {string} url MongoDB Server url
 */

/*Me conecto a la base de datos y devuelve una promesa (por ser asíncrona). 
Cuando la romesa se resuelve, tiene el cliente*/
const connectToDb = async function(usr, pwd, url) {
    const uri = `mongodb+srv://${usr}:${pwd}@${url}`;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  
    await client.connect(); //Cuando se resuelva el connect, hago lo que viene después
    return client;
  };
  const runGraphQLServer = function(context) {
    const resolvers = {
      Mutation,
      Query,
    };
  
    const server = new GraphQLServer({
      typeDefs: "./src/schema.graphql",
      resolvers,
      context
    }); //Pasamos el contexto para que el servidor del graphql acceda al cliente
    const options = {
      port: 4002
    };
  
    try {
      server.start(options, ({ port }) =>
        console.log(
          `Server started, listening on port ${port} for incoming requests.`
        )
      );
    } catch (e) {
      console.info(e);
    }
  };
  
  const runApp = async function() {
    const client = await connectToDb(usr, pwd, url);
    console.log("Connect to Mongo DB");
    runGraphQLServer({ client});
    //runGraphQLServer({client});
  };
  
  runApp();

