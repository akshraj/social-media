class LocalStorage {

  #convertToString(item) {
    if (typeof item !== 'string') {
      item = JSON.stringify(item);
    }
    return item.toString()
  }

  getItem(localStorageId) {
    const id = this.#convertToString(localStorageId);
    return localStorage.getItem(id);
  }

  setItem(localStorageId, localStorageValue) {
    const id = this.#convertToString(localStorageId);
    localStorage.setItem(id, this.#convertToString((localStorageValue)));
  }
}

export default LocalStorage;