export function arraysContainSameStrings(
  array1: string[],
  array2: string[]
): boolean {
  return (
    array1.length === array2.length &&
    array1.every((str) => array2.includes(str)) &&
    array2.every((str) => array1.includes(str))
  );
}
