export default function trimFormValues(
  form: HTMLFormElement
): Record<string, string> {
  const trimmedValues: Record<string, string> = {};

  new FormData(form).forEach((value, key) => {
    if (typeof value === 'string') {
      trimmedValues[key] = value.trim();
    }
  });

  return trimmedValues;
}
