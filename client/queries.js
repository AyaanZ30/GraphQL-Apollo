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

export default GET_USERS;