import {gql} from "@apollo/client"

const GET_USERS = gql`
query GetUsers {
  getUsers {
    id
    name
    age
    isMarried
  }
}
`;

const GET_USER_BY_ID = gql`
query GetUsers($id : ID!) {
  getUserById(id : $id) {
    id
    name
    age
    isMarried
  }
}
`;

const CREATE_USER = gql`
mutation CreateUser($name : String!, $age : Int!, $isMarried : Boolean!) {
  createUser(name : $name, age : $age, isMarried : $isMarried){
    name 
    age 
    isMarried
  } 
}
`;

export { GET_USERS, GET_USER_BY_ID, CREATE_USER };