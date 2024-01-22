/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8lv6ixhzqwsip08")

  collection.viewRule = "@request.auth.id != \"\" && members.id ?= @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8lv6ixhzqwsip08")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
