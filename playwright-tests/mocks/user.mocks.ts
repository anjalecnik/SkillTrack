import { UserEntity } from "api/src/libs/db/entities/user.entity";
import { Mock } from "ts-mockery";

export const ADMIN_ENTITY: UserEntity = Mock.of<UserEntity>({
  id: 1,
  email: "anjas.lecnik@gmail.com",
  name: "Anja",
  surname: "Lecnik",
});

export const SUPERVISOR_ENTITY: UserEntity = Mock.of<UserEntity>({
  id: 14,
  email: "info.staffscore@gmail.com",
  name: "Adaline",
  surname: "Gilliat",
  managerId: 1,
});

export const USER_ENTITY: UserEntity = Mock.of<UserEntity>({
  id: 13,
  email: "staffscoreuser@gmail.com",
  name: "Freddi",
  surname: "Hinsche",
  managerId: 2,
});

export const USER_CREATE_MOCK: UserEntity = Mock.of<UserEntity>({
  email: "testni.uporabnik@gmail.com",
  name: "Testni",
  surname: "Uporabnik",
});

export const USER_UPDATE_MOCK: UserEntity = Mock.of<UserEntity>({
  name: "SpremenjenoIme",
  birthDate: new Date("1995-08-15"),
});
