import app from "./app";
const port = process.env.PORT ? process.env.PORT : 4333;
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});


/*

   GET  => OBTER 
   POST => POSTAR 
   PUT  => ATUALIZAR
   DELETE => DELETER 

   MC


   MODEL  = DB
   const user = {
    name:"Erick", 
    id:"123"
   }

   Controller
   recebe informacao => trata  => banco 

   Router  = 



    router => controler 

    C
    R
    U
    D

*/