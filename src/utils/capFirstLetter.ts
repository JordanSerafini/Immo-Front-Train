export default function capFirstLetter(string: string) {
  return `${string.charAt(0).toLocaleUpperCase()}${string
    .slice(1)
    .toLocaleLowerCase()}`;
}
