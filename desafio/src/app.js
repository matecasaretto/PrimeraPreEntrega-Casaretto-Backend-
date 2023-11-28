import express from 'express';
import ProductManager from "./managers/ProductManager.js";
import { CartManager } from './managers/CartManager.js';
import { cartRouter } from './routes/carts.routes.js';
import { productsRouters } from './routes/products.routes.js';
import { __dirname } from "./utils.js"; 


const app = express();
const PORT = 8096;


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});

//RUTAS
app.use("/api/products", productsRouters);
app.use("/api/carts", cartRouter)

