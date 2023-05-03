import express from "express";
import config from "./config/config.js";
import { environment } from "./config/enviroment.js";
import { __dirname, createHash } from "./config/utils.js";
import { engine } from "express-handlebars";
import rootRouter from "./routes/root.routes.js";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import session from "express-session";
import pacientsRouter from "./routes/pacients.routes.js";
import listRouter from "./routes/list.routes.js";
import { addLogger } from "./config/logger.js";

export const app = express();
let PORT = config.PORT

//Configuración del servidor
const httpServer = app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});

//Middelware para trabajar con archivos .Json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname +'/public'));

app.use(session({
    secret: config.SESSION_SECRET,
    resave:true,
    saveUninitialized:false
}))

//Configuración passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Middleware para agregar a las variables locales del objeto Response los datos de sesión.
app.use((req, res, next)=>{ 
    res.locals.session = req.session;
    next();
})

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static(__dirname +'/public'));
app.set('views', __dirname+"/src/views")
app.use(addLogger)


environment()
app.use("/list", listRouter);
app.use("/pacients", pacientsRouter);
app.use("/", rootRouter);

