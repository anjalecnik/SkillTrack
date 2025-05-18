import { ChildProcess } from "child_process";

declare global {
  var __API_PROCESS__: ChildProcess;
  var __WEB_PROCESS__: ChildProcess;
}
