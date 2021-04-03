import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'
import { authenticated } from './authenticated';

export default authenticated(async function getAllVehicle(req: NextApiRequest, res: NextApiResponse){
    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });
    
    if(req.method !== 'GET') {
        res.status(500).json({message: 'sorry we only accept GET requests'})
    }
    
    const vehicles = await db.all('SELECT * FROM vehicle');
    
    res.json(vehicles);
})