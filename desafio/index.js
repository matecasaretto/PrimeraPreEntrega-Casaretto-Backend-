// index.js

import ProductManager from "./managers/ProductManager.js";

const manager = new ProductManager();

const env = async () => {
  try {
    let primerConsulta = await manager.consultarProductos();
    console.log("Consulta de productos:", primerConsulta);

    let product = {
      title: 'Pantalón',
      description: 'Pantalón de cuero',
      price: 1000,
      thumbnail: 'pantalon.jpg',
      code: 123,
      stock: 5,
      id: 1
    };

    let result = await manager.addProduct(product);
    console.log("Producto agregado:", result);

    let productIdToRetrieve = 2;
    let productById = await manager.getProductById(productIdToRetrieve);
    console.log(`Producto con ID ${productIdToRetrieve}:`, productById);

    let productIdToUpdate = 3;
    let updatedProductData = {
      title: 'Pantalón Update',
      description: 'Pantalón de cuero Update',
      price: 1200 ,
      thumbnail: 'pantalon_Update.jpg',
      code: 456,
      stock: 8,
    };

    await manager.updateProduct(productIdToUpdate, updatedProductData);
    console.log(`Producto con ID ${productIdToUpdate} actualizado.`);

    let productIdToDelete = 0; //Coloco el id 0 para no eliminar ningun producto, pero simplemente debemos cambiar el id por el que queramos para eliminar un producto
    await manager.deleteProduct(productIdToDelete);
    console.log(`Producto con ID ${productIdToDelete} eliminado.`);

  } catch (error) {
    console.error('Error en la operación:', error.message);
  }
};

env();
