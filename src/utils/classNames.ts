export function classNames(...classes: (string | boolean | undefined | null | { [key: string]: boolean })[]): string {
  return classes
    .filter((cls): cls is string | { [key: string]: boolean } => Boolean(cls))
    .map((className) => {
      if (typeof className === 'object') {
        return Object.entries(className)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
      return className;
    })
    .join(' ');
}
