import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import authMiddleware from "../middleware/Authenticate.js";
import ActionsController from "../controllers/ActionsController.js";
import PermissionsController from "../controllers/PermissionsController.js";
import RoutesController from "../controllers/RoutesController.js";
import RolesController from "../controllers/RolesController.js";
import UsersController from "../controllers/UsersController.js";
import OrganizationsController from "../controllers/OrganizationsController.js";
import GroupsController from "../controllers/GroupsController.js";
import TicketController from "../controllers/TicketController.js";
import CategoryController from "../controllers/CategoryController.js";
//import redisCache from "../config/redis.config.js";

const router = Router();

// router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
//router.get("/send-email", AuthController.sendTestEmail);

// Actions
router.get("/actions", authMiddleware, ActionsController.read);
router.get("/actions-all", authMiddleware, ActionsController.readAll);
router.get("/action/:id", authMiddleware, ActionsController.readById);
router.put("/action/:id", authMiddleware, ActionsController.update);
router.post("/action", authMiddleware, ActionsController.create);
router.delete("/action/:id", authMiddleware, ActionsController.delete); 

// Actions
router.get("/categorys", authMiddleware, CategoryController.read);
router.get("/categorys-all", authMiddleware, CategoryController.readAll);
router.get("/category/:id", authMiddleware, CategoryController.readById);
router.put("/category/:id", authMiddleware, CategoryController.update);
router.post("/category", authMiddleware, CategoryController.create);
router.delete("/category/:id", authMiddleware, CategoryController.delete); 

// Permissions
router.get("/permissions", authMiddleware, PermissionsController.read);
router.get("/permissions-all", authMiddleware, PermissionsController.readAll);
router.get("/permission/:id", authMiddleware, PermissionsController.readById);
router.put("/permission/:id", authMiddleware, PermissionsController.update);
router.post("/permission", authMiddleware, PermissionsController.create);
router.delete("/permission/:id", authMiddleware, PermissionsController.delete); 

// Routes
router.get("/routes", authMiddleware, RoutesController.read);
router.get("/routes-all", authMiddleware, RoutesController.readAll);
router.get("/route/:id", authMiddleware, RoutesController.readById);
router.put("/route/:id", authMiddleware, RoutesController.update);
router.post("/route", authMiddleware, RoutesController.create);
router.delete("/route/:id", authMiddleware, RoutesController.delete); 

// GroupsController
router.get("/groups", authMiddleware, GroupsController.read);
router.get("/groups-all", authMiddleware, GroupsController.readAll);
router.get("/group/:id", authMiddleware, GroupsController.readById);
router.put("/group/:id", authMiddleware, GroupsController.update);
router.post("/group", authMiddleware, GroupsController.create);
router.delete("/group/:id", authMiddleware, GroupsController.delete); 

// Ticket
router.get("/tickets", authMiddleware, TicketController.read);
router.get("/tickets-all", authMiddleware, TicketController.readAll);
router.get("/ticket/:id", authMiddleware, TicketController.readById);
router.put("/ticket/:id", authMiddleware, TicketController.update);
router.post("/ticket", authMiddleware, TicketController.create);
router.delete("/ticket/:id", authMiddleware, TicketController.delete); 

// Roles
router.get("/roles", authMiddleware, RolesController.read);
router.get("/roles-all", authMiddleware, RolesController.readAll);
router.get("/role-permission/:id", authMiddleware, RolesController.readAllPermissionByRoleId);
router.get("/role/:id", authMiddleware, RolesController.readById);
router.put("/role/:id", authMiddleware, RolesController.update);
router.post("/role", authMiddleware, RolesController.create);
router.delete("/role/:id", authMiddleware, RolesController.delete); 

// Users
router.get("/users", authMiddleware, UsersController.read);
router.get("/users-all", authMiddleware, UsersController.readAll);
router.get("/user/:id", authMiddleware, UsersController.readById);
router.put("/user/:id", authMiddleware, UsersController.update);
router.post("/user", authMiddleware, UsersController.create);
router.delete("/user/:id", authMiddleware, UsersController.delete); 


// Organizations
router.get("/organizations", authMiddleware, OrganizationsController.read);
router.get("/organizations-all", authMiddleware, OrganizationsController.readAll);
router.get("/organization/:id", authMiddleware, OrganizationsController.readById);
router.put("/organization/:id", authMiddleware, OrganizationsController.update);
router.post("/organization", authMiddleware, OrganizationsController.create);
router.delete("/organization/:id", authMiddleware, OrganizationsController.delete); 


export default router;
