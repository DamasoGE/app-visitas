export const getWeekRange = () => {
  const today = new Date();
  const day = today.getDay();
  const isoDay = day === 0 ? 6 : day - 1;

  const monday = new Date(today);
  monday.setDate(today.getDate() - isoDay);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { monday, sunday };
};

export const formatDisplayDate = (date: Date) =>
  date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    timeZone: 'Europe/Madrid',
  });



export const formatDisplayTime = (date: Date) =>
  date.toLocaleTimeString('es-ES', {
    timeZone: 'Europe/Madrid',
    hour: '2-digit',
    minute: '2-digit',
  });

export const normalizeDateKey = (date: Date) =>
  date.toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });

export  const formatDocDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };