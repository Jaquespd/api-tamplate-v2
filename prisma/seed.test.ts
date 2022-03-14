import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { faker } from "@faker-js/faker";

async function main() {
  // USERS ADMIN
  for (const element of Array.from(Array(10), (e) => "1")) {
    const email = faker.internet.email();
    await prisma.users.upsert({
      where: { email },
      update: {},
      create: {
        authId: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email,
        picture: faker.image.avatar(),
        roles: ["admin"],
        checkGoogle: faker.datatype.boolean(),
        checkFacebook: faker.datatype.boolean(),
        bio: faker.commerce.productDescription(),
        phone: faker.phone.phoneNumber("+##(##)#####-####"),
        isActive: true,
      },
    });
  }
  // USERS PROVIDER
  for (const element of Array.from(Array(10), (e) => "1")) {
    const email = faker.internet.email();
    await prisma.users.upsert({
      where: { email },
      update: {},
      create: {
        authId: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email,
        picture: faker.image.avatar(),
        roles: ["provider"],
        checkGoogle: faker.datatype.boolean(),
        checkFacebook: faker.datatype.boolean(),
        bio: faker.commerce.productDescription(),
        phone: faker.phone.phoneNumber("+##(##)#####-####"),
        isActive: true,
      },
    });
  }
  // USERS USER
  for (const element of Array.from(Array(10), (e) => "1")) {
    const email = faker.internet.email();
    await prisma.users.upsert({
      where: { email },
      update: {},
      create: {
        authId: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email,
        picture: faker.image.avatar(),
        roles: ["user"],
        checkGoogle: faker.datatype.boolean(),
        checkFacebook: faker.datatype.boolean(),
        bio: faker.commerce.productDescription(),
        phone: faker.phone.phoneNumber("+##(##)#####-####"),
        isActive: true,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
