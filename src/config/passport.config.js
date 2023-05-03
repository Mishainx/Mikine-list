import passport from "passport";
import local from "passport-local";
import usersModel from "../dao/models/users.model.js";
import { isValidPassword } from "./utils.js";


const LocalStrategy = local.Strategy;

const initializePassport = () => {
    //Estrategia Login        
  passport.use("login", new LocalStrategy({usernameField:'email'},async(username,password,done)=>{
    try{
        let user = await usersModel.findOne({email:username})
        if(!user){
            console.log("El usuario no existe")
            return done (null,false)
        }
    if(!isValidPassword(password,user.password))return done(null,false, {message:"Credenciales inválidas"});
        return done(null,user)
    }
    catch(error){
        return done(error)
    }
  }))
}


passport.serializeUser((user, done) => {

    done(null, user._id);
  });
  
  passport.deserializeUser(async (id, done) => {

    try {
      let user = await usersModel.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
  export default initializePassport;