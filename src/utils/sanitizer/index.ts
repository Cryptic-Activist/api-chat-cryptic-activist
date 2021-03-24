import sanitizeHtml from 'sanitize-html';

export function sanitizeInputRegistration(
  names: { firstName: string; lastName: string },
  username: string,
): {
  names: { firstName: string; lastName: string };
  username: string;
} {
  const cleanFirstName = sanitizeHtml(names.firstName, {
    allowedTags: [],
  }).trim();
  const cleanLastName = sanitizeHtml(names.lastName, {
    allowedTags: [],
  }).trim();
  const cleanUsername = sanitizeHtml(username, {
    allowedTags: [],
  }).trim();

  return {
    names: {
      firstName: cleanFirstName,
      lastName: cleanLastName,
    },
    username: cleanUsername,
  };
}

export function sanitizeInputLanguage(
  languageName: string,
): { languageName: string } {
  let cleanLanguageName: string = sanitizeHtml(languageName, {
    allowedTags: [],
  });

  cleanLanguageName = cleanLanguageName.toLowerCase();

  cleanLanguageName = cleanLanguageName.replace('_', '');
  cleanLanguageName = cleanLanguageName.replace(/[^\w\s]/gi, '');
  cleanLanguageName = cleanLanguageName
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
    .trim();

  return {
    languageName: cleanLanguageName,
  };
}
