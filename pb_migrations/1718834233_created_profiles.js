/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const collection = new Collection({
			id: 'etdl54k56vwybrn',
			created: '2024-06-19 21:57:13.774Z',
			updated: '2024-06-19 21:57:13.774Z',
			name: 'profiles',
			type: 'base',
			system: false,
			schema: [
				{
					system: false,
					id: 'vodgbchi',
					name: 'user',
					type: 'relation',
					required: true,
					presentable: false,
					unique: false,
					options: {
						collectionId: '_pb_users_auth_',
						cascadeDelete: true,
						minSelect: null,
						maxSelect: 1,
						displayFields: null
					}
				},
				{
					system: false,
					id: 'ykt3zolr',
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
				}
			],
			indexes: ['CREATE INDEX `idx_VTowXf1` ON `profiles` (`name`)'],
			listRule: null,
			viewRule: null,
			createRule: null,
			updateRule: null,
			deleteRule: null,
			options: {}
		});

		return Dao(db).saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('etdl54k56vwybrn');

		return dao.deleteCollection(collection);
	}
);
