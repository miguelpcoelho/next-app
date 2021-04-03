import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

export default async function getVehiclesByPersonId(req: NextApiRequest, res: NextApiResponse){
    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });
    
    if(req.method !== 'GET') {
        res.status(500).json({message: 'sorry we only accept GET requests'})
    }

    const allVehicles = await db.all('SELECT * FROM vehicle where ownerId = ?', [req.query.id]);
    
    res.json(allVehicles);
}