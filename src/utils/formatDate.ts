import dayjs from "dayjs";

export default function formatDate(inputDate: string) {
  if (!inputDate.length) return "";

  const formattedDate = dayjs(inputDate).format('DD/MM/YYYY');

  return formattedDate;
}
