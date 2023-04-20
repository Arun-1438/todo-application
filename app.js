const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')



const app = express()

// app.use(express.json())

const dbPath = path.join(__dirname,"todoApplication.db")

let db = null;

const initializedDb = async () => {
    try {
        db = await open({
            filename : dbPath,
            driver: sqlite3.Database
        });
        app.listen(3000,() => console.log("Server is running at http://localhost:3004"))
    } catch (error) {
        process.exit(1);
        console.log(error.message);
    }
}

initializedDb();


app.get("/", async (req,res) => {
    const getQuery = `SELECT * FROM todo`
    const data = await db.all(getQuery)
    res.send(data)
})

app.get("/todos/", async (req,res) => {
    const {status,priority,search_q} = req.query;

    const statusQuery = `SELECT * FROM todo WHERE status = '${status}' OR priority= '${priority}' OR todo LIKE '%${search_q}%'`

    const data = await db.all(statusQuery)

    res.send(data)    
    
})

// API 2
app.get("/todos/", async (req,res) => {
    const {priority} = req.query;

    const statusQuery = `SELECT * FROM todo WHERE status = '${status}'`

    const data = await db.get(statusQuery)

    res.send(priority)    
    
})

// Api 4

app.post("/todos/", async (req,res) => {
    const todoDetails = req.body
    const {id,todo,status,priority} = todoDetails
    const insertQuery = `INSERT INTO todo (id,todo,status,priority) VALUES ('${id}', '${todo}','${status}','${priority}';`
    await db.run(insertQuery);
    res.send("Inserted");

})