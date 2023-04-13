const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const mongoose = require('./config/mongoose')
const userRoutes = require('./router/userRoutes')
const productRoutes = require('./router/productRoutes')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', userRoutes)
app.use('/product', productRoutes)

// app.get("/home", (req, res) => {
//   console.log(req.body);
//   res.send("<h1>Node Server Running on this route</h1>");
// });

// app.get('/query', (req, res) => {
//   console.log(req.query);
//   res.json({...req.query, message: "Result in JSON"})
// })

// app.get('/params/:id',(req, res) => {

//   // console.log(req.params)
//   console.log(req.headers)
// })

let userArr = [
  {
    id: Math.floor(Math.random() * 1000),
    name: "User1"
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "User2"
  }
];

app.get("/users", (req, res) => {
  res.json({ userArr });
});

app.post("/addUser", (req, res) => {
  const name = req.body.name;

  userArr.push({
    id: Math.floor(Math.random() * 1000),
    name: name
  });

  res.json({ message: "User added successfully" });
});

app.delete("/deleteUser", (req, res) => {
  // Filter
  console.log(req.query);
  const { id } = req.query;

  //{
  // id: 147
  // }

  // const filterArr = userArr.filter((elem) => elem.id != id);
  // userArr = filterArr
  // Splice
  const idx = userArr.findIndex((elem) => elem.id == id);
  if (idx == -1) return res.json({ message: "User not found" });
  userArr.splice(idx, 1);
  res.json({ message: "User Removed" });
});

app.put("/updateUser/:id", (req, res) => {
  const { id } = req.params;
  const name = req.body.name;
  const idx = userArr.findIndex((elem) => elem.id == id);
  if (idx == -1) return res.json({ message: "User not found" });
  const newUser = {
    id: Number(id),
    name: name
  };
  userArr.splice(idx, 1, newUser);
  res.json({ message: "User Updated" });
});

app.listen(port, () => {
  console.log("Server running on port: ", port);
});
