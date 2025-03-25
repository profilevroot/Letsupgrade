import { Read, ReadById, Update, Create, Delete, ReadAll, ReadAllTicketsByCategoryId } from "./helper.js";
import bcrypt from "bcryptjs";
import prisma from "../config/db.config.js";

const model = "Ticket"; // Model name or Tablename
const salt = bcrypt.genSaltSync(10);

class TicketController {
  static async read(req, res) {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.limit);
    const include = {
      Questions: {
        include: {
          Answers: true,
        },
      },
    };
    const result = await Read(model, page, pageSize, req, res, include);
    return result;
  }
  static async getpassword(password) {
    const hashedPassword = await bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  static async readAll(req, res) {
    const result = await ReadAll(model, req, res);
    return result;
  }

  static async readByCategoryId(req, res) {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.limit);
    const id = Number(req.params.categoryId);
    const include = {
      Questions: {
        include: {
          Answers: true,
        },
      },
    };

    const result = await ReadAllTicketsByCategoryId(model, id, page, pageSize, req, res, include);    
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

    const { ticketId, name, subject, description, category_id, questions } = req.body;
    
        const updatedTicket = await prisma.ticket.update({
          where: { id: ticketId },
          data: {
            name,
            subject,
            description,
            category_id,
    
            // Step 1: Delete existing related data (cascade delete)
            Questions: {
              deleteMany: {}, // Deletes all related questions & answers
            },
    
            // Step 2: Recreate questions and answers
            Questions: {
              create: questions.map((question) => ({
                name: question.name,
                createdBy: req.user.id,
                updatedBy: req.user.id,
    
                // Create related answers
                Answers: {
                  create: question.answers.map((answer) => ({
                    name: answer,
                    createdBy: req.user.id,
                    updatedBy: req.user.id,
                  })),
                },
              })),
            },
          },
          include: {
            Questions: {
              include: { Answers: true },
            },
          },
        });

    
    const result = await Update(model, id, updateData, req, res);
    return result;
  }

  static async create(req, res) {
    const randomTicketNo = "TSO-" + Math.floor(100000 + Math.random() * 900000);

   const questionData= req.body?.questions?.map((question) => {
      const answerData = question?.answers.map((answer) => {
        return { name: answer, updatedBy: req.user.id, createdBy: req.user.id };
      });
      return {
        name: question.name,
        updatedBy: req.user.id,
        createdBy: req.user.id,
        Answers: {
          create: answerData,
        },
      };
    });

    const data = {
      name: req.body.name,
      ticketNo: randomTicketNo,
      subject: req.body.subject,
      description: req.body.description,
      labLink: req.body.labLink,
      guidance: req.body.guidance,
      status: 1,
      priority: req.body.priority,
      category_id: req.body.category_id,
      Questions: {
        create: questionData,
      },
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

export default TicketController;
