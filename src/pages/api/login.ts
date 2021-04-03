import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'
import {compare} from 'bcrypt'
import {sign} from 'jsonwebtoken'
import { secret } from '../../../api/secret';
import { serialize } from 'cookie';

export default async function login(req: NextApiRequest, res: NextApiResponse){
    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    if(req.method === 'POST') {
        const person = await db.get('SELECT * FROM person where email = ?', [req.body.email]);

        compare(req.body.password, person.password, function(err, result) {
            if(!err && result) {
                const claims =  {subject: person.id, personEmail: person.email};
                const jwt = sign(claims, secret, {expiresIn: '1h'})

                res.setHeader('Set-Cookie', serialize('auth', jwt, {
                    httpOnly: true, //javascript doesn't have access to the cookie
                    secure: process.env.NODE_ENV !== 'development', //cookie only tranfered over https
                    sameSite: 'strict',
                    maxAge: 3600,
                    path: '/'
                }))
                res.json({message: 'Welcome back!'})
            } else {
                res.json({message: 'Ups! Something went wrong'})
            }
        });
    }
    else {
        res.status(405).json({message: 'Only support POST'});
    }
}