import { prisma } from "../database";
import { Schedules as ISchedulesPrisma } from "@prisma/client";

export interface ICreateSchedule {
  userId: number;
  providerId: number;
  serviceId: number;
  userServiceDate: string;
}

export interface ISchedule extends ISchedulesPrisma {}

export class Schedules {
  static async createSchedule(data: ICreateSchedule) {
    try {
      const store = await prisma.stores.findFirst({
        where: { providerId: data.providerId, serviceId: data.serviceId },
      });
      if (!store) return null;
      const storeId = store.id;
      const schedule = await prisma.schedules.create({
        data: {
          userId: data.userId,
          storeId,
          userServiceDate: data.userServiceDate,
        },
      });

      return schedule;
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async listAllSchedules() {
    try {
      const schedules = await prisma.schedules.findMany({
        where: {},
      });
      return schedules || [];
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async listAllSchedulesOneService({
    serviceId,
  }: {
    serviceId: number;
  }) {
    try {
      const schedules = await prisma.schedules.findMany({
        where: {
          store: { serviceId },
        },
        include: { store: { include: { provider: true, service: true } } },
      });

      return schedules || [];
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async listAllSchedulesOneProvider({
    providerId,
  }: {
    providerId: number;
  }) {
    try {
      const schedules = await prisma.schedules.findMany({
        where: {
          store: { providerId },
        },
        include: { store: { include: { provider: true, service: true } } },
      });

      return schedules || [];
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async showOneScheduleWithPhotosWithEvaluations({
    scheduleId,
  }: {
    scheduleId: number;
  }) {
    try {
      const schedule = await prisma.schedules.findFirst({
        where: { id: scheduleId },
        include: { photos: true, evaluation: true },
      });
      return schedule || {};
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }
}
