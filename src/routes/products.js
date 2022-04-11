const express = require('express');
const path = require('path');
let Contenedor = require('../../classContainer.js');
let controlador = new Contenedor("products.json")

const app = express();
const servidor = app.listen(8080, () => {
    console.log("servidor corriendo en puerto " + 8080);
})
app.set('view engine', 'pug');
//console.log("viewsPath: ", viewsPath);

app.set(express.static(__dirname, '/views'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


/*
app.get("/", (req, res) => {
    res.render('formulario');
});*/

app.get("/productos", (req, res) => {
    controlador.getAll().then(productos => {
        res.render('productos', {
            productos
        });
    })
});

app.post("/productos", (req, res) => {
    const {
        title,
        price,
        thumbnail
    } = req.body;
    if (
        typeof title != "undefined" &&
        typeof price != "undefined" &&
        typeof thumbnail != "undefined"
    ) {
        controlador.save(req.body).then(producto => {
            res.redirect("/productos");
        })
    }
});

servidor.on("error", (err) => {
    console.log("error", err);
})