/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('2q5l1u64zseldm9');

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'sllown1l',
				name: 'name',
				type: 'text',
				required: true,
				presentable: false,
				unique: false,
				options: {
					min: null,
					max: null,
					pattern: ''
				}
			})
		);

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('2q5l1u64zseldm9');

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'sllown1l',
				name: 'nick',
				type: 'text',
				required: true,
				presentable: false,
				unique: false,
				options: {
					min: null,
					max: null,
					pattern: ''
				}
			})
		);

		return dao.saveCollection(collection);
	}
);
