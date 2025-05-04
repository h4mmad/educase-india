import {Request, RequestHandler, Response} from 'express';
import { AddSchoolPayload, ListSchoolsQuery, SchoolWithDistance } from "../schemas/school";
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';
import db from '../db';


export const addSchoolHandler: RequestHandler<{}, {}, AddSchoolPayload> =
  async (req, res) => {
    // Now TS knows `req.body` is AddSchoolPayload:
    const { name, address, latitude, longitude } = req.body;
    
    try{
      const id = uuidv4()
       await db.execute<ResultSetHeader>(
      `INSERT INTO schools (id, name, address, latitude, longitude)
       VALUES (?, ?, ?, ?, ?)`,
      [id, name, address, latitude, longitude]
    );
    res.status(201).json({id});
  }catch(err:any){
    console.error("Error inserting school:", err);
    res.status(500).json({ error: 'Could not add school' });
  }
  };

export const listSchoolHandler : RequestHandler<unknown, any, any, ListSchoolsQuery> = 
async(req, res)=>{
    const {latitude, longitude} = req.query;
    const sql = `
      SELECT
        id,
        name,
        address,
        latitude,
        longitude,
        (6371 * ACOS(
           COS(RADIANS(?)) *
           COS(RADIANS(latitude)) *
           COS(RADIANS(longitude) - RADIANS(?)) +
           SIN(RADIANS(?)) *
           SIN(RADIANS(latitude))
        )) AS distance
      FROM schools
      ORDER BY distance;
    `;
  
    try{
      const [rows] = await db.execute<RowDataPacket[]>(sql, [latitude, longitude, latitude]);
      const schools: SchoolWithDistance[] = rows.map(r => ({
        id:        r.id as string,
        name:      r.name as string,
        address:   r.address as string,
        latitude:  Number(r.latitude),
        longitude: Number(r.longitude),
        distance:  Number(r.distance),
      }));
  
      res.json(schools)
    }catch(err: any){
      console.error("Error reading from db:", err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }