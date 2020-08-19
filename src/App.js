import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";
var i = 0;
function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
      console.log(response)
    })
  }, [])

  async function handleAddRepository() {
    // TODO
    i = i+1
    const response = await api.post('repositories', {
      id: `${i}`,
      title: `Repositorio ${i}`,
      url : `https://github.com/`,
      techs: ["Node.JS"],
      owner: "Johnson"
    })

    const repository = response.data
    setRepositories([ ...repositories, repository])

    console.log(repositories)
  }



  async function handleRemoveRepository(id) {

      await api.delete(`repositories/${id}`)
        setRepositories(repositories.filter(repository => repository.id !== id))
        console.log(repositories)
        

  }

  return (
    <div>
      <ul data-testid="repository-list">

         {repositories.map(repository => <li key={repository.id}>
           {repository.title}

           <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>

           </li>)}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
