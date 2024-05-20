import prisma from "../model/prisma";
import { Prisma } from "@prisma/client";

export const createUserService = (data: Prisma.UserCreateInput) =>
  prisma.user.create({ data });

export const getUsers = async (page: number, pageSize: number) => {
  const offset = (page - 1) * pageSize;
  const users = await prisma.user.findMany({
    skip: offset,
    take: pageSize,
  });

  const totalUsers = await prisma.user.count();
  const totalPages = Math.ceil(totalUsers / pageSize);

  return { users, totalPages };
};

export const deleteUser = (id: number[]) =>
  prisma.user.deleteMany({
    where: {
      id: {
        in: id,
      },
    },
  });

export const editUser = (data: Prisma.UserUpdateInput, id: number) =>
  prisma.user.update({ data, where: { id } });
