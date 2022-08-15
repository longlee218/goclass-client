const useDebounce = (func, delay = 3000) => {
  let debounceTimer;
  return function () {
    console.log(arguments);
    const context = this.debouceTimer;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export default useDebounce;
