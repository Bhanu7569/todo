const expxress = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const Model = require('./model.js')

const app = expxress();

app.use(cors())
app.use(expxress.json())


mongoose.connect('mongodb+srv://bhanu:bhanu123@cluster0.9dphyiu.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0').then(
    ()=>{
        console.log("DB is connected!")
    }
)

app.get('/get', async(req, res)=>{
    try{
        const user = await Model.find({})
        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json({msg : error.msg})
    }
})

app.post('/addtodo', async(req, res)=>{
    const {todo} = req.body
    try{
        const user = await Model.create({todo});
        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json({msg : error.msg})
    }
})


app.put('/updatetodo/:id', async(req, res)=>{
    const { id } = req.params
    try{
        const user = await Model.findByIdAndUpdate({_id : id}, {todo : req.body.todo});
        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json({msg : error.msg})
    }
})

app.delete('/deletetodo/:id', async(req, res)=>{
    const { id } = req.params
    try{
        const user = await Model.findByIdAndDelete({_id : id});
        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json({msg : error.msg})
    }
})

app.listen(5000, (req, res)=>{
    console.log("Server is running...!")
})