export function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  let dayOfMonth: string | number = date.getDate();
  let month: string | number = date.getMonth() + 1;
  let year: string | number = date.getFullYear();
  let hour: string | number = date.getHours();
  let minutes: string | number = date.getMinutes();
  const diffMs = Number(new Date()) - Number(date);
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);

  year = year.toString().slice(-2);
  month = month < 10 ? `0${month}` : month;
  dayOfMonth = dayOfMonth < 10 ? `0${dayOfMonth}` : dayOfMonth;
  hour = hour < 10 ? `0${hour}` : hour;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  if (diffMin < 1) {
    return `только что`;
  }
  if (diffHour < 1) {
    return `${diffMin} минут назад`;
  }
  if (diffHour < 24) {
    return `${hour}:${minutes}`;
  }
  return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`;
}
