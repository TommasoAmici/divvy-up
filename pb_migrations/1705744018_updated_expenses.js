/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("74x8733mywfbhk5")

  collection.updateRule = "@request.auth.id != \"\" && group.members.id ?= @request.auth.id && paid_by.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("74x8733mywfbhk5")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
