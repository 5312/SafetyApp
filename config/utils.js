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
}
