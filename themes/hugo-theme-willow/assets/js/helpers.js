export const getRandomBoolean = () =>
  Math.floor((Math.random() * 10)) % 2 === 0;

export const getRandomFromRange = min => max => couldBeNegative =>
  Math.floor((Math.random() * (max - min)) + 1) * (couldBeNegative ? (getRandomBoolean() ? -1 : 1) : 1);
  
export const getPercentage = num => percentage => (num * percentage) / 100;

export const shortenText = length => text =>
  text.trim().substring(0, length).split(' ').slice(0, -1).join(' ') + '...';

export const createElementWithClass = element => classes =>
  $(document.createElement(element)).addClass(classes);

export const windowElement = (classes = '') => children =>
  createElementWithClass('div')(`window ${ classes }`).append(children);

export const closeWindowCallback = element => icon => {
  $(element).remove();
  $(icon).removeClass('open');
};

export const windowOptionsCSS = () => ({
  left: `${getRandomFromRange(0)(50)(false)}%`,
  top: `${getRandomFromRange(0)(50)(false)}%`
});

export const windowHeaderElement = (classes = '') => text => children => {
  const header = createElementWithClass('header')(`title-bar ${ classes }`);
  header.append(createElementWithClass('p')('title-bar-text')).text(text);
  header.append(children);
  return header;
};

export const iframeElement = url => createElementWithClass('iframe')('window-body').attr('src', url);

export const buttonElement = (classes = []) => ariaLabel => (text = '') =>
  $(createElementWithClass('button')(classes)).attr('aria-label', ariaLabel);

export const titlebarControls = () => {
  const container = createElementWithClass('div')('title-bar-controls');
  const min = buttonElement('minimize')('Minimize')();
  const max = buttonElement('maximize')('Maximize')();
  const close = buttonElement('close')('Close')();

  container.append(min, max, close);

  return container;
};

export const windowStatusBarElement = classes => createElementWithClass('footer')(classes);

export const createFullWindowElement = anchor => {
  const controls = titlebarControls();
  return windowElement()([
    windowHeaderElement()(anchor.title)(controls),
    iframeElement(anchor.href),
  ]);
};
