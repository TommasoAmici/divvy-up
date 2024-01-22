/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xwvbgvlgv0v17w8")

  collection.viewRule = "@request.auth.id != \"\" && user.id = @request.auth.id"
  collection.createRule = "@request.auth.id != \"\" && user.id = @request.auth.id"
  collection.updateRule = "@request.auth.id != \"\" && user.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xwvbgvlgv0v17w8")

  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
