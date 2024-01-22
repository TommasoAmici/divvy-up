/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8p91imxz1m0bn4r")

  collection.options = {
    "query": "SELECT\n  (ROW_NUMBER() OVER()) as id,\n  e.\"group\" AS group_id,\n  e.paid_by AS paid_by,\n  SUM(e.amount) AS total\nFROM expenses e\n  WHERE e.settled = FALSE\n  GROUP BY e.\"group\", e.paid_by"
  }

  // remove
  collection.schema.removeField("xiill8ra")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uhcco5ug",
    "name": "group_id",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "8lv6ixhzqwsip08",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5tydpa3p",
    "name": "paid_by",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tml4zxsp",
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
    "query": "SELECT e.paid_by AS id, SUM(e.amount) AS total FROM expenses e WHERE e.settled = FALSE GROUP BY e.\"group\", e.paid_by"
  }

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

  // remove
  collection.schema.removeField("uhcco5ug")

  // remove
  collection.schema.removeField("5tydpa3p")

  // remove
  collection.schema.removeField("tml4zxsp")

  return dao.saveCollection(collection)
})
