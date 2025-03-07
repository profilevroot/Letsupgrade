import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const salt = bcrypt.genSaltSync(10);

async function main() {
  // Create an organization
  let organization = await prisma.organizations.findFirst({
    where: { email: "info@techcorp.com" },
  });
  if (!organization) {
    organization = await prisma.organizations.create({
      data: {
        name: "TechCorp",
        email: "info@techcorp.com",
        mobile: "1234567890",
        address: "123 Tech Street, Silicon Valley",
        desrciption: "A leading tech company.",
        status: 1,
        createdBy: 1,
        updatedBy: 1,
      },
    });
  }

  let group = await prisma.groups.findFirst({
    where: { name: "group" },
  });
  if (!group) {
    group = await prisma.groups.create({
      data: {
        name: "TechCorp",
        status: 1,
        createdBy: 1,
        updatedBy: 1,
        org_id: organization.id,
      },
    });
  }

  // Create roles
  let adminRole = await prisma.roles.findFirst({
    where: { name: "super" },
  });
  if (!adminRole) {
    adminRole = await prisma.roles.create({
      data: {
        name: "super",
        status: 1,
        createdBy: 1,
        updatedBy: 1,
        group_id: 1,
        org_id: organization.id,
      },
    });
  }

  // Create users
  const hashedPassword = await bcrypt.hashSync("super@123", salt);

  let adminUser = await prisma.users.findFirst({
    where: { email: "super@track.com" },
  });
  if (!adminUser) {
    adminUser = await prisma.users.create({
      data: {
        email: "super@track.com",
        username: "super",
        password: hashedPassword, // In production, hash this password!
        status: 1,
        role_id: adminRole.id,
        org_id: organization.id,
        group_id: 1,
        createdBy: 1,
        updatedBy: 1,
      },
    });
  }
  // Create Routes
  const routesData = [
    {
      name: "Setting",
      path: "/admin/settings",
    },
    {
      name: "User",
      path: "/admin/users",
    },
    {
      name: "Roles",
      path: "/admin/roles",
    },
    {
      name: "Actions",
      path: "/admin/actions",
    },
    {
      name: "Groups",
      path: "/admin/groups",
    },
    {
      name: "Catergory",
      path: "/admin/category",
    },
    {
      name: "Tickets",
      path: "/admin/tickets",
    },
    {
      name: "Dashboard",
      path: "/admin",
    },
  ];
  const transformedRoutesData = routesData.map((item) => ({
    name: item.name,
    path: item.path,
    status: 1,
    group_id: 1,
    createdBy: adminUser.id,
    updatedBy: adminUser.id,
    org_id: organization.id,
  }));
  await prisma.routes.createMany({
    data: transformedRoutesData,
  });

  // Create Actions
  const actionsData = ["view", "add", "edit", "delete"];
  const transformedActionsData = actionsData.map((value) => ({
    name: value,
    status: 1,
    group_id: 1,
    createdBy: adminUser.id,
    updatedBy: adminUser.id,
    org_id: organization.id,
  }));
  await prisma.actions.createMany({
    data: transformedActionsData,
  });

  // Create permissions
  const routes = await prisma.routes.findMany();
  const actions = await prisma.actions.findMany();
  for (const route of routes) {
    for (const action of actions) {
      await prisma.permissions.create({
        data: {
          role_id: adminRole.id,
          route_id: route.id,
          action_id: action.id,
          status: 1,
          createdBy: adminUser.id,
          updatedBy: adminUser.id,
          org_id: organization.id,
        },
      });
    }
  }

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
