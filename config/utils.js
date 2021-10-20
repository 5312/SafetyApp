export default {
	/**
	 * pid形式数据转children形式
	 * @param data 需要转换的数组
	 * @param idKey id字段名
	 * @param pidKey pid字段名
	 * @param childKey 生成的children字段名
	 * @param pid 顶级的pid
	 * @returns {[]}
	 */
	toTreeData(data, idKey, pidKey, childKey, pid) {
		if (!childKey) childKey = 'children';
		if (pid === undefined) {
			pid = [];
			data.forEach(d => {
				let flag = true;
				for (let i = 0; i < data.length; i++) {
					if (d[pidKey] == data[i][idKey]) {
						flag = false;
						break;
					}
				}
				if (flag) pid.push(d[pidKey]);
			});
		}
		let result = [];
		data.forEach(d => {
			if (d[idKey] == d[pidKey]) return console.error('data error: ', d);
			if (Array.isArray(pid) ? (pid.indexOf(d[pidKey]) !== -1) : (d[pidKey] == pid)) {
				let children = this.toTreeData(data, idKey, pidKey, childKey, d[idKey]);
				if (children.length > 0) d[childKey] = children;
				result.push(d);
			}
		});
		return result;
	},
	/**
	 * children 性式转化成pid 
	 * @param data 需要遍历的数组
	 * @param id id字段名
	 * @param pid pid字段名
	 * @param children 生成的children字段名
	 */
	childrenToPid(data, id = 'id', pid = 'pid', children = 'children') {
		let array = [];

		const getObj = function(list) {

			list.forEach(row => {
				if (row[children]) {
					getObj(row[children])
					// 清空children在push
					// row[children] = null;
					// delete row[children]
					array.push(row)
				} else {
					array.push(row)
				}
			});
		};
		let ar = JSON.stringify(data);

		getObj(JSON.parse(ar));

		return array
	},
	/**
	 * 遍历children形式数据
	 * @param data 需要遍历的数组
	 * @param callback 回调
	 * @param childKey children字段名
	 */
	eachTreeData(data, callback, childKey) {
		if (!childKey) childKey = 'children';
		data.forEach(d => {
			if (callback(d) !== false && d[childKey]) this.eachTreeData(d[childKey], callback, childKey);
		});
	},
	/**
	 * 数字前置补零
	 * @param num 数字
	 * @param length 位数
	 * @returns {string}
	 */
	digit(num, length) {
		let str = '';
		num = String(num);
		length = length || 2;
		for (let i = num.length; i < length; i++) str += '0';
		return num < Math.pow(10, length) ? str + (num | 0) : num;
	},
	/**
	 * 转化为日期格式字符
	 * @param time 时间
	 * @param format 格式
	 * @returns {string}
	 */
	toDateString(time, format) {
		if (!time) return '';
		if (typeof time === 'string') time = time.replace(/-/g, '/');
		let date = new Date(time || new Date()),
			ymd = [
				this.digit(date.getFullYear(), 4),
				this.digit(date.getMonth() + 1),
				this.digit(date.getDate())
			],
			hms = [
				this.digit(date.getHours()),
				this.digit(date.getMinutes()),
				this.digit(date.getSeconds())
			];
		format = format || 'yyyy-MM-dd HH:mm:ss';
		return format.replace(/yyyy/g, ymd[0])
			.replace(/MM/g, ymd[1])
			.replace(/dd/g, ymd[2])
			.replace(/HH/g, hms[0])
			.replace(/mm/g, hms[1])
			.replace(/ss/g, hms[2]);
	},
}
