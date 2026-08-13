import { getContentRepository } from "../lib/content/index.js";
import { validateRepository } from "../lib/content/validate.js";
const result=validateRepository(getContentRepository());if(!result.valid){console.error(result.errors.join("\n"));process.exitCode=1}else console.log("Content models are valid.");
