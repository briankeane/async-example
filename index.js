function idsToSaveAndDelete(originalArr, modifiedArr) {
  var originalMembers = {};
  var modifiedMembers = {};
  var toSave = [];
  var toDelete = [];

  for (let i = 0; i < originalArr.length; i++) {
    originalMembers[originalArr[i]] = true;
  }
  for (let i = 0; i < modifiedArr.length; i++) {
    modifiedMembers[modifiedArr[i]] = true;
  }

  // find the ones that are in the original array
  // but not in the modified array for delete
  for (let i = 0; i < originalArr[i]; i++) {
    var id = originalArr[i];
    if (!modifiedMembers[id]) {
      toDelete.push(id);
    }
  }

  // find the ones that are in the modified array
  // but not the original array for save
  for (let i = 0; i < modifiedArr[i]; i++) {
    var id = modifiedArr[i];
    if (!originalMembers[id]) {
      toSave.push(id);
    }
  }
  return {
    toSave,
    toDelete,
  };
}

function idsToSaveAndDeleteAsync(
  originalArr,
  modifiedArr,
  saveFuncAsync,
  deleteFuncAsync
) {
  return new Promise((resolve, reject) => {
    let data = idsToSaveAndDelete(originalArr, modifiedArr);
    let promises = [
      ...data.toSave.map((id) => saveFuncAsync(id)),
      ...data.toDelete.map((id) => deleteFuncAsync(id)),
    ];
    Promise.all(promises).then((results) => resolve(data));
  });
}

module.exports = {
  idsToSaveAndDelete,
  idsToSaveAndDeleteAsync,
};
