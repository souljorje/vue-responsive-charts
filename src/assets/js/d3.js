/**
 * Don't be afraid, I just lost the edge between
 * optimisation and adequacy.
 */

import {
  line,
  area,
  pie,
  arc,
} from 'd3-shape';
import {
  scaleTime,
  scaleLinear,
} from 'd3-scale';
import {
  timeMinute,
  timeHour,
  timeDay,
  timeWeek,
  timeMonth,
  timeYear,
} from 'd3-time';
import {
  timeParse,
  timeFormat,
  timeFormatLocale,
  timeFormatDefaultLocale,
  utcParse,
} from 'd3-time-format';
import {
  format,
  formatDefaultLocale,
} from 'd3-format';
import {
  select,
  selectAll,
} from 'd3-selection';
/* for attrs feature */
import 'd3-selection-multi';
import {
  extent,
} from 'd3-array';
import {
  axisBottom,
  axisRight,
} from 'd3-axis';

const d3 = {
  line,
  area,
  pie,
  arc,
  scaleTime,
  scaleLinear,
  timeFormat,
  timeMinute,
  timeHour,
  timeDay,
  timeWeek,
  timeMonth,
  timeYear,
  timeParse,
  timeFormatLocale,
  timeFormatDefaultLocale,
  utcParse,
  formatDefaultLocale,
  format,
  select,
  selectAll,
  extent,
  axisBottom,
  axisRight,
};

export const localization = {
  number: {
    decimal: ',',
    thousands: ' ',
    grouping: [3],
    currency: ['', ' ₽'],
  },
  time: {
    dateTime: '%A, %e %B %Y г. %H:%M',
    date: '%d.%m.%Y',
    time: '%H:%M',
    periods: ['ч', 'ч'],
    days: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    shortDays: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
  },

};

export const locale = d3.timeFormatLocale(localization.time);
d3.timeFormatDefaultLocale(localization.time);

export const formaters = {
  Hour: locale.format('%H:%M'),
  Day: locale.format('%d %b'),
  Week: locale.format('%d %b'),
  Month: locale.format('%B'),
  Year: locale.format('%B %Y'),
};

export function multiFormat(date) {
  if (d3.timeDay(date) < date) {
    return formaters.Hour(date);
  }
  if (d3.timeMonth(date) < date) {
    if (d3.timeWeek(date) < date) {
      return formaters.Day(date);
    }
    return formaters.Week(date);
  }
  if (d3.timeYear(date) < date) {
    return formaters.Month(date);
  }
  return formaters.Year(date);
}

export default d3;
