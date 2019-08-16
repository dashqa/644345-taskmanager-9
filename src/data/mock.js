import {getRandomNum, getRandomBool} from './../utils';
import moment from 'moment';

const MILLISECONDS_PER_WEEK = 7 * 24 * 3600 * 1000;
const MAX_TAGS = 3;
const DESCRIPTIONS = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const TAGS = [`homework`, `theory`, `practice`, `intensive`, `keks`];
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

const generateData = () => ({
  get description() {
    return DESCRIPTIONS[getRandomNum(0, DESCRIPTIONS.length - 1)];
  },
  dueDate: moment(getRandomNum(Date.now() - MILLISECONDS_PER_WEEK, Date.now() + MILLISECONDS_PER_WEEK)),
  repeatingDays: {
    'Mo': getRandomBool(),
    'Tu': false,
    'We': getRandomBool(),
    'Th': false,
    'Fr': getRandomBool(),
    'Sa': false,
    'Su': false,
  },
  get tags() {
    const tempSet = new Set();
    for (let i = 0; i < getRandomNum(0, MAX_TAGS); i++) {
      tempSet.add(TAGS[getRandomNum(0, TAGS.length - 1)]);
    }
    return tempSet;
  },
  get color() {
    return COLORS[getRandomNum(0, COLORS.length - 1)];
  },
  isFavorite: getRandomBool(),
  isArchive: getRandomBool(),
});

export const getMock = (quantity) => {
  return new Array(quantity).fill(``).map(generateData);
};
