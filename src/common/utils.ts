import { basename, dirname } from "path";
import { recase } from "@kristiandupont/recase";
import { uuid } from 'uuidv4';

export const toCamelCase = recase(null, "camel");
export const toPascalCase = recase(null, "pascal");

export const basenames = (root: string, dir: string) => {
  const directories: string[] = [];
  let current = dir;
  while (current !== root) {
    directories.unshift(basename(current));
    current = dirname(current);
  }
  return directories;
};
