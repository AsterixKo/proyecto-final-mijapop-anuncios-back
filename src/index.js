//CONFIGURAMOS dotenv
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pruebaRouter = require('./routes/pruebaRouter');
const bookRouter = require('./routes/bookRouter');
const authorRouter = require('./routes/authorRouter');
const userRouter = require('./routes/userRouter');
const provinceRouter = require('./routes/provinceRouter');
const categoryRouter = require('./routes/categoryRouter');
const subcategoryRouter = require('./routes/subcategoryRouter');
const productStatusRouter = require('./routes/productStatusRouter');
const productRouter = require('./routes/productRouter');
const productFavoriteRouter = require('./routes/productFavoriteRouter');
const conversationRouter = require('./routes/conversationRouter');
const messageRouter = require('./routes/messageRouter');
const mongoose = require('mongoose');


const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

mongoose.connect(
    `mongodb+srv://${process.env.MATLAS_USER}:${process.env.MATLAS_PASS}@cluster0.xyydi.mongodb.net/mijapop?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });

//pruebas
app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.use('/users', userRouter);
app.use('/provinces', provinceRouter);
app.use('/categories', categoryRouter);
app.use('/subcategories', subcategoryRouter);
app.use('/productStatus', productStatusRouter);
app.use('/products', productRouter);
app.use('/productFavorites', productFavoriteRouter);
app.use('/conversations', conversationRouter);
app.use('/messages', messageRouter);

app.get('/', (req, res) => {
    res.status(200).send('<h2>Llama a la ruta específica</h2>')
});

app.listen(3000, () => console.log('Aplicacion corriendo en el puerto 3000'));