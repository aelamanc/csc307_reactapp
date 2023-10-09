import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

//  function removeOneCharacter(index){
//     const updated = characters.filter((characters, i) => {
//       return i !== index
//     });
//     setCharacters(updated)
//   }
  function removeOneCharacter(index) {
    const userToDelete = characters[index];

    fetch(`http://localhost:8000/users/${userToDelete.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          const updated = characters.filter((characters, i) => {
                 return i !== index
               });
              setCharacters(updated)
        } else if (response.status === 404) {
          console.error("User not found.");
          return false;
        } else {
          console.error("Failed to delete user.");
          return false;
        }
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  }

  
  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          response.json().then((newUser) => {
            setCharacters([...characters, newUser]);
          });
        } else {
          console.error("Cannot add user");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;
