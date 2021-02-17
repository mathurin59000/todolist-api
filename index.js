const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const todolistRouter = require('./routes/todolist');

app.use(bodyParser.json());
app.use('/todolist', todolistRouter);

app.listen(port, () => {
  console.log(`Todolist app listening at http://localhost:${port}`)
})