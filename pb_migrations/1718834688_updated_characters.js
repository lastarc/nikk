/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('i7mafqbep52hivh');

		collection.listRule = '@request.auth.id != "" && visible = true';
		collection.viewRule = '@request.auth.id != "" && visible = true';

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('i7mafqbep52hivh');

		collection.listRule = 'visible = true';
		collection.viewRule = 'visible = true';

		return dao.saveCollection(collection);
	}
);
