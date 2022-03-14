import { prisma } from "../database";
import {
  Services as IServicesPrisma,
  Likes as ILikesPrisma,
  Saves as ISavesPrisma,
  Stores as IStoresPrisma,
  Schedules as ISchedulesPrisma,
  Evaluations as IEvaluationsPrisma,
  Users as IProvidersPrisma,
} from "@prisma/client";

export interface ICreateService {
  title: string;
  subtitle?: string;
  description: string;
  city: string;
  state: string;
  areaAvailability: string[];
  routeMap?: string;
  price: number;
  warning?: string;
  categories: string[];
  hashtags: string[];
  distance: number;
  stops: number;
  duration: number;
  coverPhoto: string;
  location: string[];
  isActive?: boolean;
}

export interface IServices extends IServicesPrisma {}

export class Services {
  static async createService(data: ICreateService) {
    try {
      const service = await prisma.services.create({
        data: {
          ...data,
        },
      });
      return service;
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static parseService(
    service: IServicesPrisma & {
      likes: ILikesPrisma[];
      saves: ISavesPrisma[];
      stores: (IStoresPrisma & {
        schedules: (ISchedulesPrisma & {
          evaluation: IEvaluationsPrisma;
        })[];
      })[];
    }
  ) {
    const schedules = service.stores.reduce(
      (acc, store) => [...acc, ...store.schedules],
      []
    );
    delete service.stores;

    const evaluations = [];
    for (const schedule of schedules) {
      if (schedule.evaluation) evaluations.push(schedule.evaluation);
    }

    const averageRating =
      evaluations.reduce(
        (acc, evaluation) => acc + Number(evaluation.evaluationProvider),
        0
      ) / evaluations.length;

    const numberOfSaves = service.saves.length;
    const numberOfLikes = service.likes.length;
    const numberOfComments = evaluations.length;
    const numberOfSchedules = schedules.length;

    return {
      ...service,
      schedules,
      evaluations,
      averageRating,
      numberOfSaves,
      numberOfLikes,
      numberOfComments,
      numberOfSchedules,
    };
  }

  static async listAllServices() {
    try {
      const services = await prisma.services.findMany({
        where: {},
        include: {
          likes: true,
          saves: true,
          stores: {
            include: {
              schedules: { include: { evaluation: true } },
              provider: true,
            },
          },
        },
      });

      const servicesParsed =
        services?.map((service) => Services.parseService(service)) || [];

      return servicesParsed;
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async listAllCategoriesServices() {
    try {
      const services = await prisma.services.findMany({ where: {} });
      let listAllCategories = [];
      services
        ? services.forEach((service) => {
            listAllCategories = [...listAllCategories, ...service.categories];
          })
        : [];

      const listAllCategoriesUnique = [...new Set(listAllCategories)];

      return listAllCategoriesUnique ? listAllCategoriesUnique : [];
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async showOneServiceWithPhotosWithProvidersWithEvaluation({
    serviceId,
  }: {
    serviceId: number;
  }) {
    try {
      const service = await prisma.services.findFirst({
        where: { id: serviceId },
        include: {
          likes: true,
          saves: true,
          stores: { include: { schedules: { include: { evaluation: true } } } },
        },
      });

      const servicesParsed = !!service ? Services.parseService(service) : {};
      return servicesParsed;
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async removeOneService({ serviceId }: { serviceId: number }) {
    try {
      const service = await prisma.services.delete({
        where: { id: serviceId },
      });
      return !!service;
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }
}
