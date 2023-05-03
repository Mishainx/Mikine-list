
export const isLog = (req,res,next)=>{
    if(req.session?.user == undefined){
      return next()
    }
    return res.status(401).redirect("/pacients")
  }
  
  export const auth = async (req,res,next)=>{
    if(req.session?.user != undefined){
      return next()
    }
    return res.status(401).redirect("/")
}
  