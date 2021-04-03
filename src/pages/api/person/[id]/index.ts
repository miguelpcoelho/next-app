import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

export default async function getPersonById(req: NextApiRequest, res: NextApiResponse){
    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    if(req.method === 'PUT') {
        const statement = await db.prepare('UPDATE person SET name = ?, email = ? where id = ?');
        const result = await statement.run(
            req.body.name, 
            req.body.email, 
            req.query.id
        );
        result.stmt.finalize();
    }

    const person = await db.get('SELECT * FROM person where id = ?', [req.query.id]);
    
    res.json(person);
}