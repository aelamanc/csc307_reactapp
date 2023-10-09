import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

// const findUserByName = (name) => { 
//     return users['users_list']
//         .filter( (user) => user['name'] === name); 
// }

const generateRandomId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
    return id;
  };
  

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);


 const findUsersByNameAndJob = (name, job) => {
        return users['users_list']
            .filter((user) => {
                if (name && job) {
                    return user.name === name && user.job === job;
                 }
                else if (name) {
                    return user.name === name;
                }
                 else if (job) {
                    return user.job === job;
                   }
                return true;
            });
        };

        
const addUser = (user) => {
    users['users_list'].push(user);
    return user;
        }
const deleteUserById = (id) => {
    const index = users['users_list'].findIndex((user) => user.id === id);
        
    if (index !== -1) {
        users['users_list'].splice(index, 1); 
            return true; 
        } else {
            return false; 
        }
    };
        

// app.get('/users', (req, res) => {
//     const name = req.query.name;
//     if (name != undefined){
//         let result = findUserByName(name);
//         result = {users_list: result};
//         res.send(result);
//     }
//     else{
//         res.send(users);
//     }
// });

// app.get('/users', (req, res) => {
//     res.send(users);
// });
app.get("/", (req, res) => {
    res.send("Hello World!");
  });

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    const filteredUsers = findUsersByNameAndJob(name, job);

    if (filteredUsers.length > 0) {
        res.send({ users_list: filteredUsers });
    } else {
        res.status(404).send('No users found.');
    }
});




app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
        let result = findUserById(id);
        if (result === undefined) {
            res.status(404).send('Resource not found.');
        } else {
            res.send(result);
            }
        });

app.post('/users', (req, res) => {
    const userId = generateRandomId();
    const userToAdd = req.body;
    userToAdd.id = userId;
    addUser(userToAdd);
    res.status(201).json(userToAdd);
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const userDeleted = deleteUserById(id);

    if (userDeleted) {
        res.status(204).json(userDeleted);
    } else {
        res.status(404).send('User not found.');
    }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

