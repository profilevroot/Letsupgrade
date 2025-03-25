import prisma from "../config/db.config.js";
import logger from "../config/logger.js";

async function Read(model, page = 0, pageSize = 10, req, res, include = {}) {
  try {
    isNaN(page) ? (page = 0) : page; // Adjust page number
    isNaN(pageSize) ? (pageSize = 10) : pageSize; // Adjust page number
    const skip = page * pageSize; // Calculate the offset
    // Fetch data with pagination
    const data = await prisma[model].findMany({
      skip: skip,
      take: pageSize,
      where: {
        status: 1,
      },
      orderBy: {
        createdAt: "desc", // Order by createdAt in descending order
      },
      include: include,
    });

    const totalCount = await prisma[model].count(); // Count total records for the model
    const totalPages = Math.ceil(totalCount / pageSize); // Calculate total pages
    return res.status(200).json({
      data,
      totalCount,
      totalPages,
      currentPage: page,
      pageSize,
    });
  } catch (error) {
    console.error("Error fetching paginated data:", error);
    logger.error(error);
    return res.status(500).json({
      message: `Something went wrong with ${model}.Please try again.`,
    });
  }
}

async function ReadAll(model, req, res) {
  try {
    const data = await prisma[model].findMany({
      where: {
        status: 1,
      },
      orderBy: {
        createdAt: "desc", // Order by createdAt in descending order
      },
    });

    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.error("Error fetching paginated data:", error);
    logger.error(error);
    return res.status(500).json({
      message: `Something went wrong with ${model}.Please try again.`,
    });
  }
}

async function ReadById(model, id, req, res) {
  try {
    const record = await prisma[model].findUnique({
      where: {
        id: id,
      },
    });

    if (!record) {
      console.log(`No record found with ID: ${id}`);
    } else {
      console.log("Record fetched:", record);
    }

    return res.status(200).json({
      data: record,
    });
  } catch (error) {
    console.error("Error fetching record:", error);
    logger.error(error);
    return res.status(500).json({
      message: `Something went wrong with ${model}.Please try again.`,
    });
  }
}

async function Update(model, id, data, req, res) {
  try {
    const updateData = {
      ...data,
      updatedBy: req.user.id,
    };
    const updatedRecord = await prisma[model].update({
      where: {
        id: id, // Replace 'id' with your actual unique identifier field if different
      },
      data: updateData,
    });

    console.log("Record updated:", updatedRecord);
    return res.status(200).json({
      data: updatedRecord,
    });
  } catch (error) {
    console.error("Error updating record:", error);

    logger.error(error);
    return res.status(500).json({
      message: `Something went wrong with ${model}.Please try again.`,
    });
  }
}

async function Delete(model, id, req, res) {
  try {
    const deletedRecord = await prisma[model].delete({
      where: {
        id: id, // Replace 'id' with your actual unique identifier field if different
      },
    });

    console.log("Record deleted:", deletedRecord);
    return res.status(200).json({
      data: deletedRecord,
    });
  } catch (error) {
    console.error("Error deleting record:", error);

    logger.error(error);
    return res.status(500).json({
      message: `Something went wrong with ${model}.Please try again.`,
    });
  }
}

async function Create(model, data, req, res, rawResponse = false) {
  try {
    const createData = {
      ...data,
      updatedBy: req.user.id,
      createdBy: req.user.id,
      org_id: req.user.oid,
    };
    const newRecord = await prisma[model].create({
      data: createData,
    });
    if (rawResponse) {
      return newRecord;
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

async function ReadAllPermissionByRoleId(model, id, req, res) {
  try {
    const data = await prisma[model].findMany({
      where: {
        status: 1,
        role_id: id,
      },
    });

    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.error("Error fetching paginated data:", error);
    logger.error(error);
    return res.status(500).json({
      message: `Something went wrong with ${model}.Please try again.`,
    });
  }
}

async function ReadAllTicketsByCategoryId(model, id, page = 0, pageSize = 10, req, res, include = {}) {
  try {
    isNaN(page) ? (page = 0) : page; // Adjust page number
    isNaN(pageSize) ? (pageSize = 10) : pageSize; // Adjust page number
    const skip = page * pageSize; // Calculate the offset
   
    const sharedWhereClause = {
      status: 1,
      category_id: id,
    };

    const [data, totalCount] = await prisma.$transaction([
      prisma[model].findMany({
        where: sharedWhereClause,
        skip: skip,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
        include: include,
      }),
      prisma[model].count({
        where: sharedWhereClause,
      })     
    ]);
    
    const totalPages = Math.ceil(totalCount / pageSize); // Calculate total pages
   
    return res.status(200).json({
      data,
      totalCount,
      totalPages,
      currentPage: page,
      pageSize,
    });
    
  } catch (error) {
    console.error("Error fetching paginated data:", error);
    logger.error(error);
    return res.status(500).json({
      message: `Something went wrong with ${model}.Please try again.`,
    });
  }
}


export {
  Read,
  ReadById,
  Update,
  Delete,
  Create,
  ReadAll,
  ReadAllPermissionByRoleId,
  ReadAllTicketsByCategoryId,
};
