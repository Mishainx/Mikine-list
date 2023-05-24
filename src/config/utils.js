import { fileURLToPath } from 'url';
import { dirname } from 'path';
const _filename = fileURLToPath(import.meta.url);
const __filename = _filename.slice(0,-15)
export const __dirname = dirname(__filename);
import bcrypt from 'bcrypt'



//Funciones de haseo con Bcrypt
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) =>
  bcrypt.compareSync(password, user)