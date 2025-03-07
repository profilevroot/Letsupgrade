import { Read, ReadById, Update, Create, Delete, ReadAll } from "./helper.js";

const model = "Organizations"; // Model name or Tablename

class OrganizationsController {
  static async read(req, res) {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.limit);
    const result = await Read(model, page, pageSize, req, res);
    return result;
  }

  static async readAll(req, res) {
    const result = await ReadAll(model, req, res);
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
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      address: req.body.address,
      desrciption: req.body.desrciption,
      status: req.body.status,
      updatedBy: req.user.id,
    };
    const result = await Update(model, id, updateData, req, res);
    return result;
  }

  static async create(req, res) {
    const data = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      address: req.body.address,
      desrciption: req.body.desrciption,
      status: req.body.status,
      updatedBy: req.user.id,
      createdBy: req.user.id,
      org_id: req.user.oid,
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

export default OrganizationsController;
