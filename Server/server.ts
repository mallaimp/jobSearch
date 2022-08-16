import express, { Application, Request, Response } from "express";
import dotnev from "dotenv";
import { dbConnection } from "./Database/Connection/dbConnection";
import userRouter from "./Routers/UserRouters/userRouter";
import userProfileRouter from "./Routers/UserRouters/userProfileRouter";
import jobRouter from "./Routers/AdminRouters/jobRouters";
import cors from "cors";
const app:Application = express();

dotnev.config({
    path:"./.env"
})

app.use(express.json());

const port:number | undefined = Number(process.env.PORT)||9393;

//Db Configuration
const dbUrl:string | undefined = process.env.MONGO_DB_URL;
const dbName:string | undefined = process.env.DATA_BASE_NAME;

if(dbUrl && dbName){
    dbConnection.connectToDB(dbUrl,dbName).then((response)=>{
        console.log(response);
    }).catch((err)=>{
        console.log(err);
    })
}

app.get("/",(request:Request, response:Response)=>{
    response.status(200);
    response.json({
        msg:"Welcome TO Express Server"
    })
})

app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/profiles", userProfileRouter);
app.use("/api/jobs", jobRouter);

if(port){
    app.listen(port,()=>{
        console.log(`Express Js Server Started`);
    })
}
