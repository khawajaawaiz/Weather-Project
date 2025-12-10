import express from 'express';
import hbs from 'hbs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

const PublicPath = path.join(__dirname, '../Public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(PublicPath));

import weatherData from '../utils/weatherData.js';

app.get('/', (req, res) => {
    res.render("index", {title: "Weather App"});
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    weatherData(req.query.address, (error, result) => {
        if (error) {
            return res.send({ error });
        }
        res.send(result);
    });   
});

app.use((req, res) => {
    res.render("404", {title: "Page Not Found"});
});

app.listen(port, () => {
    console.log(`Server is Listening on http://localhost:${port}`);
});