const express = require('express')
const banco = require("./banco")
const veiculo = require("./veiculo")

const app = express()
app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  });

banco.conexao.sync( function(){
    console.log("Banco de dados conectado.");
})

const PORTA = 3000
app.listen( PORTA, function(){
    console.log("Servidor iniciados na porta "+PORTA);
})

app.get("/veiculos/",async function(req, res) {
    const resultado = await veiculo.veiculo.findAll()
    res.json(resultado);
})

app.get("/veiculos/:id",async function(req, res) {
    const resultado = await veiculo.veiculo.findByPk(req.params.id)
    if( resultado == null ){
        res.status(404).send({})
    }else{
        res.json(resultado)
    }
})

app.post("/veiculos/",async function(req,res){
    const resultado = await veiculo.veiculo.create({
        modelo:req.body.modelo,
        ano:req.body.ano
    })
    res.json(resultado)
})

app.put("/veiculos/:id",async function(req,res){
    const resultado = await veiculo.veiculo.update({
        modelo:req.body.modelo,
        ano:req.body.ano
    },{
        where:{id: req.params.id}
    })
    if( resultado == 0){
        res.status(404).send({})
    }else{
        res.json( await veiculo.veiculo.findByPk(req.params.id))
    }
})

app.delete("/veiculos/:id",async function(req,res){
    const resultado = await veiculo.veiculo.destroy({
        where:{
            id:req.params.id
        }
    })
    if( resultado == 0 ){
        res.status(404).send({})
    }else{
        res.status(204).send({})
    }
})