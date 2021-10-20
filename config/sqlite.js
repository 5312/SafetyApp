// #ifdef APP-PLUS
    class Sqlite {
    	constructor(arg) {

    	}
    	init() {

    	}
    	open() {
    		plus.sqlite.openDatabase({
    			name: 'yhadd',
    			path: '_yhadd/yh.db',
    			success: function(e) {
    				// plus.nativeUI.alert('打开数据库成功');  
    				console.log('打开数据库成功')
    			},
    			fail: function(e) {
    				// plus.nativeUI.alert("打开数据库失败");  
    			}
    		})
    	}
    }
	const sqlite = new Sqlite();
	export default sqlite;
    // #endif
