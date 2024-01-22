/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8lv6ixhzqwsip08")

  collection.createRule = "@request.auth.id != \"\" && owner = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8lv6ixhzqwsip08")

  collection.createRule = null

  return dao.saveCollection(collection)
})
