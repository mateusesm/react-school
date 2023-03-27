/* Gambiarra para salvar no localStorage sem o Redux-persist, pois ele não estava funcionando, talvez por o curso ser um pouco antigo e as configurações serem diferentes */

export const addLocalStorage = (data) => {
  localStorage.setItem('login', JSON.stringify(data));
};

export const getLocalStorage = (key) => {
  if (localStorage.getItem(key)) {
    return localStorage.getItem(key);
  }
  return false;
};

export const clearLocalStorage = () => {
  localStorage.removeItem('login');
};
