const route = require('express').Router()

const Sequelize=require('sequelize');

const db=new Sequelize('ngrwsdb','ngrusr','ngrpass',{
    dialect:'sqlite',

    storage:'./xyz.db'
})
const Todo=db.define('todo',{
    task:{
        type:Sequelize.STRING(40),
        allowNull:false
    },
    done:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    }
})

db.authenticate()
         .then( ()=>console.log("we can connect to db"),
         db.sync()
             )
         .catch((err)=>console.log(err))

let todos = []

route.get('/',(req,res)=>{
    Todo.findAll({
        attributes:['id','task','done']

    }).then((list)=>{
        console.log(list);
        res.json(list)
    })
    
})

//  route.get('/', (req, res) => res.json(
    
//      todos.map((t, i) =>
//     ({
//          id: i,
//          task: t.task,
//          done: t.done
//      })
//  )))
//  console.log(Todo.findAll())
// Todo.findAll();

route.post('/', (req, res) => {
    if (typeof req.body.done === 'string') {
        req.body.done = (req.body.done === 'true')
    }

    let newTodo = {
        task: req.body.task,
        done: req.body.done

    }
    todos.push(newTodo)
    //db 
    Todo.create({task:req.body.task,done:false})
    res.json({       
        id: todos.length - 1,
        task: newTodo.task,
        done: newTodo.done
    })
})

// route.put('/:id',(req,res)=>{
//     todos[req.params.id].done=!todos[req.params.id].done

//     res.json(todos[req.params.id])
// })

route.put('/:id',(req,res)=>{
    //todos[req.params.id].done=!todos[req.params.id].done
    console.log("Insideupdate");
    Todo.update({done:true},{
        where:{
            id:req.params.id
        }
    }).then(() => {
        res.json(todos[req.params.id])
    })
})




// route.delete('/', (req, res) => {
    
//     todos = todos.filter((todo)=> !todo.done)
//     res.json(todos.map((t, i) =>
//     ({
//         id: i,
//         task: t.task,
//         done: t.done
//     })
// ))
// })
route.delete('/',(req,res)=>{
    Todo.destroy({
        where:{done:true}
    }).then((list)=>{
       t= Todo.findAll({
            attributes:['id','task','done']
    
        }).then(t)
        console.log(t);
        res.json(t)
    })
    
})


module.exports = route