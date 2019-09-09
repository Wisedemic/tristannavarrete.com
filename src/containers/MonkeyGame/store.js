import store from 'store2'
// import 'store2/on'
/** Importing store gives you access to a "database" already.
 * Just pretend it's already configured and DO NOT SAVE SENSETIVE INFORMATION BECAUSE IT IS SAVED LOCALLY. */

function storageAvailable(type) {
  var storage
  try {
    storage = window[type]
    var x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0)
    )
  }
}

const getStore = () => {
  if (storageAvailable('localStorage')) return store
  return new Error("localStorage isn't available!")
}

module.exports = {
  getStore
}
