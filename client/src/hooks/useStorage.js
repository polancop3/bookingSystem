import { useState } from "react"

/**
 * Wraps read-write functionality of the localStorage. This is
 * useful for React components that must be re-rendered when storage
 * values change.
 * 
 * @param key The associated key.
 * @param initialValue The initial value to be used if there is no previously defined value.
 * @returns An array where the first value is the storage value, and the second is a function to update the value.
 */
const useStorage = (key, initialValue) => {

  const setItem = (val) => {
    const serializedValue = JSON.stringify(val);
    localStorage.setItem(key, serializedValue);
  }

  const [value, setValue] = useState(() => {
    let cachedValue = localStorage.getItem(key);

    if (cachedValue === undefined) {
      cachedValue = initialValue
      setItem(cachedValue);
    }

    return cachedValue
  })

  const storeValue = (value) => {
    setItem(value);
    setValue(value);
  }

  return [value, storeValue]
}

export default useStorage