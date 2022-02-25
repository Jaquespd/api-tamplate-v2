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
            "Durante o caminho você verá praias urbanas, a Ponte Newton Navarro e o encontro do Rio Potengi com o mar. A primeira parada será na Praia da Redinha, na qual você poderá adquirir o ingresso para visitar o Aquário de Natal.", // Em seguida você chegará nas Dunas de Genipabu! O visual do local é composto por uma lagoa, o mar e as dunas, além dos dromedários. Estes dois últimos te farão se sentir no deserto. Para ir à Praia de Graçandu será necessário atravessar em uma balsa. Ao chegar, aproveite para tomar um banho de mar em suas águas calmas. Você também conhecerá as dunas e a lagoa de Pitangui. A paisagem se parece com um oásis. Aproveite para se banhar e descansar nas cadeiras que ficam em meio a água. Em seguida, a próxima parada será nas Dunas Douradas. Depois você seguirá rumo às Dunas de Jacumã, no qual você poderá comprar entradas para se divertir no aero-bunda, no ski-bunda ou no tobogã kamikaze. A última parada será na Praia de Muriú. Aproveite para dar um último mergulho antes de voltar ao hotel.',
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
            "Um excelente passeio de buggy pelas praias do litoral norte assistindo as belezas naturais e quase intocadas das praias entre Touros/RN e Zumbi/RN. Durante o passeio você terá oportunidade de fazer 5 paradas para fotos. Conhecer o", // rio Punau, e ver as escolas de Kite Surf caso queira se aventurar.',
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
          subtitle: "O famoso chapadão",
          description:
            "Duração do passeio de mais ou menos 3 horas. O bugueiro prontamente os buscará no hotel ou pousada no horário combinado. Nossa primeira parada será no chapadão da Pipa, com vista para a bela praia do amor e praia do moleque. Prosseguiremos", // caminho passando pela praia das minas (local de desova de tartarugas marinhas), as falésias e o morro vermelho. Parada no mirante das falésias em Sibaúma. Continuando o passeio, com a maré alta é possível avistar tartarugas marinhas no mirante das tartarugas. Com a maré baixa da para entrar na praia de Sibaúma e dar um refrescante mergulhos nas belas piscinas naturais. O passeio continua pela praia até o encontro de rio Catú com o mar, depois vamos até a fazenda de camarão (fazendinha). Na fazendinha tem um ótimo restaurante que serve comidas tipicas, local muito agradável na beira do rio Catú. Atividades cortesia da fazenda são, caiaques, arco e flecha, slakline e cavalos. Retorno à Pipa.',
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
            "Duração do passeio de mais ou menos 4 horas. O bugueiro prontamente os buscará no hotel ou pousada no horário combinado. Nossa primeira parada será no chapadão da Pipa, com vista para a bela praia do amor e praia do moleque. Prosseguiremos", // caminho passando pela praia das minas (local de desova de tartarugas marinhas), as falésias e o morro vermelho. Parada no mirante das falésias em Sibaúma. Continuando o passeio, com a maré alta é possível avistar tartarugas marinhas no mirante das tartarugas. Com a maré baixa da para entrar na praia de Sibaúma e dar um refrescante mergulhos nas belas piscinas naturais. O passeio continua pela praia até o encontro de rio Catú com o mar. Faremos a tradicional travessia do rio Catú de balsa e vamos até a barraca da baiana (com maré baixa temos as piscinas naturais e a jacuzzi natural). Prosseguindo até o restaurante solimar na praia da barra do Cunhaú (opção para almoço, restaurante especializado em grelhados e frutos do mar, como o peixe espada (meca) e lagosta). o passeio continua até a igrejinha da barra e mirante do rio Cunhaú. Depois prosseguimos por uma estrada rural, passando por um canavial e mata atlântica até a chegada e parada na fazendinha. Depois retorno à Pipa.',
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
            "Duração do passeio de mais ou menos 5 horas. O bugueiro prontamente os buscará no hotel ou pousada no horário combinado. Nossa primeira parada será no chapadão da Pipa, com vista para a bela praia do amor e praia do moleque. Prosseguiremos", // caminho passando pela praia das minas (local de desova de tartarugas marinhas), as falésias e o morro vermelho. Parada no mirante das falésias em Sibaúma. Continuando o passeio, com a maré alta é possível avistar tartarugas marinhas no mirante das tartarugas. Com a maré baixa da para entrar na praia de Sibaúma e dar um refrescante mergulhos nas belas piscinas naturais. O passeio continua pela praia até o encontro de rio Catú com o mar. Faremos a tradicional travessia do rio Catú de balsa e vamos direto até o rio Cunhaú, aonde atravessaremos com outra balsa. Se a maré estiver baixa faremos o percurso até Baia Formosa pela praia, se a maré estiver alta iremos pela fazenda de côcos. Visitas ao mirante de Baia Formosa, terraço do hotel chalemar, praia de Baia Formosa e praia de Bacupari (farol). Depois, retorno à Pipa.',
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
            "Duração do passeio de mais ou menos 6 horas. O bugueiro prontamente os buscará no hotel ou pousada no horário combinado. Nossa primeira parada será no chapadão da Pipa, com vista para a bela praia do amor e praia do moleque. Prosseguiremos", // caminho passando pela praia das minas (local de desova de tartarugas marinhas), as falésias e o morro vermelho. Parada no mirante das falésias em Sibaúma. Continuando o passeio, com a maré alta é possível avistar tartarugas marinhas no mirante das tartarugas. Com a maré baixa da para entrar na praia de Sibaúma e dar um refrescante mergulhos nas belas piscinas naturais. O passeio continua pela praia até o encontro de rio Catú com o mar. Faremos a tradicional travessia do rio Catú de balsa e vamos direto até o rio Cunhaú, aonde atravessaremos com outra balsa. Se a maré estiver baixa faremos o percurso até Baia Formosa pela praia, se a maré estiver alta iremos pela fazenda de côcos. Visitas ao mirante de Baia Formosa, terraço do hotel chalemar, praia de Baia Formosa e praia de Bacupari (farol). Continuação por praia selvagem até o museu do pescador. Depois temos a opção de conhecer a lagoa da coca cola (lagoa de coloração escura, rodeada de arreia branca) para chegar lá são 3km por um caminho rodeado por mata atlântica. É cobrada uma taxa de visitação de 20 reais por buggy, (não incluso no valor do passeio). O passeio continua pela praia até a vila de pescadores de Sagi aonde tem a opção de cinco restaurantes típicos na praia para almoço. Depois, retorno à Pipa.',
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
          coverPhoto:
            "https://beiramar1.s3.amazonaws.com/pictureService/6.jpeg",
          location: ["-6.4669268", "-34.9801052"],
        },
      });
    }
  }
  // ADD SERVICES IN PROVIDERS
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
      if (getRandomIntInclusive(1, 100) > 33) continue;
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
