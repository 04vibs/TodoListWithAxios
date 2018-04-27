const express=require('express');
const path=require('path');
const app=express();

app.use(express.json())

app.use(express.urlencoded({
        extended:true

}))

app.use('/',express.static(__dirname+'/public'))

const routes={
    todos:require('./routes/todos')

}

app.use('/todos',routes.todos)

app.listen(3000, function () {
    console.log("server started on port 3000");
});