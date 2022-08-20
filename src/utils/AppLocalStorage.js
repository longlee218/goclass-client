function AppLocalStorage(key) {
  const json = JSON.parse(localStorage.getItem(key)) ?? {};
  const save = () => {
    localStorage.setItem(key, JSON.stringify(json));
  };
  const storeage = {
    get(key) {
      return json[key];
    },
    set(key, value) {
      json[key] = value;
      save();
    },
    myStore() {
      return json;
    },
  };

  return storeage;
}

export default AppLocalStorage;
