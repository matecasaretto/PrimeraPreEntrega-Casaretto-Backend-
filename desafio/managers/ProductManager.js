// En la clase ProductManager

import fs from 'fs/promises';

const path = './files/Products.json';

export default class ProductManager {
  async consultarProductos() {
    try {
      await fs.access(path);
      const data = await fs.readFile(path, 'utf-8');
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      } else {
        console.error('Error al consultar productos:', error.message);
        throw error;
      }
    }
  }

  async addProduct(newProduct) {
    try {
      let products = await this.consultarProductos();
      
      if (!Array.isArray(products)) {
        products = [];
      }

      if (products.length === 0) {
        newProduct.id = 1;
      } else {
        newProduct.id = products[products.length - 1].id + 1;
      }

      products.push(newProduct);

      await fs.writeFile(path, JSON.stringify(products, null, '\t'));
      
      return products;
    } catch (error) {
      console.error('Error al agregar producto:', error.message);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.consultarProductos();
      const product = products.find(product => product.id === id);

      if (product) {
        return product;
      } else {
        console.log(`No se encontró ningún producto con el ID ${id}.`);
        return null;
      }
    } catch (error) {
      console.error('Error al obtener producto por ID:', error.message);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      let products = await this.consultarProductos();
  
      const indexToRemove = products.findIndex(product => product.id === id);
  
      if (indexToRemove !== -1) {
        products.splice(indexToRemove, 1);
        await fs.writeFile(path, JSON.stringify(products, null, '\t'));
        console.log(`Producto con ID ${id} eliminado.`);
      } else {
        console.log(`No se encontró ningún producto con el ID ${id}. No se eliminó nada.`);
      }
    } catch (error) {
      console.error('Error al eliminar producto por ID:', error.message);
      throw error;
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      let products = await this.consultarProductos();

      const indexToUpdate = products.findIndex(product => product.id === id);

      if (indexToUpdate !== -1) {
    
        updatedProduct.id = id;

        products[indexToUpdate] = updatedProduct;

        await fs.writeFile(path, JSON.stringify(products, null, '\t'));
        
        console.log(`Producto con ID ${id} actualizado.`);
      } else {
        console.log(`No se encontró ningún producto con el ID ${id}. No se realizó ninguna actualización.`);
      }
    } catch (error) {
      console.error('Error al actualizar producto por ID:', error.message);
      throw error;
    }
  }
}
