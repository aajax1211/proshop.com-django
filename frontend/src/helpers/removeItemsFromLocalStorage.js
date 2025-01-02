
export const removeItemsFromLocalStorage = (keys) => {
  keys.forEach((key) => {
    localStorage.removeItem(key)
  }); 
}
