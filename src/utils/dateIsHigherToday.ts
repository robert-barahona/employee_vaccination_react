import moment from "moment"

export const dateIsHigherToday = (date?: Date | string | null) => {
  if (!moment(date).isValid()) return false;
  return moment(date).format('YYYY-MM-DD') > moment(new Date).format('YYYY-MM-DD');
}