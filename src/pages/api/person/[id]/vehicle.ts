import { NextApiRequest, NextApiResponse } from 'next';

export default function getVehiclesByPersonId(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'GET') {
        res.status(500).json({message: 'sorry we only accept GET requests'})
    }
    res.json({byId: req.query.id, message: 'getVehiclesByPersonId'});
}