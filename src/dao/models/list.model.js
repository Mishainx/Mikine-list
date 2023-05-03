import mongoose from "mongoose";

const listCollection = "list";

const listSchema = new mongoose.Schema({
    list: {
        type: [
          {
            priority: {
              type:String,
              default: "lowPriority"
            },
            date: Date,
            last: Date,
            name:String,
            telephone: String,
            email: String,
            servicio: String,
            turno: Date,
            ofrecimientos:Number,
            observaciones: String
          },
        ],
        default: [],
      },
      name:String  
    });


const listModel = mongoose.model(listCollection, listSchema);

export default listModel;