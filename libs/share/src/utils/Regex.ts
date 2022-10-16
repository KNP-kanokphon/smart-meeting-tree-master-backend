const telephone = {
  pattern: /^(06|08|09)[0-9]{8}$/,
  errorMsg: 'Telephone must be 10 digits start with 06, 08 or 09',
};

const dateFormat = {
  pattern: /^\d{4}-\d{2}-\d{2}$/,
  errorMsg: 'Date must be yyyy-MM-dd format',
};

const dateFormatWithTime = {
  pattern: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/,
  errorMsg: 'Date must be yyyy-MM-dd HH:mm format',
};

const standardPassword = {
  pattern: /^[a-zA-Z0-9@$!%*?]{6,16}$/,
  errorMsg: 'The password must be between 6-16 characters',
};

export default {
  telephone,
  dateFormat,
  standardPassword,
  dateFormatWithTime,
};
