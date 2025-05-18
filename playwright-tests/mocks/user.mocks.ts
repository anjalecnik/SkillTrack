import { UserEntity } from "api/src/libs/db/entities/user.entity";
import { UserRole } from "api/src/utils/types/enums/user-role.enum";
import { UserStatus } from "api/src/utils/types/enums/user-status.enum";
import { Mock } from "ts-mockery";

export const ADMIN_ENTITY: UserEntity = Mock.of<UserEntity>({
  id: 1,
  email: "testAdmin@example.com",
  password: "Testpassword1#$žžž",
  status: UserStatus.Active,
  role: UserRole.Owner,
  name: "TestAdmin",
  surname: "adminSurname",
});

export const SUPERVISOR_ENTITY: UserEntity = Mock.of<UserEntity>({
  id: 2,
  email: "testSupervisor@example.com",
  password: "Testpassword1#$ččč",
  status: UserStatus.Active,
  role: UserRole.User,
  name: "TestSupervisor",
  surname: "supervisorSurname",
  managerId: 1,
});

export const USER_ENTITY: UserEntity = Mock.of<UserEntity>({
  id: 3,
  email: "testUser@example.com",
  password: "Testpassword1#$ššš",
  status: UserStatus.Active,
  role: UserRole.User,
  name: "TestUser",
  surname: "userSurname",
  managerId: 2,
});
