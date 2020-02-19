export const matchesRegex = (value: string, filter?: RegExp): boolean => filter ? value.match(filter) !== null : true;
