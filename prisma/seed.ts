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
  for (const element of Array.from(Array(480), (e) => "1")) {
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
          description:
            "Durante o caminho voc?? ver?? praias urbanas, a Ponte Newton Navarro e o encontro do Rio Potengi com o mar. A primeira parada ser?? na Praia da Redinha, na qual voc?? poder?? adquirir o ingresso para visitar o Aqu??rio de Natal.", // Em seguida voc?? chegar?? nas Dunas de Genipabu! O visual do local ?? composto por uma lagoa, o mar e as dunas, al??m dos dromed??rios. Estes dois ??ltimos te far??o se sentir no deserto. Para ir ?? Praia de Gra??andu ser?? necess??rio atravessar em uma balsa. Ao chegar, aproveite para tomar um banho de mar em suas ??guas calmas. Voc?? tamb??m conhecer?? as dunas e a lagoa de Pitangui. A paisagem se parece com um o??sis. Aproveite para se banhar e descansar nas cadeiras que ficam em meio a ??gua. Em seguida, a pr??xima parada ser?? nas Dunas Douradas. Depois voc?? seguir?? rumo ??s Dunas de Jacum??, no qual voc?? poder?? comprar entradas para se divertir no aero-bunda, no ski-bunda ou no tobog?? kamikaze. A ??ltima parada ser?? na Praia de Muri??. Aproveite para dar um ??ltimo mergulho antes de voltar ao hotel.',
          city: "Natal",
          state: "RN",
          areaAvailability: ["Parnamirim", "Natal", "Genipabu"],
          routeMap: "http://url.com.br",
          price: 600,
          warning: "O uso de mascara ?? obrigat??rio em alguns estabelecimentos.",
          categories: ["praia", "norte", "buggy"],
          hashtags: ["amonatal", "praia", "penaareia", "aventura", "emocao"],
          distance: 110,
          stops: 9,
          coverPhoto:
            "https://beiramar1.s3.amazonaws.com/pictureService/2.jpeg",
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
          description:
            "Um excelente passeio de buggy pelas praias do litoral norte assistindo as belezas naturais e quase intocadas das praias entre Touros/RN e Zumbi/RN. Durante o passeio voc?? ter?? oportunidade de fazer 5 paradas para fotos. Conhecer o", // rio Punau, e ver as escolas de Kite Surf caso queira se aventurar.',
          city: "Zumbi",
          state: "RN",
          areaAvailability: ["zumbi", "rio do fogo", "touros"],
          routeMap: "http://url.com.br",
          price: 300,
          warning: "O uso de mascara ?? obrigat??rio em alguns estabelecimentos.",
          categories: ["praia", "norte", "buggy"],
          hashtags: ["amozumbi", "praia", "amorepaz"],
          distance: 32,
          stops: 5,
          duration: 240,
          coverPhoto:
            "https://beiramar1.s3.amazonaws.com/pictureService/1.jpeg",
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
          subtitle: "O famoso chapad??o",
          description:
            "Dura????o do passeio de mais ou menos 3 horas. O bugueiro prontamente os buscar?? no hotel ou pousada no hor??rio combinado. Nossa primeira parada ser?? no chapad??o da Pipa, com vista para a bela praia do amor e praia do moleque. Prosseguiremos", // caminho passando pela praia das minas (local de desova de tartarugas marinhas), as fal??sias e o morro vermelho. Parada no mirante das fal??sias em Siba??ma. Continuando o passeio, com a mar?? alta ?? poss??vel avistar tartarugas marinhas no mirante das tartarugas. Com a mar?? baixa da para entrar na praia de Siba??ma e dar um refrescante mergulhos nas belas piscinas naturais. O passeio continua pela praia at?? o encontro de rio Cat?? com o mar, depois vamos at?? a fazenda de camar??o (fazendinha). Na fazendinha tem um ??timo restaurante que serve comidas tipicas, local muito agrad??vel na beira do rio Cat??. Atividades cortesia da fazenda s??o, caiaques, arco e flecha, slakline e cavalos. Retorno ?? Pipa.',
          city: "Pipa",
          state: "RN",
          areaAvailability: ["Pipa"],
          routeMap: "http://url.com.br",
          price: 250,
          warning: "O uso de mascara ?? obrigat??rio em alguns estabelecimentos.",
          categories: ["praia", "sul", "buggy"],
          hashtags: ["pipa", "chapadao", "aventura"],
          distance: 50,
          stops: 3,
          duration: 30,
          coverPhoto:
            "https://beiramar1.s3.amazonaws.com/pictureService/3.jpeg",
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
          description:
            "Dura????o do passeio de mais ou menos 4 horas. O bugueiro prontamente os buscar?? no hotel ou pousada no hor??rio combinado. Nossa primeira parada ser?? no chapad??o da Pipa, com vista para a bela praia do amor e praia do moleque. Prosseguiremos", // caminho passando pela praia das minas (local de desova de tartarugas marinhas), as fal??sias e o morro vermelho. Parada no mirante das fal??sias em Siba??ma. Continuando o passeio, com a mar?? alta ?? poss??vel avistar tartarugas marinhas no mirante das tartarugas. Com a mar?? baixa da para entrar na praia de Siba??ma e dar um refrescante mergulhos nas belas piscinas naturais. O passeio continua pela praia at?? o encontro de rio Cat?? com o mar. Faremos a tradicional travessia do rio Cat?? de balsa e vamos at?? a barraca da baiana (com mar?? baixa temos as piscinas naturais e a jacuzzi natural). Prosseguindo at?? o restaurante solimar na praia da barra do Cunha?? (op????o para almo??o, restaurante especializado em grelhados e frutos do mar, como o peixe espada (meca) e lagosta). o passeio continua at?? a igrejinha da barra e mirante do rio Cunha??. Depois prosseguimos por uma estrada rural, passando por um canavial e mata atl??ntica at?? a chegada e parada na fazendinha. Depois retorno ?? Pipa.',
          city: "Barra de Cunhau",
          state: "RN",
          areaAvailability: ["Pipa", "Barra de Cunhau"],
          routeMap: "http://url.com.br",
          price: 300,
          warning: "O uso de mascara ?? obrigat??rio em alguns estabelecimentos.",
          categories: ["praia", "sul", "buggy"],
          hashtags: ["barrinha", "amorepaz", "aventura"],
          distance: 60,
          stops: 5,
          duration: 4,
          coverPhoto:
            "https://beiramar1.s3.amazonaws.com/pictureService/4.jpeg",
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
          description:
            "Dura????o do passeio de mais ou menos 5 horas. O bugueiro prontamente os buscar?? no hotel ou pousada no hor??rio combinado. Nossa primeira parada ser?? no chapad??o da Pipa, com vista para a bela praia do amor e praia do moleque. Prosseguiremos", // caminho passando pela praia das minas (local de desova de tartarugas marinhas), as fal??sias e o morro vermelho. Parada no mirante das fal??sias em Siba??ma. Continuando o passeio, com a mar?? alta ?? poss??vel avistar tartarugas marinhas no mirante das tartarugas. Com a mar?? baixa da para entrar na praia de Siba??ma e dar um refrescante mergulhos nas belas piscinas naturais. O passeio continua pela praia at?? o encontro de rio Cat?? com o mar. Faremos a tradicional travessia do rio Cat?? de balsa e vamos direto at?? o rio Cunha??, aonde atravessaremos com outra balsa. Se a mar?? estiver baixa faremos o percurso at?? Baia Formosa pela praia, se a mar?? estiver alta iremos pela fazenda de c??cos. Visitas ao mirante de Baia Formosa, terra??o do hotel chalemar, praia de Baia Formosa e praia de Bacupari (farol). Depois, retorno ?? Pipa.',
          city: "Bahia Formosa",
          state: "RN",
          areaAvailability: ["Pipa", "Barra de Cunhau", "Baia Formosa"],
          routeMap: "http://url.com.br",
          price: 340,
          warning: "O uso de mascara ?? obrigat??rio em alguns estabelecimentos.",
          categories: ["praia", "sul", "buggy"],
          hashtags: ["praero", "penaareia", "vidalouca"],
          distance: 65,
          stops: 6,
          duration: 2,
          coverPhoto:
            "https://beiramar1.s3.amazonaws.com/pictureService/5.jpeg",
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
          description:
            "Dura????o do passeio de mais ou menos 6 horas. O bugueiro prontamente os buscar?? no hotel ou pousada no hor??rio combinado. Nossa primeira parada ser?? no chapad??o da Pipa, com vista para a bela praia do amor e praia do moleque. Prosseguiremos", // caminho passando pela praia das minas (local de desova de tartarugas marinhas), as fal??sias e o morro vermelho. Parada no mirante das fal??sias em Siba??ma. Continuando o passeio, com a mar?? alta ?? poss??vel avistar tartarugas marinhas no mirante das tartarugas. Com a mar?? baixa da para entrar na praia de Siba??ma e dar um refrescante mergulhos nas belas piscinas naturais. O passeio continua pela praia at?? o encontro de rio Cat?? com o mar. Faremos a tradicional travessia do rio Cat?? de balsa e vamos direto at?? o rio Cunha??, aonde atravessaremos com outra balsa. Se a mar?? estiver baixa faremos o percurso at?? Baia Formosa pela praia, se a mar?? estiver alta iremos pela fazenda de c??cos. Visitas ao mirante de Baia Formosa, terra??o do hotel chalemar, praia de Baia Formosa e praia de Bacupari (farol). Continua????o por praia selvagem at?? o museu do pescador. Depois temos a op????o de conhecer a lagoa da coca cola (lagoa de colora????o escura, rodeada de arreia branca) para chegar l?? s??o 3km por um caminho rodeado por mata atl??ntica. ?? cobrada uma taxa de visita????o de 20 reais por buggy, (n??o incluso no valor do passeio). O passeio continua pela praia at?? a vila de pescadores de Sagi aonde tem a op????o de cinco restaurantes t??picos na praia para almo??o. Depois, retorno ?? Pipa.',
          city: "Sagi",
          state: "RN",
          areaAvailability: ["Sagi", "Barra de Cunhau", "Baia Formosa"],
          routeMap: "http://url.com.br",
          price: 400,
          warning: "O uso de mascara ?? obrigat??rio em alguns estabelecimentos.",
          categories: ["praia", "sul", "buggy"],
          hashtags: ["naturismo", "sol", "vida"],
          distance: 70,
          stops: 7,
          duration: 1,
          coverPhoto:
            "https://beiramar1.s3.amazonaws.com/pictureService/6.jpeg",
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
      if (getRandomIntInclusive(1, 100) > 50) continue;
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
      if (getRandomIntInclusive(1, 100) > 33) continue;
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
      if (getRandomIntInclusive(1, 100) > 33) continue;
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
      if (getRandomIntInclusive(1, 100) > 33) continue;
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
    let storeId = 0;
    for (const elem of Array.from(Array(15), (e) => "1")) {
      storeId++;
      if (getRandomIntInclusive(1, 100) > 33) continue;
      await prisma.schedules.upsert({
        where: { id: 1000000 },
        update: {},
        create: {
          userId,
          storeId,
          userServiceDate: faker.date.soon(),
        },
      });
    }
  }
  // ADD PHOTO SERVICES
  let serviceId = 0; //First provider id = 11
  for (const element of Array.from(Array(6), (e) => "1")) {
    serviceId++;
    for (const elem of Array.from(Array(30), (e) => "1")) {
      if (getRandomIntInclusive(1, 100) > 40) continue;
      await prisma.photoServices.upsert({
        where: { id: 1000000 },
        update: {},
        create: {
          key: faker.datatype.uuid(),
          type: "image/jpg",
          url: faker.image.nature(),
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
        commentProvider: faker.commerce.productDescription(),
        commentService: faker.commerce.productDescription(),
        commentUser: faker.commerce.productDescription(),
        evaluationProvider: faker.datatype
          .number({
            min: 1,
            max: 5,
            precision: 0.5,
          })
          .toString(),
        evaluationService: faker.datatype
          .number({
            min: 1,
            max: 5,
            precision: 0.5,
          })
          .toString(),
        evaluationUser: faker.datatype
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
