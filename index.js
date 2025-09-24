import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma =  new PrismaClient();

app.use(express.json());

app.post("/user", async (req, res) => {
    const { name, email } = req.body;
    const user = await prisma.user.create({data: {  name, email}})

    res.json(user);
});

app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();

    res.json(users);

})

app.get("/users/:id", async (req,res) => {
    const {id} = await prisma.user.findUnique({where: { id: Number(id) } })
    if(!user){
        return res.status(400).json({   error: "usuario não encontrado"});
    }
    res.json(user);
});

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", uptime: process.uptime() });
});


app.listen(3000, ()=>{
    console.log("Server em localhost:3000")
})