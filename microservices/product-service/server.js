const express = require('express');
const app = express();
app.use((req,res,next)=>{res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Methods','GET,OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type');if(req.method==='OPTIONS')return res.sendStatus(204);next();});
const PORT = process.env.PORT || 3001;
const products = [
 {id:1,name:'Everyday Backpack',category:'Accessories',price:1299,emoji:'🎒',description:'A lightweight bag for everyday adventures.'},
 {id:2,name:'Wireless Headphones',category:'Electronics',price:1999,emoji:'🎧',description:'Comfortable listening, wherever you go.'},
 {id:3,name:'Classic Sneakers',category:'Footwear',price:2499,emoji:'👟',description:'Clean style made for all-day comfort.'},
 {id:4,name:'Insulated Bottle',category:'Lifestyle',price:599,emoji:'🥤',description:'Keep your drink close throughout the day.'}
];
app.get('/health',(_req,res)=>res.json({service:'product-service',status:'ok'}));
app.get('/api/products',(_req,res)=>res.json(products));
app.listen(PORT,()=>console.log(`Product Service listening on ${PORT}`));
