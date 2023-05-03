import pacientsModel from "../dao/models/pacients.model.js";
import ListManager from "../dao/classes/list.mongo.js";
const listManager = new ListManager()
let nav = true

const getPacients = async(req,res)=>{
    let lists = await listManager.get()
  
    let pacients = []
    lists.forEach((list)=>{
        list.list.forEach((pacient)=>{
            if(list.list.length > 0){
                if(list.list.length>0){
                    pacient.date = pacient.date?.toLocaleDateString()
                    pacient.last = pacient.last?.toLocaleDateString()
                    pacient.turno = pacient.turno?.toLocaleDateString()
                    pacient.list = list._id
                    if(pacient.telephone[0] == "+"){
                    pacient.telephone = pacient.telephone.slice(1)
                    }
                    pacients.push(pacient)
                }     
            }
        })
    })
    res.status(200).render("pacients",{pacients, nav})
}

const findPacients = async (req,res)=>{
    try{
        let property = req.body.pacient
        let pacients = await pacientsModel.find()
        let result = pacients.filter((pacient)=> pacient.name == property||  pacient.email == property || pacient.surname == property || pacient.telephone == property)
        
        res.status(200).json(result)
    }
    catch(error){
        throw error
    }

}

const findPacientsId = async(req,res,next)=>{
    try{  
    let pacientId = req.body.pacient
    let result = await pacientsModel.findById(pacientId)
    res.status(200).json({message:"success", payload:result})
    }
    catch(error){
        res.status(404).json({message:"error", payload: "Error al buscar el paciente"})
        next(error)
    }   
}

const updatePacients = async(req,res)=>{
    try{
        //ASPOSE convertidor
        let {url} = req.body
        
        fetch(`${url}`)
        .then((response)=>response.json())
        .then((data)=>{
            if(data.length>0){
                data.forEach((pacient)=>{
                    let  newPacient={
                        name: pacient.Nombres,
                        surname: pacient.Apellidos,
                        dni: pacient.DNI,
                        telephone: pacient.Teléfono,
                        direction: pacient.Dirección,
                        city: pacient.Ciudad,
                        email: pacient.Email
                    }
                let createPacient = pacientsModel.create(newPacient)
                })
                res.status(200).json({status:"success", message:"Lista actualizada"})
            }
        })
        .catch((error)=>{
            res.status(500).json({status:"error", message:"Error al actualizar"})
        })
    }
    catch(error){
        throw error
    }
}

export{
    getPacients,
    findPacients,
    findPacientsId,
    updatePacients
}
