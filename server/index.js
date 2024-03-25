/*require('dotenv').config()//dotenv 库用于加载环境变量，它会从一个名为 .env 的文件中加载环境变量，并将其注入到 process.env 对象中。
//console.log(process.env)//process.env 对象包含了当前进程的环境变量。在这里，我们打印了 process.env 对象，以查看是否成功加载了环境变量。

const express = require('express')//express 库是一个流行的 Node.js web 应用框架，它提供了创建 Web 服务器的工具和功能。
const cors = require('cors')//cors 库用于处理跨域资源共享（CORS），它允许在不同源之间进行安全的通信。
//导入了 express 和 cors 库。
//const { Pool } = require('pg');
//const { error } = require('console');
//const { query} = require('./helpers/db.js')
//const { todoRouter } = require('./routes/todo.js')

const todoRouter = require('./routes/todo.js')

const app = express()//创建了一个 Express 应用的实例，并将其赋值给变量 app
app.use(cors()) 
app.use(express.json())//使用 CORS 中间件来处理跨域请求。
app.use(express.urlencoded({extended: false}))
app.use('/',todoRouter)

const port = process.env.PORT 
//const port = 3001 //定义端口号为 3001。

/*app.get("/",async(req,res) => {//定义路由,定义了一个 GET 请求的路由，当客户端发送 GET 请求到根路径 / 时
    //const pool  =openDb()//调用了 openDb() 函数，该函数返回一个 PostgreSQL 数据库连接池对象。连接池对象是一个管理数据库连接的工具，它可以有效地管理多个数据库连接

   /* pool.query('SELECT * FROM task',(error,result)=>{  //使用连接池对象的 query() 方法执行了一个 SQL 查询操作
        if( error ){  //一旦查询完成，会触发回调函数，其中 error 参数用于捕获任何查询过程中可能出现的错误，而 result 参数则包含了查询结果
            res.status(500).json({ error: error.message})//如果查询失败，服务器会返回一个状态码为 500 的 JSON 响应，其中包含了错误消息。
        }
        res.status(200).json(result.rows) //如果查询成功，服务器会返回一个状态码为 200 的 JSON 响应，其中包含查询结果中的所有数据行
    })*/
  /*  console.log(query)
    try{
        const result = await query('SELECT * FROM task')
        const rows = result.rows ? result.rows : []
        res.status(200).json(rows)
    }catch(error){
        console.log(error)
        res.statusMessage = error
        res.status(500).json({error: error})
    }
})
*/

/*app.delete("/delete/:id",async(req,res) => {
   /* const pool = openDb()
    const id = parseInt(req.params.id)
    pool.query('delete from task where id = $1',
    [id],
    (error,result) => {
        if (error){
            res.status(500).json({error: error.message})
        }else{
            res.status(200).json({id:id})
        }
    })
    */
  /* const id = Number(req.params.id)
   try{
    const result = await query('delete from task where id = $1',
    [id])
    res.status(200).json({id:id})
   }catch(error){
       console.log(error)
       res.statusMessage = error
       res.status(500).json({error: error})
}
})

app.post("/new",async(req,res) => {
   /* const pool = openDb()

    pool.query('insert into task (description) values ($1) returning *',
    [req.body.description],
    (error,result) =>{
        if (error){
            res.status(500).json({error: error.message})
        }else{
            res.status(200).json({id: result.rows[0].id})
        }
    })*/
    /*try{
        const result = await query('insert into task (description) values ($1) returning *',
        [req.body.description])
        res.status(200).json({id: result.rows[0].id})
    }catch(error){
        console.log(error)
        res.statusMessage = error
        res.status(500).json({error: error})
    }
})//定义了一个 POST 请求的路由，当客户端发送 POST 请求到 /new 路径时，服务器会执行这个路由的回调函数。

/*const openDb = () => { //打开数据库连接池的函数
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database:'todo',
        password: '161019',
        port: 5432
    })
    return pool
}
*/
/*const openDb = () => {
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT
    })
    return pool
}
*/

//app.listen(port) //启动服务器，监听端口 3001。

//当我们创建一个 Node.js 服务器时，通常会使用一些库来简化开发过程。
//使用了 Express 和 Cors 库来创建一个简单的服务器。

require('dotenv').config()
// console.log(process.env)
const express = require('express')
const cors = require('cors')
// const { Pool } = require('pg')
const todoRouter =require('./routes/todo.js')
// const { query } = require('./helpers/db.js')

// const { error } = require('console');


const app = express()
app.use(cors()) 
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/', todoRouter);

const port = process.env.PORT

// app.get("/", async (req, res) => { 
//     console.log(query)
//     try {
//         const result = await query('select * from task')
//         const rows = result.rows ? result.rows : []
//         res.status(200).json(rows)
//     } catch (error) {
//         console.log(error)
//         res.statusMessage = error
//         res.status(500).json({ error: error })
//     }
// })

// app.post("/new", async (req, res) => { 
//     try {
//         const result = await query('insert into task (description) values ($1) returning *',
//         [req.body.description]);
//         res.status(200).json({ id: result.rows[0].id })
//     } catch (error) {
//         console.log(error)
//         res.statusMessage = error
//         res.status(500).json({ error: error })
//     }
// })


// app.delete("/delete/:id",async(req,res)=>{
//     const id =parseInt(req.params.id)
//    try{ const result = await query('delete from task where id = $1',
//    [id])
//    res.status(200).json({ id:id })
//    }catch(error){
//     console.log(error)
//     res.statusMessage = error
//     res.status(500).json({ error: error })
//    }
// })

// const openDb = () => { 
//     const pool = new Pool({
//         user: process.env.DB_USER,
//         host: process.env.DB_HOST,
//         database:process.env.DB_NAME,
//         password:process.env.DB_PASSWORD,
//         port: process.env.DB_PORT
//     })
//     return pool
// }



app.listen(port) 