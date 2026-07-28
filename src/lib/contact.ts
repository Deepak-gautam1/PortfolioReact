// Base64-encoded so the digits don't appear as a plain-text literal in the
// shipped JS bundle (deters static scraping of the built files; a real
// browser still decodes and shows the number normally).
const PHONE_B64 = "KzkxOTU5OTE3MTYyMw==";

export const getPhoneDigits = () => atob(PHONE_B64);

export const getPhoneDisplay = () => {
  const digits = getPhoneDigits();
  return `${digits.slice(0, 3)} ${digits.slice(3)}`;
};

export const getPhoneHref = () => `tel:${getPhoneDigits()}`;
