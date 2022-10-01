export function checkIfDuplicateExists(arr) {
  return new Set(arr).size !== arr.length;
}
