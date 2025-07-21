export function unreachable(value: never): never {
  throw new Error(`Unreachable case: ${value}`);
}