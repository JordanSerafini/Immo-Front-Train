export default function formatDate(inputDate: string) {

  const slicedDate = inputDate.slice(0, 10).split('-');

  // Format Date : DD-MM-YYYY
  const formattedDate = [slicedDate[2], slicedDate[1], slicedDate[0]].join("/")

  return formattedDate;
}
