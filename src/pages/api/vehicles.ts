import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

export default async function getAllVehicle(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'GET') {
        res.status(500).json({message: 'sorry we only accept GET requests'})
    }
    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    const vehicles = await db.all('SELECT * FROM vehicle');
    
    res.json(vehicles);}