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

export default d3;
