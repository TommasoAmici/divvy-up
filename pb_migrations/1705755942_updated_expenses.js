/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("74x8733mywfbhk5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vuo6zcer",
    "name": "settled_at",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("74x8733mywfbhk5")

  // remove
  collection.schema.removeField("vuo6zcer")

  return dao.saveCollection(collection)
})
