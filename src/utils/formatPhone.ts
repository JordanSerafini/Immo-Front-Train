export default function formatPhone(phone: string) {
  let formatedPhone = '';

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < phone.length; i++) {
    if (i > 0 && i % 2 === 0) {
      formatedPhone += '.';
    }
    formatedPhone += phone[i];
  }

  return formatedPhone;
}
