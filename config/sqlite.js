import $http from '@/config/requestConfig'
export default class Sqlite {
	constructor(arg) {
		this.catchData = [];
		this.name = 'cache';
		this.path = "_doc/cache.db";
		this.creatSql = `select * from xt_bumen`;
		this.createTable = `CREATE TABLE IF NOT EXISTS xt_bumen (
	ID INT PRIMARY KEY NOT NULL,
	name TEXT NOT NULL,
	pid INT NOT NULL,
	hr_dept_list JSON,
	bumen_detail TEXT,
	code TEXT,
	pname TEXT,
	pname_id TEXT,
	yh TEXT,
	xn TEXT,
	bumen_type TEXT,
	bumen_status TEXT,
	responsibility TEXT,
	phone TEXT,
	ordernum TEXT

)
	`;
		this.createTable2 = `CREATE TABLE
IF
	NOT EXISTS catche_time ( ID INT PRIMARY KEY NOT NULL, time text )`
		if (!plus.sqlite.isOpenDatabase({
				name: this.name,
				path: this.path
			})) {
			this.init();
		}
	}
	async init() {
		// console.log('init')
		// 初始化时 创建表
		const [err, res] = await this.awaitWrap(this.open())
		let sql = this.createTable
		let sql2 = this.createTable2
		if (res) {
			// 初始化创建表 xt_bumen
			const [err, creatres] = await this.awaitWrap(this.createUsers(sql))
			// 创建一个 存储 缓存时间的表
			const [err2, creatres2] = await this.awaitWrap(this.createUsers(sql2))
			this.isCatche();
		}
	}
	// 是否更新过
	async isCatche() {
		// 查询表
		const [errsel, select] = await this.awaitWrap(this.findData(`select * from catche_time order by time desc`))
		if (select) {

			if (select.length <= 0) {
				// 没同步过
				let _this = this
				$http.get('/index/Hjob.ashx?type=sel', {
					tabid: 'YH_liebiao178698a5-ccf0-439a-8cf1-f4d8dc8121d8',
					mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
					job: 'demo_node_1',
					tbname: 'YH',
					T: 'app_catche_sql',
				}, {
					load: false
				}).then(res => {
					if (res.data.data) {
						_this.catchData = res.data.data
						_this.insterFunc();
					}
				})
			} else {
				console.log('有',select)
				// 最后一次同步时间
			}
		}
	}
	open() {
		let name = this.name;
		let path = this.path;
		return new Promise((resolve, reject) => {
			plus.sqlite.openDatabase({
				name: name,
				path: path,
				success: function(e) {
					console.log('打开数据库成功')
					resolve(true)
				},
				fail: function(e) {
					plus.nativeUI.alert("打开数据库失败");
					reject('fail.')
				}
			})
		})
	}
	// 抽离成公共方法
	awaitWrap(promise) {
		return promise
			.then(data => [null, data])
			.catch(err => [err, null])
	}
	// 查询语句
	findData(sql) {
		let name = this.name
		return new Promise((resolve, reject) => {
			plus.sqlite.selectSql({
				name: name,
				sql: sql,
				success: data => {
					resolve(data)
				},
				fail: () => {
					reject('fail.')
				}
			})
		})
	}
	// 插入
	insterFunc() {
		let array =[{ids:1,bumen_name:'123'}]; //this.catchData
		let val = []
		for (var i = 0; i < array.length; i++) {
			const element = array[i];
			val.push(`(${element.ids},${element.bumen_name})`)
		}
		let a = `
		INSERT INTO 'catche_time' ('ID', 'time') VALUES
		${val.join(',')};
		`
		console.log(a)
		this.insert(a)
	}
	// 插入封装
	insert(sql) {
		let name = this.name;
		return new Promise((resolve, reject) => {
			plus.sqlite.executeql({
				name: name,
				sql:sql,
				success: () => {
					console.log('插入成功')
				},
				fail: () => {
					console.log('插入失败')
					reject('fail.')
				}
			})
		})

	}
	// 事务
	transaction() {
		let name = this.name;
		return new Promise((resolve, reject) => {
			plus.sqlite.transaction({
				name: name,
				operation: 'begin',
				success: () => {
					// 成功后提交
					// plus.sqlite.transaction({
					// 	name:name,
					// 	operation:'commit'
					// })
					resolve('ok.')
				},
				fail: () => {
					// console.log('fail.')
					plus.sqlite.transaction({
						name: name,
						operation: 'rollback'
					})
					reject('fail.')
				},
			})
		})
	}
	// 执行增删改创建表等语句
	createUsers(sql) {
		let name = this.name
		return new Promise((resolve, reject) => {
			plus.sqlite.executeSql({
				name: name,
				sql: sql,
				success: () => {
					resolve('ok.')
				},
				fail: () => {
					console.log('fail.')
					reject('fail.')
				}
			})
		})
	}

}
