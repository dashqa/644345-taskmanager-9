import {getRandomInt, getRandomBool} from './../utils';
import moment from 'moment';

const MILLISECONDS_PER_WEEK = 7 * 24 * 3600 * 1000;
const MAX_TAGS = 3;
const DESCRIPTIONS = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const TAGS = [`homework`, `theory`, `practice`, `intensive`, `keks`];
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

export const generateData = () => ({
  get description() {
    return DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)];
  },
  dueDate: moment(getRandomInt(Date.now() - MILLISECONDS_PER_WEEK, Date.now() + MILLISECONDS_PER_WEEK)),
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
    const tagsQuantity = getRandomInt(0, MAX_TAGS);
    for (let i = 0; i < tagsQuantity; i++) {
      tempSet.add(TAGS[getRandomInt(0, TAGS.length - 1)]);
    }
    return tempSet;
  },
  get color() {
    return COLORS[getRandomInt(0, COLORS.length - 1)];
  },
  isFavorite: getRandomBool(),
  isArchive: getRandomBool(),
});

