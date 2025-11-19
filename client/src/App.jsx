import './App.css'
import {useQuery, useMutation} from "@apollo/client/react"

import {GET_USERS, GET_USER_BY_ID, CREATE_USER} from '../queries.js'
import { useState } from 'react';

function App() {
  const [newUser, setNewUser] = useState({});
  const {
    data : getUsersData, 
    error : getUsersError, 
    loading : getUsersLoading
  } = useQuery(GET_USERS);

  const {
    data : getUsersByIdData, 
    loading : getUsersByIdLoading,
  } = useQuery(GET_USER_BY_ID, {
    variables : {id : "103"}
  });

  const [createUser] = useMutation(CREATE_USER)
  if(getUsersLoading) return <p>Loading data..</p>
  if(getUsersError) return <p>Error fetching data : {error.message}</p>

  const handleCreateUser = async () => {
    console.log(newUser);
    createUser({variables : {name : newUser.name, age: Number(newUser.age), isMarried : false}})
  };
  return (
    <>
      {/* <h1>Users</h1> */}
      <div>
        <input type="text" placeholder='Name' 
        onChange={(e) => 
          setNewUser((prev) => ({...prev, name:e.target.value}))
        }/>
        <input type="number" placeholder='Age' 
        onChange={(e) => 
          setNewUser((prev) => ({...prev, age:e.target.value}))
        }/>
        <button onClick={handleCreateUser}>Create user</button>
      </div>

      <div>
        <h2>Created new user</h2>
        {
          
        }
      </div>
      
      <div>
        {
          getUsersByIdLoading ? <p>Loading user</p> : ( 
            <>
            <h1>Chosen User: </h1>
            <p>NAME : {getUsersByIdData.getUserById.name}</p>
            <p>AGE : {getUsersByIdData.getUserById.age}</p>
            </>
          )
        }
      </div>
      {/* <div>{getUsersData.getUsers.map((user) => (
        <div>
          <p>Name : {user.name}</p>
          <p>Age : {user.age}</p>
          <p>Marital Status : {user.isMarried ? "Married" : "Bachelor"}</p>
        </div>  
      ))}
      </div> */}
    </>
  )
}

export default App
