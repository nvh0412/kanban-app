export default (alt, storage, storageName) => {
  try {
    alt.bootstrap(storage.get(storageName));
  } catch (e) {
    console.log('Failed to Bootstrap data', e);
  }

  //Fired when state has been change
  alt.FinalStore.listen(() => {
    if (!storage.get('debug')) {
      storage.set(storageName, alt.takeSnapshot());
    }
  });
}
