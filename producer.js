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
    const ordersA = [
        {
            id:"CAKJHFYSVCVXGKDLA",
            status:"IN_TRANSIT"
        },
        {
            id:"CAKJHFYSBDGKDLA",
            status:"RESERVED"
        },
        {
            id:"CVXCVZBZVCXVXB",
            status:"CANCELED"
        },
        {
            id:"CAKHFYSBDGKDLA",
            status:"AWAITING_FOR_CONFIRMATION"
        },
        {
            id:"CAKJHFYSVCVXGKDLA",
            status:"IN_TRANSIT"
        },
        {
            id:"CAKJHFYSBDGKDLA",
            status:"RESERVED"
        },
        {
            id:"CVXCVZBZVCXVXB",
            status:"CANCELED"
        },
        {
            id:"CAKHFYSBDGKDLA",
            status:"AWAITING_FOR_CONFIRMATION"
        }
    ]
    try {
       const connection = await amqp.connect(rabbitSetting);
       console.log("Conection suceess".green);

       const channel = await connection.createChannel();
       console.log("Channel create".blue + channel);
       

       const orders = await  channel.assertQueue("orders");
       console.log("Que created".cyan + orders);

       channel.prefetch(1)

        for(let order in ordersA){
            await channel.sendToQueue("orders", Buffer.from(JSON.stringify(ordersA[order])));
            console.log("Message sent".yellow);
        }  
    } catch (error) {
        console.log(error.toString());
    }
}