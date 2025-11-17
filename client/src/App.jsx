import './App.css'
import {useQuery, useMutation} from "@apollo/client/react"

import GET_USERS from '../queries.js'

function App() {
  const {data, error, loading} = useQuery(GET_USERS)

  if(loading) return <p>Loading data..</p>
  if(error) return <p>Error fetching data : {error.message}</p>

  return (
    <>
      <h1>Users</h1>
      <div>{data.getUsers.map((user) => (
        <div>
          <p>Name : {user.name}</p>
          <p>Age : {user.age}</p>
          <p>Marital Status : {user.isMarried ? "yes" : "no"}</p>
        </div>
      ))}</div>
    </>
  )
}

export default App
