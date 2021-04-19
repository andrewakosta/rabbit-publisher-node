const amqp = require('amqplib');
require('colors');
const rabbitSetting = {
     protocol:'amqp',
     hostname:'localhost',
     port:5672,
     username:"admin",
     password:"andres",
     vhost:'/',
     authMechanism:["PLAIN","AMQPLAIN","EXTERNAL"]
}

connect();
async function connect(){
    try {
       const connection = await amqp.connect(rabbitSetting);
       console.log("Conection suceess".green);

       const channel = await connection.createChannel();
       console.log("Channel create".blue + channel);

       const orders = await  channel.assertQueue("orders");
       console.log("Que created".cyan + orders);
        

       channel.prefetch(1)
       channel.consume("orders", order => {
           let orderJ = JSON.parse(order.content.toString());
            console.log(orderJ);
            setTimeout(function() {
                
            }, 10000);  
       })
    } catch (error) {
        console.log(error.toString());
    }
}