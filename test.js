const { expect } = require("chai");
const { idsToSaveAndDelete, idsToSaveAndDeleteAsync } = require("./index");

describe("Array stuff", function () {
  it("figures out who to save and delete", function () {
    var originalArr = [1, 2, 3, 4, 5, 6, 8, 9, 10];
    var modifiedArr = [2, 4, 6, 7, 8, 9, 10, 11, 12];
    // to delete: 1,3,5
    // to save: 7,11,12
    const result = idsToSaveAndDelete(originalArr, modifiedArr);
    expect(result.toDelete).to.deep.equal([1, 3, 5]);
    expect(result.toSave).to.deep.equal([7, 11, 12]);
  });

  describe("async save", function () {
    var saved;
    var deleted;

    function saveAsync(id) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          saved.push(id);
          resolve();
        }, 500);
      });
    }
    function deleteAsync(id) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          deleted.push(id);
          resolve();
        }, 500);
      });
    }

    beforeEach(function () {
      saved = [];
      deleted = [];
    });

    it("works async", async function () {
      var originalArr = [1, 2, 3, 4, 5, 6, 8, 9, 10];
      var modifiedArr = [2, 4, 6, 7, 8, 9, 10, 11, 12];
      // to delete: 1,3,5
      // to save: 7,11,12
      const result = await idsToSaveAndDeleteAsync(
        originalArr,
        modifiedArr,
        saveAsync,
        deleteAsync
      );
      expect(result.toDelete).to.deep.equal([1, 3, 5]);
      expect(result.toSave).to.deep.equal([7, 11, 12]);
      expect(deleted).to.have.members([1, 3, 5]);
      expect(saved).to.have.members([7, 11, 12]);
    });
  });
});
