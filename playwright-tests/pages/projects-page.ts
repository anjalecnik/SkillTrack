import { type Locator, type Page } from "@playwright/test";
import Selectors from "../selectors";
import { ProjectEntity } from "api/src/libs/db/entities/project.entity";

export class ProjectsPage {
  readonly page: Page;

  readonly searchInput: Locator;
  readonly addProjectButton: Locator;
  readonly projectInput: Locator;
  readonly createProjectButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.locator(
      `[data-testid="${Selectors.common.searchInput}"]`
    );
    this.addProjectButton = page.locator(
      `[data-testid="${Selectors.project.addProjectBtn}"]`
    );
    this.projectInput = page.locator(
      `[data-testid="${Selectors.project.projectInput}"]`
    );
    this.createProjectButton = page.locator(
      `[data-testid="${Selectors.project.createProjectBtn}"]`
    );
  }

  async openAddNewProjectDialog(): Promise<void> {
    await this.addProjectButton.waitFor();
    await this.addProjectButton.click();
  }

  async createNewProject(project: ProjectEntity): Promise<void> {
    await this.projectInput.fill(project.name);

    await this.createProjectButton.waitFor();
    await this.createProjectButton.click();
  }

  getProjectInProjectTable(projectName: string): Locator {
    return this.page.locator("table tr", { hasText: projectName });
  }
}
