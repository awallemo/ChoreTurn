const express = require('express')
const app = express()
const Pocketbase = require('pocketbase')

const pb = new Pocketbase('http://127.0.0.1:8090')

async function getTodos(){
 let todos = await pb.collection('Todos').getList(1)
 return todos
}

app.get("/todos", (req, res) => {
 res.json(getTodos())
})
/*
 await fetch('http://127.0.0.1:8090/api/collections/Todos/records')
*/
