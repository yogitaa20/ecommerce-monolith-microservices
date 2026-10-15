const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
app.use(express.json());
app.use((req,res,next)=>{res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type');if(req.method==='OPTIONS')return res.sendStatus(204);next();});
let orders=[];let nextOrderId=2001;
app.get('/health',(_req,res)=>res.json({service:'order-service',status:'ok'}));
app.get('/api/orders',(_req,res)=>res.json(orders));
app.post('/api/orders',(req,res)=>{
 const {items,customerName}=req.body||{};
 if(!Array.isArray(items)||!items.length)return res.status(400).json({error:'Your cart is empty.'});
 const lines=[];
 for(const item of items){const id=Number(item.id),quantity=Math.floor(Number(item.quantity)),price=Number(item.price);if(!Number.isInteger(id)||id<1||!Number.isFinite(quantity)||quantity<1||quantity>20||!Number.isFinite(price)||price<1)return res.status(400).json({error:'Please check your cart quantities.'});lines.push({id,name:String(item.name||`Product ${id}`).slice(0,100),price,quantity})}
 const order={id:nextOrderId++,customerName:String(customerName||'Guest').trim().slice(0,80)||'Guest',items:lines,total:lines.reduce((s,x)=>s+x.price*x.quantity,0),createdAt:new Date().toISOString()};orders.unshift(order);res.status(201).json(order);
});
app.listen(PORT,()=>console.log(`Order Service listening on ${PORT}`));
