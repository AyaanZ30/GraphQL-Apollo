import { ApolloServer } from "@apollo/server"
import {startStandaloneServer} from "@apollo/server/standalone"

// query root type not passed
const server = new ApolloServer({
    typeDefs : None,
    
});    

const {url} = await startStandaloneServer(server, {
    listen : {port : 4000},
});

console.log(`Server running on : ${url}`);
