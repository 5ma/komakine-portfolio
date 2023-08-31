export const setSessionStorage = (json) => {
  sessionStorage.setItem('kmkn_portfolio', JSON.stringify(json));
};