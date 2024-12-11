export default interface CountryResponseItem {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      [languageCode: string]: {
        official: string;
        common: string;
      };
    };
  };
  translations: {
    [languageCode: string]: {
      official: string;
      common: string;
    };
  };
}
