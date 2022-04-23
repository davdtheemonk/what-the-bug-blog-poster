const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParserErrorHandler = require('express-body-parser-error-handler')

require('dotenv').config()

const BASE_URL = "https://wtb-v1.herokuapp.com/posts/api/v1/"

const app =express();
const port = process.env.PORT ||5000;

app.use(bodyParserErrorHandler());
app.use(cors());
app.use(express.json());
const postsRouter = require('./routes/posts');
app.use('/posts',postsRouter);


app.listen(port,()=>{
    console.log('Server is running');
})
