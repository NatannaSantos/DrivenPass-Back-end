import { Request,Response } from "express";
import * as wifiService from "../services/wifiService.js"

export async function createWifi(req:Request, res:Response){
    const wiFi = req.body;
    const {user} = res.locals;
    
    await wifiService.createWifi ({...wiFi,userId:user.id});

    return res.sendStatus(201);
}

export async function findWifi(req:Request, res:Response){
    const {user} = res.locals;

    const wifi = await wifiService.findWifi(user.id);

    return res.status(200).send(wifi);
}

export async function findWifiById(req:Request,res:Response){
    const {user} = res.locals;
    const {id}=req.params;

    const wifi = await wifiService.findWifiById(Number(id),user.id);

    return res.status(200).send(wifi);
}

export async function deleteWifi(req:Request,res:Response){
    const {user} = res.locals;
    const {id} = req.params;

    await wifiService.deleteWifi(user.id,Number(id));

    return res.sendStatus(200);
}
