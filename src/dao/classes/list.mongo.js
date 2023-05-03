import listModel from "../models/list.model.js";

export default class ListManager{
    constructor(){}

    get = async()=>{
        try{
            return await listModel.find().lean();
        }
        catch (err) {
            throw err;
        }
    }

    getId = async(id)=>{
        try{
            return await listModel.findById(id).lean();
        }
        catch (err) {
            throw err;
        }
    }


    create = async(name)=>{
        try{
            const newList = new listModel(name);
            await newList.save();
            return newList;
        }
        catch (err) {
            throw err;
        }
    }

    addPacient = async(pacient)=>{
        try{
            let list = await listModel.findById(pacient.id)
            console.log(list.name)

            let newPacient ={
                date: pacient.date,
                last: pacient.last,
                name: pacient.name,
                telephone: pacient.telephone,
                email: pacient.email,
                turno: pacient.turno,
                servicio: list.name,
                ofrecimientos: pacient.ofrecimientos?pacient.ofrecimientos:0,
                observaciones: pacient.observaciones
            }
            list.list.push(newPacient)
            list.save()
        }   
        catch (err) {
            throw err;
        }
    }

    deletePacient = async(list,pacient)=>{
        try{
            console.log(list)
            console.log(pacient)
            let result = await listModel.findOneAndDelete({_id:list, })
        }   
        catch (err) {
            throw err;
        }
    }
}