import dayjs from "dayjs";

export default function getFormatedFullDate() {
    return dayjs().format('YYYY-MM-DD')
}