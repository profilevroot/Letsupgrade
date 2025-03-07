import { Read, ReadById, Update, Create, Delete, ReadAll } from "./helper.js";
import bcrypt from "bcryptjs";

const model = "Users"; // Model name or Tablename
const salt = bcrypt.genSaltSync(10);

class UsersController {
  static async read(req, res) {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.limit);
    const result = await Read(model, page, pageSize, req, res);
    return result;
  }
  static async getpassword(password) {
    const hashedPassword = await bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  static async readAll(req, res) { 
    const result = await ReadAll(model,req, res);
    return result;
  }

  static async readById(req, res) {
    const id = Number(req.params.id);
    const result = await ReadById(model, id, req, res);
    return result;
  }

  static async update(req, res) {
    const id = Number(req.params.id);
    /* console.log(req.body)
    console.log(req.user) */
    const updateData = {
      email: req.body.email,
      username: req.body.username,
     // password: req.body.password,
       role_id: Number(req.body.role_id),
    };
    const result = await Update(model, id, updateData, req, res);
    return result;
  }

  static async create(req, res) {
    const hashedPassword = await bcrypt.hashSync("admin@123", salt);
    const data = {
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      status: 1,
      role_id: Number(req.body.role_id)
    };
    const result = await Create(model, data, req, res);
    return result;
  }

  static async delete(req, res) {
    const id = Number(req.params.id);
    const result = await Delete(model, id, req, res);
    return result;
  }
}

export default UsersController;
