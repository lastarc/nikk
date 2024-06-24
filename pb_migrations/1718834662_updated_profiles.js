/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('etdl54k56vwybrn');

		collection.listRule = '@request.auth.id != ""';
		collection.viewRule = '@request.auth.id != ""';

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('etdl54k56vwybrn');

		collection.listRule = '@request.auth.id = user.id';
		collection.viewRule = '@request.auth.id = user.id';

		return dao.saveCollection(collection);
	}
);
