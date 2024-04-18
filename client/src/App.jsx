import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [todo, settodo] = useState('');

  const [todos, settodos] = useState([]);



  const SubmitData = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:5000/addtodo', {todo}).then((res)=>{
      console.log(res.data)
      window.location.reload();
    })
  }

  useEffect (()=>{
    axios.get('http://localhost:5000/get/').then((res)=>{
      settodos(res.data)
    })
  },[])

  
  const Deletetask = (id)=>{
    axios.delete('http://localhost:5000/deletetodo/'+id).then((res)=>{
      console.log(res.data)
      window.location.reload();
    })
  }

  return (
    <div>
      <h2>Todo List</h2>
      <input type="text"  onChange={(e)=>settodo(e.target.value)} />
      <button onClick={ SubmitData}>Add</button>
      <table>
        <thead>
          <tr>
            <th>Add Your Todo</th>
          </tr>
        </thead>
        <tbody>
          {
            todos.map((val, key)=>{
              return <tr key={key}>
                <td>{val.todo}</td>
                
                <td><button onClick={(e)=> Deletetask(val._id)}>Delete</button></td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
