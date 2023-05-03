
const getLogin = async (req,res) =>{
    res.status(200).render("login") 
}

const postLogin = async (req,res) =>{
   req.session.user = req.user.email
   let response = req.session.user
   res.status(200).json({message:"success", usuario: response})
}

const getFailLogin = async(req,res)=>{
    console.log("Failed Login Strategy")
    res.send({error: "Failed Login"})
}

const getLogOut = async(req,res)=>{
    try{
        req.session.destroy(err=>{
            if(err){
              res.json({status:'error', message:'Error al cerrar la sesión: '+err});
            }
            else{
              req.logger.info(`${req.method} en ${req.url}- ${new  Date().toLocaleTimeString()} - Sesión destruida`)
              res.clearCookie('connect.sid',{ path: '/' }).json({status:"success", message: "Sesión cerrada"})
            }
          }) 
    }
    catch(error){
        req.logger.error(`${req.method} en ${req.url}- ${new  Date().toLocaleTimeString()}`)
        throw(error)
    }
}

const getNoFound = async(req,res)=>{
    res.status(200).redirect("/pacients")
}


export{
    getLogin,
    postLogin,
    getFailLogin,
    getLogOut,
    getNoFound
}