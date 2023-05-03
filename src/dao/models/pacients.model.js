import mongoose from "mongoose";

const pacientsCollection = "pacients";

const pacientsSchema = new mongoose.Schema({
    name: String,
    surname: String,
    dni: String,
    client: String,
    telephone: String,
    direction: String,
    city: String,
    email: {
    type: String,
  },
});

const pacientsModel = mongoose.model(pacientsCollection, pacientsSchema);

export default pacientsModel;