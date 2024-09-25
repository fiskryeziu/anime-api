import express, { urlencoded, json, Request, Response, NextFunction } from "express";
import morgan from 'morgan'
import animeRoute from './routes/animeRoute'
import { errorHandler, notFound } from "./middlewares/errorMiddleware";
import { cacheMiddleware } from "./middlewares/cacheMiddleware";

const port = process.env.PORT || 5000
const app = express();


app.use(urlencoded({ extended: true }));
app.use(json());
app.use(morgan('dev'))



app.get("/", (req, res) => {
    res.status(200).json({ msg: "Server is up and running" });
});


app.use('/api/anime', cacheMiddleware, animeRoute)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
})
