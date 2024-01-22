/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xwvbgvlgv0v17w8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5hjonnms",
    "name": "settings",
    "type": "json",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xwvbgvlgv0v17w8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5hjonnms",
    "name": "config",
    "type": "json",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
})
