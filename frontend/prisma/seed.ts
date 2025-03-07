import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

const hashedPassword = async ()=> await hash("test@123", 10);
 


async function main1() {
  // Create an organization
  const organization = await prisma.organizations.create({
    data: {
      name: "TechCorp",
      email: "info@techcorp.com",
      mobile: "1234567890",
      address: "123 Tech Street, Silicon Valley",
      desrciption: "A leading tech company.",
      status: 'true',
      createdBy: 1,
      updatedBy: 1,
    },
  });

  // Create roles
  const adminRole = await prisma.roles.create({
    data: {
      name: "Admin",
      status: 'true',
      createdBy: 1,
      updatedBy: 1,
      org_id: organization.id,
    },
  });

  const userRole = await prisma.roles.create({
    data: {
      name: "User",
      status: 'true',
      createdBy: 1,
      updatedBy: 1,
      org_id: organization.id,
    },
  });

  // Create users
  const hashedPassword = await hash("test@123", 10);

  const adminUser = await prisma.users.create({
    data: {
      email: "admin@techcorp.com",
      username: "admin",
      password: hashedPassword, // In production, hash this password!
      status: 'true',
      role_id: adminRole.id,
      org_id: organization.id,
      createdBy: 1,
      updatedBy: 1,
    },
  });

  const normalUser = await prisma.users.create({
    data: {
      email: "user@techcorp.com",
      username: "user",
      password: hashedPassword, // In production, hash this password!
      status: 'true',
      role_id: userRole.id,
      org_id: organization.id,
      createdBy: 1,
      updatedBy: 1,
    },
  });

  // Create routes
  const dashboardRoute = await prisma.routes.create({
    data: {
      name: "Dashboard",
      path: "/dashboard",
      status: 'true',
      createdBy: 1,
      updatedBy: 1,
      org_id: organization.id,
    },
  });

  const settingsRoute = await prisma.routes.create({
    data: {
      name: "Settings",
      path: "/settings",
      status: 'true',
      createdBy: 1,
      updatedBy: 1,
      org_id: organization.id,
    },
  });

  // Create actions
  const viewAction = await prisma.actions.create({
    data: {
      name: "View",
      status: 'true',
      createdBy: 1,
      updatedBy: 1,
      org_id: organization.id,
    },
  });

  const editAction = await prisma.actions.create({
    data: {
      name: "Edit",
      status: 'true',
      createdBy: 1,
      updatedBy: 1,
      org_id: organization.id,
    },
  });

  // Create permissions
  await prisma.permissions.create({
    data: {
      role_id: adminRole.id,
      route_id: dashboardRoute.id,
      action_id: viewAction.id,
      status: 'true',
      createdBy: 1,
      updatedBy: 1,
      org_id: organization.id,
    },
  });

  await prisma.permissions.create({
    data: {
      role_id: userRole.id,
      route_id: settingsRoute.id,
      action_id: editAction.id,
      status: 'true',
      createdBy: 1,
      updatedBy: 1,
      org_id: organization.id,
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
