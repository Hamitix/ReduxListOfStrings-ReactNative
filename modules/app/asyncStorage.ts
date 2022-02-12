import AsyncStorage from '@react-native-async-storage/async-storage'

export const writeItemToStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (err) {
    console.log(`Error while saving value ${value} in AsyncStorage : `, err)
  }
}

export const getAllKeysFromStorage = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys()
    return !!allKeys ? allKeys : []
  } catch (err) {
    console.log(`Error while retriving all keys in AsyncStorage : `, err)
  }
}

export const getAllItemsFromStorage = async () => {
  const allKeys = await getAllKeysFromStorage()
  if (!!allKeys) {
    const items = await AsyncStorage.multiGet(allKeys)
    return !!items ? items : []
  }
}

export const removeValueFromStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (err) {
    console.log(`Error while removing the key ${key} in AsyncStorage : `, err)
  }
}

export const clearAllItems = async () => {
  try {
    await AsyncStorage.clear()
  } catch (err) {
    console.log(`Error while clearing the AsyncStorage : `, err)
  }
}
