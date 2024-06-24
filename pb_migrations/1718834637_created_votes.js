/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const collection = new Collection({
			id: '2q5l1u64zseldm9',
			created: '2024-06-19 22:03:57.192Z',
			updated: '2024-06-19 22:03:57.192Z',
			name: 'votes',
			type: 'base',
			system: false,
			schema: [
				{
					system: false,
					id: 'reelx3nj',
					name: 'profile',
					type: 'relation',
					required: true,
					presentable: false,
					unique: false,
					options: {
						collectionId: 'etdl54k56vwybrn',
						cascadeDelete: true,
						minSelect: null,
						maxSelect: 1,
						displayFields: null
					}
				},
				{
					system: false,
					id: 'oryeao7u',
					name: 'character',
					type: 'relation',
					required: true,
					presentable: false,
					unique: false,
					options: {
						collectionId: 'i7mafqbep52hivh',
						cascadeDelete: true,
						minSelect: null,
						maxSelect: 1,
						displayFields: null
					}
				},
				{
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
				}
			],
			indexes: ['CREATE UNIQUE INDEX `idx_TdQeCRY` ON `votes` (\n  `profile`,\n  `character`\n)'],
			listRule: '@request.auth.id != ""',
			viewRule: '@request.auth.id != ""',
			createRule: '@request.auth.id = profile.user.id',
			updateRule: '@request.auth.id = profile.user.id',
			deleteRule: '@request.auth.id = profile.user.id',
			options: {}
		});

		return Dao(db).saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('2q5l1u64zseldm9');

		return dao.deleteCollection(collection);
	}
);
