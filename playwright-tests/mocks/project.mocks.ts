import { ProjectEntity } from "api/src/libs/db/entities/project.entity";
import { Mock } from "ts-mockery";

export const PROJECT_CREATE_MOCK: ProjectEntity = Mock.of<ProjectEntity>({
  name: "Testni Playwright projekt",
});
