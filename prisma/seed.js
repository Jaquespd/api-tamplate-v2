"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const faker_1 = require("@faker-js/faker");
async function main() {
    // USERS ADMIN
    for (const element of Array.from(Array(10), (e) => "1")) {
        const email = faker_1.faker.internet.email();
        await prisma.users.upsert({
            where: { email },
            update: {},
            create: {
                authId: faker_1.faker.datatype.uuid(),
                firstName: faker_1.faker.name.firstName(),
                lastName: faker_1.faker.name.lastName(),
                email,
                picture: faker_1.faker.image.avatar(),
                roles: ["admin"],
                checkGoogle: faker_1.faker.datatype.boolean(),
                checkFacebook: faker_1.faker.datatype.boolean(),
                bio: faker_1.faker.commerce.productDescription(),
                phone: faker_1.faker.phone.phoneNumber("+##(##)#####-####"),
                isActive: true,
            },
        });
    }
    // USERS PROVIDER
    for (const element of Array.from(Array(10), (e) => "1")) {
        const email = faker_1.faker.internet.email();
        await prisma.users.upsert({
            where: { email },
            update: {},
            create: {
                authId: faker_1.faker.datatype.uuid(),
                firstName: faker_1.faker.name.firstName(),
                lastName: faker_1.faker.name.lastName(),
                email,
                picture: faker_1.faker.image.avatar(),
                roles: ["provider"],
                checkGoogle: faker_1.faker.datatype.boolean(),
                checkFacebook: faker_1.faker.datatype.boolean(),
                bio: faker_1.faker.commerce.productDescription(),
                phone: faker_1.faker.phone.phoneNumber("+##(##)#####-####"),
                isActive: true,
            },
        });
    }
    // USERS USER
    for (const element of Array.from(Array(480), (e) => "1")) {
        const email = faker_1.faker.internet.email();
        await prisma.users.upsert({
            where: { email },
            update: {},
            create: {
                authId: faker_1.faker.datatype.uuid(),
                firstName: faker_1.faker.name.firstName(),
                lastName: faker_1.faker.name.lastName(),
                email,
                picture: faker_1.faker.image.avatar(),
                roles: ["user"],
                checkGoogle: faker_1.faker.datatype.boolean(),
                checkFacebook: faker_1.faker.datatype.boolean(),
                bio: faker_1.faker.commerce.productDescription(),
                phone: faker_1.faker.phone.phoneNumber("+##(##)#####-####"),
                isActive: true,
            },
        });
    }
    // SERVICES
    let index = 0;
    for (const element of Array.from(Array(6), (e) => "1")) {
        index++;
        if (index === 1) {
            await prisma.services.upsert({
                where: { id: 10000 },
                update: {},
                create: {
                    title: "Passeio Buggy Natal-Jacuma",
                    subtitle: "O mais famoso passeio do RN",
                    description: "Durante o caminho você verá praias urbanas, a Ponte Newton Navarro e o encontro do Rio Potengi com o mar. A primeira parada será na Praia da Redinha, na qual você poderá adquirir o ingresso para visitar o Aquário de Natal.",
                    city: "Natal",
                    state: "RN",
                    areaAvailability: ["Parnamirim", "Natal", "Genipabu"],
                    routeMap: "http://url.com.br",
                    price: 600,
                    warning: "O uso de mascara é obrigatório em alguns estabelecimentos.",
                    categories: ["praia", "norte", "buggy"],
                    hashtags: ["amonatal", "praia", "penaareia", "aventura", "emocao"],
                    distance: 110,
                    stops: 9,
                    coverPhoto: "https://beiramar1.s3.amazonaws.com/pictureService/2.jpeg",
                    duration: 180,
                    location: ["-5.5216547", "-35.2825768"],
                },
            });
        }
        if (index === 2) {
            await prisma.services.upsert({
                where: { id: 10000 },
                update: {},
                create: {
                    title: "Passeio Buggy Touros-Zumbi",
                    subtitle: "Passeio litoral norte entre Touros/RN e Zumbi/RN",
                    description: "Um excelente passeio de buggy pelas praias do litoral norte assistindo as belezas naturais e quase intocadas das praias entre Touros/RN e Zumbi/RN. Durante o passeio você terá oportunidade de fazer 5 paradas para fotos. Conhecer o",
                    city: "Zumbi",
                    state: "RN",
                    areaAvailability: ["zumbi", "rio do fogo", "touros"],
                    routeMap: "http://url.com.br",
                    price: 300,
                    warning: "O uso de mascara é obrigatório em alguns estabelecimentos.",
                    categories: ["praia", "norte", "buggy"],
                    hashtags: ["amozumbi", "praia", "amorepaz"],
                    distance: 32,
                    stops: 5,
                    duration: 240,
                    coverPhoto: "https://beiramar1.s3.amazonaws.com/pictureService/1.jpeg",
                    location: ["-5.3466703", "-35.3575966"],
                },
            });
        }
        if (index === 3) {
            await prisma.services.upsert({
                where: { id: 10000 },
                update: {},
                create: {
                    title: "Passeio Buggy Sibauma",
                    subtitle: "O famoso chapadão",
                    description: "Duração do passeio de mais ou menos 3 horas. O bugueiro prontamente os buscará no hotel ou pousada no horário combinado. Nossa primeira parada será no chapadão da Pipa, com vista para a bela praia do amor e praia do moleque. Prosseguiremos",
                    city: "Pipa",
                    state: "RN",
                    areaAvailability: ["Pipa"],
                    routeMap: "http://url.com.br",
                    price: 250,
                    warning: "O uso de mascara é obrigatório em alguns estabelecimentos.",
                    categories: ["praia", "sul", "buggy"],
                    hashtags: ["pipa", "chapadao", "aventura"],
                    distance: 50,
                    stops: 3,
                    duration: 30,
                    coverPhoto: "https://beiramar1.s3.amazonaws.com/pictureService/3.jpeg",
                    location: ["-6.2787244", "-35.0470429"],
                },
            });
        }
        if (index === 4) {
            await prisma.services.upsert({
                where: { id: 10000 },
                update: {},
                create: {
                    title: "Passeio Buggy Barra de Cunhau",
                    subtitle: "As belezas do sul do RN",
                    description: "Duração do passeio de mais ou menos 4 horas. O bugueiro prontamente os buscará no hotel ou pousada no horário combinado. Nossa primeira parada será no chapadão da Pipa, com vista para a bela praia do amor e praia do moleque. Prosseguiremos",
                    city: "Barra de Cunhau",
                    state: "RN",
                    areaAvailability: ["Pipa", "Barra de Cunhau"],
                    routeMap: "http://url.com.br",
                    price: 300,
                    warning: "O uso de mascara é obrigatório em alguns estabelecimentos.",
                    categories: ["praia", "sul", "buggy"],
                    hashtags: ["barrinha", "amorepaz", "aventura"],
                    distance: 60,
                    stops: 5,
                    duration: 4,
                    coverPhoto: "https://beiramar1.s3.amazonaws.com/pictureService/4.jpeg",
                    location: ["-6.3083147", "-35.0506987"],
                },
            });
        }
        if (index === 5) {
            await prisma.services.upsert({
                where: { id: 10000 },
                update: {},
                create: {
                    title: "Passeio Buggy Baia Formosa",
                    subtitle: "As mais lindas aguas do Sul",
                    description: "Duração do passeio de mais ou menos 5 horas. O bugueiro prontamente os buscará no hotel ou pousada no horário combinado. Nossa primeira parada será no chapadão da Pipa, com vista para a bela praia do amor e praia do moleque. Prosseguiremos",
                    city: "Bahia Formosa",
                    state: "RN",
                    areaAvailability: ["Pipa", "Barra de Cunhau", "Baia Formosa"],
                    routeMap: "http://url.com.br",
                    price: 340,
                    warning: "O uso de mascara é obrigatório em alguns estabelecimentos.",
                    categories: ["praia", "sul", "buggy"],
                    hashtags: ["praero", "penaareia", "vidalouca"],
                    distance: 65,
                    stops: 6,
                    duration: 2,
                    coverPhoto: "https://beiramar1.s3.amazonaws.com/pictureService/5.jpeg",
                    location: ["-6.41931", "-35.1203616"],
                },
            });
        }
        if (index === 6) {
            await prisma.services.upsert({
                where: { id: 10000 },
                update: {},
                create: {
                    title: "Passeio Buggy Sagi",
                    subtitle: "A ultima praia e a mais linda",
                    description: "Duração do passeio de mais ou menos 6 horas. O bugueiro prontamente os buscará no hotel ou pousada no horário combinado. Nossa primeira parada será no chapadão da Pipa, com vista para a bela praia do amor e praia do moleque. Prosseguiremos",
                    city: "Sagi",
                    state: "RN",
                    areaAvailability: ["Sagi", "Barra de Cunhau", "Baia Formosa"],
                    routeMap: "http://url.com.br",
                    price: 400,
                    warning: "O uso de mascara é obrigatório em alguns estabelecimentos.",
                    categories: ["praia", "sul", "buggy"],
                    hashtags: ["naturismo", "sol", "vida"],
                    distance: 70,
                    stops: 7,
                    duration: 1,
                    coverPhoto: "https://beiramar1.s3.amazonaws.com/pictureService/6.jpeg",
                    location: ["-6.4669268", "-34.9801052"],
                },
            });
        }
    }
    // ADD SERVICES IN PROVIDERS (STORES)
    let providerId = 10; //First provider id = 11
    const getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    for (const element of Array.from(Array(10), (e) => "1")) {
        providerId++;
        let serviceId = 0;
        for (const elem of Array.from(Array(6), (e) => "1")) {
            serviceId++;
            if (getRandomIntInclusive(1, 100) > 50)
                continue;
            await prisma.stores.upsert({
                where: { id: 10000 },
                update: {},
                create: {
                    providerId,
                    serviceId,
                },
            });
        }
    }
    // ADD FOLLOWINGS IN USERS/PROVIDES/ADMINS
    let userId = 0; //First provider id = 11
    for (const element of Array.from(Array(500), (e) => "1")) {
        userId++;
        let userFollowingId = 0;
        for (const elem of Array.from(Array(50), (e) => "1")) {
            userFollowingId++;
            if (getRandomIntInclusive(1, 100) > 33)
                continue;
            await prisma.followings.upsert({
                where: { id: 1000000 },
                update: {},
                create: {
                    userId,
                    userFollowingId,
                },
            });
        }
    }
    // ADD LIKES IN SERVICES
    userId = 0; //First provider id = 11
    for (const element of Array.from(Array(500), (e) => "1")) {
        userId++;
        let serviceId = 0;
        for (const elem of Array.from(Array(6), (e) => "1")) {
            serviceId++;
            if (getRandomIntInclusive(1, 100) > 33)
                continue;
            await prisma.likes.upsert({
                where: { id: 1000000 },
                update: {},
                create: {
                    userId,
                    serviceId,
                },
            });
        }
    }
    // ADD SAVES IN SERVICES
    userId = 0; //First provider id = 11
    for (const element of Array.from(Array(500), (e) => "1")) {
        userId++;
        let serviceId = 0;
        for (const elem of Array.from(Array(6), (e) => "1")) {
            serviceId++;
            if (getRandomIntInclusive(1, 100) > 33)
                continue;
            await prisma.saves.upsert({
                where: { id: 1000000 },
                update: {},
                create: {
                    userId,
                    serviceId,
                },
            });
        }
    }
    // ADD SCHEDULES
    userId = 20; //First provider id = 11
    for (const element of Array.from(Array(480), (e) => "1")) {
        userId++;
        let userServiceId = 0;
        for (const elem of Array.from(Array(15), (e) => "1")) {
            userServiceId++;
            if (getRandomIntInclusive(1, 100) > 33)
                continue;
            await prisma.schedules.upsert({
                where: { id: 1000000 },
                update: {},
                create: {
                    userId,
                    userServiceId,
                    userServiceDate: faker_1.faker.date.soon(),
                },
            });
        }
    }
    // ADD PHOTO SERVICES
    let serviceId = 0; //First provider id = 11
    for (const element of Array.from(Array(6), (e) => "1")) {
        serviceId++;
        for (const elem of Array.from(Array(30), (e) => "1")) {
            if (getRandomIntInclusive(1, 100) > 40)
                continue;
            await prisma.photoServices.upsert({
                where: { id: 1000000 },
                update: {},
                create: {
                    key: faker_1.faker.datatype.uuid(),
                    type: "image/jpg",
                    url: faker_1.faker.image.nature(),
                    serviceId,
                },
            });
        }
    }
    // ADD EVALUATIONS
    let scheduleId = 0; //First provider id = 11
    for (const element of Array.from(Array(1500), (e) => "1")) {
        scheduleId++;
        await prisma.evaluations.upsert({
            where: { id: 1000000 },
            update: {},
            create: {
                scheduleId,
                commentProvider: faker_1.faker.commerce.productDescription(),
                commentService: faker_1.faker.commerce.productDescription(),
                commentUser: faker_1.faker.commerce.productDescription(),
                evaluationProvider: faker_1.faker.datatype
                    .number({
                    min: 1,
                    max: 5,
                    precision: 0.5,
                })
                    .toString(),
                evaluationService: faker_1.faker.datatype
                    .number({
                    min: 1,
                    max: 5,
                    precision: 0.5,
                })
                    .toString(),
                evaluationUser: faker_1.faker.datatype
                    .number({
                    min: 1,
                    max: 5,
                    precision: 0.5,
                })
                    .toString(),
            },
        });
    }
    // ADD PHOTO SCHEDULES
    // let scheduleId = 0; //First provider id = 11
    // for (const element of Array.from(Array(1000), (e) => "1")) {
    //   scheduleId++;
    //   for (const elem of Array.from(Array(30), (e) => "1")) {
    //     if (getRandomIntInclusive(1, 100) > 40) continue;
    //     await prisma.photoSchedules.upsert({
    //       where: { id: 1000000 },
    //       update: {},
    //       create: {
    //         key: faker.datatype.uuid(),
    //         type: "image/jpg",
    //         url: faker.image.nature(),
    //         scheduleId,
    //       },
    //     });
    //   }
    // }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map