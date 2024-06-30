export function createDateFilter({
  minDate,
  maxDate,
}: {
  minDate?: Date;
  maxDate?: Date;
}): { date?: { $gte?: Date; $lte?: Date } } {
  const dateFilter: { date?: { $gte?: Date; $lte?: Date } } = {};

  if (minDate || maxDate) {
    dateFilter.date = {};
    if (minDate) {
      const startOfDay = new Date(minDate);
      startOfDay.setHours(0, 0, 0, 0);
      dateFilter.date.$gte = startOfDay;
    }
    if (maxDate) {
      const endOfDay = new Date(maxDate);
      endOfDay.setHours(23, 59, 59, 999);
      dateFilter.date.$lte = endOfDay;
    }
  }

  return dateFilter;
}
