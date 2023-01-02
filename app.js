const express= require('express')
const cors = require('cors');
const mongoose = require('mongoose')

const app = express()

require('dotenv').config({path:'./.env'})
const session = require('cookie-session')



app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(cors())
app.use(session({

    secret:'Karl241988',
    resave:true,
    saveUninitialized:true

}))




const conexion=require('./database/db');
//app.set('view-engine','ejs')
app.use(express.urlencoded({extended:false}))

//  app.get('/',function(req,res){
   
//  })

// app.get('/login',(req,res)=>{

 

// })

// app.get('/register',(req,res)=>{

   

// })
// app.get('/boletas',(req,res)=>{

    

// })




// //obtener todas las boletas

app.get('/api/boletas',(req,res)=>{

    conexion.query('SELECT * FROM boletas', (error,filas)=>{

        if(error){
            throw error;
        }else{
            res.send(filas)
        }
    })
 })
// process.on('uncaughtException', function(err) {
//     console.log(err);
//   });
// //modificar boleta

app.put('/api/boletas/:id',(req,res)=>{
    
    let id=req.params.id
    let titulo=req.body.titulo
    let descripcion=req.body.descripcion
    let valor=req.body.valor
    
    let sql="UPDATE boletas SET titulo=?, descripcion=?,valor=? WHERE id=?";
    conexion.query(sql,[titulo,descripcion,valor,id],function(error,results){
        if(error){
            throw error;
        }else{
            //res.send(results);
            res.send(results)
        }
    })
});
//DELETE
app.delete('/api/boletas/:id',(req,res)=>{
    
    let id=req.params.id
    let sql="DELETE FROM boletas WHERE id=?";
    conexion.query(sql,[id],function(error,results){
        if(error){
            throw error;
        }else{
            res.send(results);
          
        }
    })
});




app.post('/api/boletas',(req,res)=>{
    let data = {
        titulo:req.body.titulo,
        descripcion:req.body.descripcion,
        valor:req.body.valor
    };
    let sql="INSERT INTO boletas SET ?";
    conexion.query(sql,data,function(error,results){
        if(error){
            throw error;
        }else{
            
            res.send(results)
        }
    })
});

app.post('/api/add/user',(req,res)=>{
    let data = {
        id_usuario:req.body.id_usuario,
        nombre_usuario:req.body.nombre_usuario,
        estado:req.body.estado,
        id_privilegio:req.body.id_privilegio,
        email:req.body.email
    };
    let sql="INSERT INTO usuarios SET ?";
    conexion.query(sql,data,function(error,results){
        if(error){
            throw error;
        }else{
            
            res.send(results)
        }
    })
});

app.post('/api/add/credito',(req,res)=>{
    let data = {
        id_usuario:req.body.id_usuario,
        creditos:req.body.creditos
    };
    let sql="INSERT INTO creditos SET ?";
    conexion.query(sql,data,function(error,results){
        if(error){
            throw error;
        }else{
            
            res.send(results)
        }
    })
});
app.get('/api/creditos/user/:id_usuario',(req,res)=>{

    conexion.query('SELECT creditos FROM  creditos WHERE id_usuario=?',[req.params.id_usuario], (error,fila)=>{

        if(error){
            throw error;
        }else{
           res.send(fila)
        }

    })

})

app.get('/api/get/user/:id_usuario',(req,res)=>{

    conexion.query('SELECT usuarios.nombre_usuario, usuarios.email, usuarios.id_privilegio, usuarios.estado, creditos.creditos FROM  usuarios,creditos WHERE creditos.id_usuario= usuarios.id_usuario and usuarios.id_usuario=?',[req.params.id_usuario], (error,fila)=>{

        if(error){
            throw error;
        }else{
           res.send(fila)
        }

    })

})





app.get('/api/boletas/:id',(req,res)=>{

    conexion.query('SELECT * FROM boletas WHERE id=?',[req.params.id], (error,fila)=>{

        if(error){
            throw error;
        }else{
           res.send(fila)
        }

    })

})

app.post('/api/boletas/user/registro',async (req,res)=>{
    
    try{
        const hasehdPass = await bcrypt.hash(req.body.password,10)

        let data = {
            nombre_usuario:req.body.nombre_usuario,
            email:req.body.email,
            password:hasehdPass
        };
        let sql="INSERT INTO usuarios SET ?";
        conexion.query(sql,data,async(error,results)=>{
            if(error){
                //res.redirect({registroStatus:"error",titulo:"Error registro",error:error},'/register')   
                // res.render('register.ejs',{

                //     registroStatus:"error",
                //     titulo:"Error registro",
                //     error:error

                // })
                res.send(results);
            }else{
                 //res.send(results);
                
                res.send(results);
            }
        })
    

    }catch{
        throw error;
    }

})


//login en construcción
app.post('/api/boletas/login',(req,res)=>{
    // try{
    //     const hasehdPass = await bcrypt.compare()
    //     let data = {
    //         nombre_usuario:req.body.nombre_usuario,
    //         email:req.body.email,
    //         password:hasehdPass
    //     };
    //     let sql="INSERT INTO usuarios SET ?";
    //     conexion.query(sql,data,function(error,results){
    //         if(error){
    //             throw error;
    //         }else{
    //             res.send(results);
    //         }
    //     })

    // }catch{
    //     throw error;
    // }

})

app.route('/*')
    .get(function(req, res) {
          res.sendFile(path.join(__dirname + '/dist/index.html'));
});

module.exports = app;


const puerto = 3000;
app.listen(process.env.PORT || puerto,function(){

    console.log("Servidor Ok en puerto:"+puerto);

})

