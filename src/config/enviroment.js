import config from "./config.js";
import mongoose from "mongoose";

export const environment = async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@cluster0.tjewfez.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`
      );
      console.log("Conectado a MongoDB");
    } catch (error) {
      console.log(`Error al conectar a MongoDB: ${error}`);
    }
  };