/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8p91imxz1m0bn4r")

  collection.options = {
    "query": "SELECT e.paid_by AS id, SUM(e.amount) AS total FROM expenses e WHERE e.settled = FALSE GROUP BY e.\"group\", e.paid_by"
  }

  // remove
  collection.schema.removeField("6xakqmbs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xiill8ra",
    "name": "total",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8p91imxz1m0bn4r")

  collection.options = {
    "query": "SELECT e.paid_by AS id, SUM(e.amount) AS total FROM expenses e WHERE e.settled = FALSE GROUP BY e.paid_by"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6xakqmbs",
    "name": "total",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("xiill8ra")

  return dao.saveCollection(collection)
})
