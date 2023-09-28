export default function getFullDate() {
    const currentDate = new Date();
    
    currentDate.setUTCHours(0, 0, 0, 0);

    return currentDate.toISOString();
}