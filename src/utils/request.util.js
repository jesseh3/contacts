const parseWith = (parser) => (text) => {
  if (!parser) {
    throw new Error('Missing a parser.');
  }

  if (!text) {
    throw new Error('Missing text.');
  }

  return parser(text);
};

module.exports = {
  parseWith
};
