const fs = require("fs");

module.exports = class Container {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  async save(object) {
    try {
      const resp = await fs.promises.readFile(this.nombreArchivo, "utf8");
      const respJson = JSON.parse(resp);
      respJson.push({
        title: object.title, //
        price: object.price,
        thumbnail: object.thumbnail,
        id: respJson.length + 1
      });
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(respJson, null, 2)
      );
      console.log(`id: ${respJson.length}`);
    } catch (err) {
      console.log(err.message);
    }
  }

  async getById(number) {
    try {
      const resp = await fs.promises.readFile(this.nombreArchivo, "utf8");
      const respJson = JSON.parse(resp);
      const getId = respJson.find((num) => num.id === parseInt(number));
      if (getId != undefined) {
        return getId;
      } else {
        console.log(null);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async getAll() {
    try {
      const resp = await fs.promises.readFile(this.nombreArchivo, "utf8");
      const respJson = JSON.parse(resp);
      return respJson;
    } catch (err) {
      console.log(err.message);
    }
  }

  async deleteById(number) {
    try {
      const resp = await fs.promises.readFile(this.nombreArchivo, "utf8");
      const respJson = JSON.parse(resp);
      let ojeto = respJson.find((num) => num.number === parseInt(number));
      respJson.splice(respJson.indexOf(ojeto), 1);
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(respJson, null, 2)
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  async deleteAll() {
    try {
      const resp = await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify([], null, 2)
      );
      console.log("Se han borrado");
    } catch (err) {
      console.log(err.message);
    }
  }
};

//const productos = new Container("./productos.txt");

//productos.save({ title: "jarry potter", price: 200})
//productos.getById(3);
//productos.getAll();
//productos.deleteById(2)
//productos.deleteAll();
