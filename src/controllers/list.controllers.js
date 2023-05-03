import ListManager from "../dao/classes/list.mongo.js";
import listModel from "../dao/models/list.model.js";
const listManager = new ListManager()

const getList = async(req,res)=>{
    try{
        let result = await listManager.get()

        if (result){
            res.status(200).json(result)
        }
        else{
            res.status(404).json({status:"error", message: "No lists"})
        }
    }
    catch(error){
        throw error
    }
}

const createList = async(req,res)=>{
    try{
        let name = req.body
        let result = await listManager.create(name)
        res.status(200).send(result)
    }
    catch(error){
        throw error
    }
}

const createItem = async(req,res)=>{
    try{
        let data = req.body.pacient
        data.date = new Date()

        let validaName = /^[a-zA-ZÀ-ÿ\s]{1,50}$/.test(data.name)
        let validPhone = /^\d{7,14}$/.test(data.telephone)
        let validEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(data.email)
        let validObservaciones = /^[a-zA-ZÀ-ÿ\s]{1,50}$/.test(data.observaciones)
        
        if(validaName, validPhone, validEmail){
            let result = await listManager.addPacient(data)
        
            let pacients = []
            let lists = await listManager.get()
            lists.forEach((list)=>{
                list.list.forEach((pacient)=>{
                    if(list.list.length > 0){
                        if(list.list.length>0){
                            pacient.list = list._id
                            pacients.push(pacient)
                        }     
                    }
                })
            })
            res.status(200).json({status:"success", payload: pacients})
        }
        else{
            res.status(400).json({status:"error", message:"Formulario inválido"})
        }
    }
    catch(error){
        throw error
    }
}

const getListId = async(req,res)=>{
    try{
        let listId = req.params.lid
        let result = await listManager.getId(listId)
        res.json(result)
    }
    catch(error){
        throw error
    }
}

const deletePacient = async (req,res)=>{
    try{
        const {id} = req.body
        const {list} = req.body
        let service = await listModel.findById(list)
        let result = await listModel.findByIdAndUpdate(list,{list: service.list.filter((pacient)=>pacient._id != id)})        
        req.logger.info(`Paciente ${id} eliminado de list: ${list} - ${new  Date().toLocaleTimeString()}`)
        res.status(200).json({status:"success"})
    }
    catch(error){
        throw error
    }
}

const updateOffer = async (req,res)=>{
    try{
        let actualOffer = req.body
        let list= await listModel.findById(actualOffer.list)
        let pacient = list.list.find((pacient)=>pacient._id == actualOffer.pacient)

        pacient.ofrecimientos = actualOffer.offerValue
        list.save()
        res.status(200).json(pacient)

    }
    catch(error){
        throw error
    }
}

const updatePriority = async (req,res)=>{
    try{
        let actualPriority = req.body
        let list= await listModel.findById(actualPriority.list)
        let pacient = list.list.find((pacient)=>pacient._id == actualPriority.pacient)

        pacient.priority = actualPriority.priorityValue
        list.save()
        res.status(200).json({message:"success"})
    }
    catch(error){
        throw error
    }
}


export{
    getList,
    createList,
    createItem,
    getListId,
    deletePacient,
    updateOffer,
    updatePriority
}