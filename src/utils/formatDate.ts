export default function formatDate(inputDate: string) {

  const date = new Date(inputDate);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
  const year = date.getFullYear();

  // Format Date : DD-MM-YYYY
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}
