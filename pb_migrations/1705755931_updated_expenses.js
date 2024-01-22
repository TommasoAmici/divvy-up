/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("74x8733mywfbhk5")

  // remove
  collection.schema.removeField("zqvn3ypz")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("74x8733mywfbhk5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zqvn3ypz",
    "name": "settled",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
