export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
export const getRandomBool = () => Math.random() < 0.5;

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template, tag = `div`, classNames) => {
  const element = document.createElement(tag);
  classNames ? classNames.forEach((name) => element.classList.add(name)) : ``;
  element.innerHTML = template;
  return element;
};


export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};
