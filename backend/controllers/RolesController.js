import {
  Read,
  ReadById,
  Update,
  Create,
  Delete,
  ReadAll,
  ReadAllPermissionByRoleId,
} from "./helper.js";
import prisma from "../config/db.config.js";
import logger from "../config/logger.js";

const model = "Roles"; // Model name or Tablename

class RolesController {
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

  static async readAllPermissionByRoleId(req, res) {
    const id = Number(req.params.id);
    const result = await ReadAllPermissionByRoleId("Permissions", id, req, res);
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
      status: req.body.status,
      updatedBy: req.user.id,
      //org_id: req.user.oid,
    };
    const result = await Update(model, id, updateData, req, res);
    await prisma.permissions.deleteMany({
      where: {
        role_id: id,
      },
    });
    const permissions = req.body.permissions;
    for (const [route_id, values] of Object.entries(permissions)) {
      values.forEach(async (value) => {
        await prisma.permissions.create({
          data: {
            role_id: id,
            route_id: Number(route_id),
            action_id: value,
            status: 1,
            updatedBy: req.user.id,
            createdBy: req.user.id,
            org_id: req.user.oid,
          },
        });
      });
    }
    return result;
  }

  static async create(req, res) {
    try {
      const name = req.body.name;
      const permissions = req.body.permissions;

      const data = {
        name: req.body.name,
        path: req.body.path,
        status: req.body.status,
        updatedBy: req.user.id,
        createdBy: req.user.id,
        org_id: req.user.oid,
      };
      const newRecord = await prisma[model].create({
        data: data,
      });

      for (const [id, values] of Object.entries(permissions)) {
        values.forEach(async (value) => {
          await prisma.permissions.create({
            data: {
              role_id: newRecord.id,
              route_id: Number(id),
              action_id: value,
              status: 1,
              updatedBy: req.user.id,
              createdBy: req.user.id,
              org_id: req.user.oid,
            },
          });
        });
      }

      return res.status(200).json({
        data: newRecord,
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        message: `Something went wrong with ${model}.Please try again.`,
      });
    }
  }

  static async delete(req, res) {
    const id = Number(req.params.id);
    await prisma.permissions.deleteMany({
      where: {
        role_id: id,
      },
    });
    const result = await Delete(model, id, req, res);
    return result;
  }
}

export default RolesController;
