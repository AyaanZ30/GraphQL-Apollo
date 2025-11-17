import { ApolloServer } from "@apollo/server"
import {startStandaloneServer} from "@apollo/server/standalone"

import {users} from './mockData.js'


// backticks(``) for writing gql queries & code inside js file
// [User] : returns a list of objects of Users(with all fields)
const typeDefs = `
    type Query{
        getUsers : [User]
        getUserById(id : ID!) : User
    }

    type Mutation{
        createUser(name : String!, 
        age : Int!, 
        isMarried : Boolean!) : User

        deleteUser(id : ID!) : [User]
    }

    type User{                   
        id : ID
        name : String
        age : Int
        isMarried : Boolean
    }
`;

// functions to actually execute the queries and mutations defined above
// parent : allows you to access the args of the prev resolved query 
const resolvers = {
    Query : {
        getUsers : () => {
            return users;
        },
        getUserById : (parent, args) => {
            const id = args.id;
            return users.find((user) => user.id === id);
        }
    },
    Mutation : {
        createUser : (parent, args) => {
            const {name, age, isMarried} = args;

            let prevUser = users[users.length - 1];
            const newUser = {
                id : (Number(prevUser.id) + 1).toString(),
                name : name,
                age : age,
                isMarried : isMarried,
            }
            users.push(newUser);
            return newUser;
        },
        deleteUser : (parent, args) => {
            const id = args.id;

            users.filter((user) => user.id === id);
            return users;
        }
    }
};

// query root type not passed
const server = new ApolloServer({
    typeDefs,
    resolvers,
});    

const {url} = await startStandaloneServer(server, {
    listen : {port : 4000},
});

console.log(`Server running on : ${url}`);


// Query, Mutation (required for GraphQL schema)
// typeDefs, resolvers (required to pass to ApolloServer)