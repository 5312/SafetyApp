<template>
	<view class="content">
		<!-- 录入 -->
		<view class="wrap">
			<u-form :model="form" ref="uForm" :error-type="errorType">
				<u-form-item label-width='150rpx' :required='true' prop="responsibledepartme" label="责任部门">
					<u-popup v-model="depart" mode="center" border-radius='14' width='90%' height="90%">
						<view class="p_content">
							<scroll-view scroll-y="true" style="height: 90%;">
								<ly-tree v-if="isReady" ref="tree" :props="props" :showRadio='true' :ready="ready"
									:checkOnClickNode='true' :lazy="true" :load='load' node-key="id">
								</ly-tree>
							</scroll-view>
							<view class="btngroup">
								<u-button size="medium" :ripple="true" shape="square" type="primary"
									@click="treeSelect">确定
								</u-button>
								<u-button size="medium" :ripple="true" shape="square" type="info" @click="depart=false">
									取消
								</u-button>
							</view>
						</view>
					</u-popup>
					<u-input v-model="form.bumen_name" :select-open='depart' type="select" @click='topzerenbumen' />
				</u-form-item>
				<u-form-item label-width='150rpx' :required='true' prop="address_name" label="检查地点">
					<u-input v-model="form.address_name" @click='anExamination' />
				</u-form-item>
				<u-form-item label-width='150rpx' prop="yh_address_all" label="详细地点">
					<u-input v-model="form.yh_address_all" type="text" />
				</u-form-item>
				<u-form-item label-width='150rpx' :required='true' prop="inspeopleTitle" label="检查人">
					<u-input v-model="form.inspeopleTitle" :disabled="true" @click="listOfPeople('jc')" />
				</u-form-item>
				<u-form-item label-width='150rpx' prop="accompanyTitle" label="陪检人">

					<u-input v-model="form.accompanyTitle" @click="listOfPeople('pj')" />
				</u-form-item>
				<!--  -->
				<u-form-item label-width='150rpx' prop="accompanyTitle" label="同行人">

					<u-input v-model="form.peerpeopleTitle" @click="listOfPeople('tx')" />
				</u-form-item>
				<!--  -->
				<u-form-item label-width='150rpx' :required='true' prop="inspectiondate" label="检查日期">
					<u-calendar v-model="dateShow" :min-date="mindate" mode="date" @change='inspectiondateFunc'>
					</u-calendar>
					<u-input v-model="form.inspectiondate" :select-open='dateShow' type="select"
						@click='dateShow = true' />
				</u-form-item>
				<u-form-item label-width='150rpx' :required='true' prop="oldofclass" label="班次">
					<u-radio-group v-model="form.oldofclass">
						<u-radio v-model="item.checked" v-for="(item, index) in oldOfClass" :key="index"
							:name="item.dict_name">
							{{ item.dict_name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<!--  -->
				<u-form-item label-width='150rpx' label="检查类别">
					<u-select @confirm="checkingFunc" v-model="checking" value-name='ids' label-name='jiancha_name'
						:list="checkingType"></u-select>

					<u-input v-model="form.yh_zhuanxiangLable" :select-open='checking' @click="checking = true"
						type="select" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="资金">
					<u-input v-model="form.yh_fine" type="number" />
				</u-form-item>
				<!--  -->
				<u-form-item label-width='150rpx' prop="leader" label="带班领导">
					<u-switch slot="right" v-model="form.leaderv"></u-switch>
				</u-form-item>
				<u-form-item label-width='150rpx' label="行走路线">
					<u-input v-model="form.yh_route" type="text" />
				</u-form-item>
				<u-form-item label-width='150rpx' :required='true' prop="yh_content" label="隐患内容">
					<u-input v-model="form.yh_content" type="textarea" @click='yhCentent' />
				</u-form-item>
				<u-form-item label-width='150rpx' label="整改要求">
					<u-input v-model="form.yh_rectify" type="textarea" />
				</u-form-item>
				<u-form-item label-width='150rpx' :required='true' prop="yh_level" label="隐患等级">
					<u-radio-group v-model="form.yh_level">
						<u-radio v-for="(item, index) in radioList" :key="item.ids"
							:name="item.dict_name + '~' + item.dict_text + '~' + item.color"
							:disabled="item.isshow == 'True'?'':'disabled'">
							{{ item.dict_name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item v-if="pin_number" prop="del_dept" :required='true' label-width='150rpx' label="销号部门">
					<u-input v-model="form.del_dept" :select-open='depart' type="select" @click='xiaohao' />
					<u-button class="sbtn" type="success" :ripple="true" size="mini" @click='my_dept'>本部门</u-button>
					<u-button class="sbtn" type="success" :ripple="true" size="mini" @click='zr_dept'>责任部门</u-button>
				</u-form-item>
				<u-form-item label-width='150rpx' prop="yh_kindt" label="隐患种类">
					<u-select v-model="dangertypeShow" label-name='dict_name' value-name='ids' :list="dangertypeAllData"
						@confirm='dangertypeFunc'></u-select>
					<u-input v-model="form.yh_kindt" :select-open='dangertypeShow' type="select"
						@click='dangertypeShow = true' />
				</u-form-item>
				<!--  -->
				<u-upload ref="uUpload" :action="action" :file-list="fileList" @on-change='uploadChange'></u-upload>
				<view class="input_box u-flex">
					<view class="upload_info u-flex" v-for="(v,i) in video" :key='i'>
						<view class="vbox">
							<video class="video" :src="base.baseUrl+v" controls></video>
							<text class="delete" @click="onDeleteVideo(i)">
								<u-icon name="close" color='#fff'></u-icon>
							</text>
						</view>
					</view>
					<view class="upload_info u-flex">
						<view class="u-add-wrap">
							<u-icon size="36" name='plus'></u-icon>
							<view>上传视频</view>
						</view>
						<view class="upload-img" @click="uploadFile"></view>
					</view>
				</view>
				<!--  -->
				<u-form-item label-width='180rpx' label="要求完成时间">
					<u-calendar v-model="claim" :min-date="yqmindate" :max-date="maxdate" mode="date" @change='reqDate'>
					</u-calendar>
					<u-input v-model="form.yh_requesttime" type="select" @click='claim = true' />
				</u-form-item>
				<u-form-item>
					<u-radio-group v-model="rname" @change="radioGroupChange">
						<u-radio name='null'>当班整改</u-radio>
						<u-radio name='0'>当天整改</u-radio>
						<u-radio name='1'>一天整改</u-radio>
						<u-radio name='2'>二天整改</u-radio>
						<u-radio name='3'>三天整改</u-radio>
					</u-radio-group>
				</u-form-item>
				<view class="btnbox u-flex u-flex-nowrap uicon-file-text-fill">
					<u-button class="btn" type="success" :ripple="true" size="medium" @click='submit'>提交并下达</u-button>
					<u-button class="btn" type="primary" :ripple="true" size="medium" @click="save">保存</u-button>
				</view>
			</u-form>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import base from '@/config/baseUrl.js';
	import LyTree from '@/components/ly-tree/ly-tree.vue'
	import util from '@/config/utils.js'
	import Qs from 'qs'
	export default {
		components: {
			LyTree
		},
		data() {
			return {
				// 责任部门还是销号部门
				zeren: true,
				isReady: false,
				ready: true, // 这里用于自主控制loading加载状态，避免异步正在加载数据的空档显示“暂无数据”
				props: {
					label: 'bumen_name',
					isleaf: 'havechild',
					disabled: function(data, node) {
						return data.disabled = data.radiodisabled
					}
				},
				propsType: {
					label: 'dict_name',
					children: 'children'
				},
				// 检查类别
				checking: false,
				checkingType: [],
				video: [],
				// 
				rangeKey: 'bumen_name',
				rname: 0, // 当天整改选中
				claim: false, // 要求完成时间
				jcpeople: false, // 检查人
				pjpeople: false, // 陪检人
				termsShow: false, //条款
				departmentData: [],
				rec: false, // 接收
				copy: false,
				depart: false,
				dangertypeShow: false, // 隐患种类
				dangertypeAllData: [],
				dateShow: false, // 日期
				params: { // 日期
					year: true,
					month: true,
					day: true,
				}, // 文字提示
				errorType: ['message', 'toast'],
				pname: '',
				pin_number: true, // 销号部门
				form: {
					yh_zhuanxiangLable: '',
					yh_zhuanxiang: '',
					yh_fine: 0,
					yh_route: '',
					yh_rectify: '',
					yh_level: '一般隐患~c~#a7b308',
					like1: 1,
					file: '',
					personalfine: 0,
					fine: 0,
					yh_circuit: '{"0":"B","1":"BE","2":"E","3":"A","4":"A","5":"A","6":"B","7":"B","8":"B"}',
					yh_terms: '',
					leaderv: false,
					yh_content: '',
					address_name: '',
					responsibledepartme: '',
					filepath: [],
					operating_json: JSON.stringify({}),
					operating_type: '隐患下达',
					yh_origin: '',
					id: this.$u.guid(null),
					yh_state: 0,
					yh_requesttime: this.getDateNow()
				},
				rules: { // 验证
					address_name: [{
						required: true,
						message: '请输入检查地点',
					}],
					responsibledepartme: [{
						required: true,
						message: '请输入责任部门',
					}],
					yh_level: [{
						required: true,
						message: '请输入隐患等级',
					}],
					address: [{
						required: true,
						message: '请输入检查地点',
					}],
					inspeopleTitle: [{ // 检查人
						required: true,
						message: '请输入检查人',
					}],

					inspectiondate: [{
						required: true,
						message: '请选择日期',
					}],
					oldofclass: [{
						required: true,
						message: '请选择班次',
					}],
					yh_content: [{
						required: true,
						message: '请输入隐患内容',
					}],
					yh_kindt: [{
						required: true,
						message: '请输入隐患种类',
					}],
					del_dept: [{
						required: true,
						message: '请选择销号部门',
					}],

				},
				// inspeopleList: [],
				inspeople: [],
				dangerData: [],
				radio: '',
				switchVal: false,
				terms: [], // 条款
				action: base.baseUrl + '/root/HandlerUpload.ashx?type=3',
				fileList: [],

			}
		},
		watch: {
			'form.yh_level'(old) {

			},
			'form.yh_requesttime'(old) {
				let star = this.form.inspectiondate;
				let end = this.form.yh_requesttime;
				let dateBagin = new Date(star.replace(/-/g, "/")).getTime();
				let dateOver = new Date(end.replace(/-/g, "/")).getTime();
				let radio = (dateOver - dateBagin) / (1000 * 3600 * 24)
				this.rname = radio
			}
		},
		computed: {
			...mapState(['user', 'userid', 'list']),
			treeData() {
				const childrenData = util.toTreeData(this.departmentData, 'id', 'pid', 'children', '')
				return childrenData
			},

			radioList() {
				return this.dangerData.filter(function(item) {
					if (item.type == "yh_grade") {
						let obj = {
							name: item.dict_name,
							value: item.dict_name + '~' + item.dict_text + '~' + item.color
						}
						return obj
					}
				})
			},
			oldOfClass() {
				return this.dangerData.filter(function(item) {
					if (item.type == "oldofclass") {
						return item
					}
				})
			},
			// 检查时间
			mindate() {
				let td = 60 * 60 * 24 * 2 * 1000;
				let time = this.$u.timeFormat(new Date() - td, 'yyyy-mm-dd');
				return time
			},
			yqmindate() {
				// 要求完成时间
				let time = this.$u.timeFormat(new Date(), 'yyyy-mm-dd');
				return time
			},
			maxdate() {
				let td = 60 * 60 * 24 * 365 * 1000;
				let time = this.$u.timeFormat(new Date().getTime() + td, 'yyyy-mm-dd');
				return time
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady(o) {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(option) {
			this.isReady = true;
			// 请求数据
			this.checkFunc();
			// 基本数据
			this.danger()
			// 默认填充
			this.catchData();
			// 监听事件 地点 
			uni.$on('backAddress', (res) => {
				this.form.address = res.address;
				this.form.address_name = res.address_name;
				this.form.depart_pname = res.depart_pname;
				this.$forceUpdate()
			})
			// 监听事件选择人员
			uni.$on('jcbackPeople', (resins) => {
				this.form.inspeople = resins.inspeople;
				this.form.inspeopleTitle = resins.name;
				// 强制更新
				this.$forceUpdate()
			})
			// 监听事件 陪检人
			uni.$on('pjbackPeople', (resins) => {
				// this.form.accompany = [];

				if (!this.form.accompany) {
					this.form.accompany = "";
					this.form.accompanyTitle = "";
				}
				let oldval = this.form.accompany.split(',')
				oldval.push(resins.accompany);
				let oldid = this.form.accompanyTitle.split(',')
				oldid.push(resins.name)

				this.form.accompany = oldval.filter(i => i && i.trim()).join(',')
				this.form.accompanyTitle = oldid.filter(i => i && i.trim()).join(',')

				// 强制更新
				this.$forceUpdate()
			})
			// 监听事件 同行人
			uni.$on('txbackPeople', (resins) => {
				if (!this.form.peerpeople) {
					this.form.peerpeople = "";
					this.form.peerpeopleTitle = "";
				}
				let oldval = this.form.peerpeople.split(',')
				oldval.push(resins.peerpeople);
				let oldid = this.form.peerpeopleTitle.split(',')
				oldid.push(resins.name)

				this.form.peerpeople = oldval.filter(i => i && i.trim()).join(',')
				this.form.peerpeopleTitle = oldid.filter(i => i && i.trim()).join(',')
				// 强制更新
				this.$forceUpdate()
			})
			// 监听事件 隐患库-隐患内容
			uni.$on('yhLibContent', (res1) => {
				this.form.yh_content = res1.yh_lib_content;
				this.$forceUpdate()
			})
		},
		onUnload() {
			// 移除监听事件
			uni.$off('backAddress');
			uni.$off('yhLibContent');
			uni.$off('jcbackPeople');
			uni.$off('pjbackPeople');
		},
		methods: {
			async danger() {
				if (!this.$cache.get('_dangerData')) {
					// 隐患等级
					const res = await this.$http.get('/index/Hjob.ashx?type=sel', {
						tabid: 'YH_liebiao08d2367f-618b-429c-bb8f-5c7634ad508b',
						mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
						job: 'demo_node_1',
						tbname: 'YH',
						T: 'add_yhsql',
						level: 'A'
					})
					this.dangerData = res.data.data
				} else {
					this.dangerData = this.$cache.get('_dangerData')
				}

				if (!this.$cache.get('_dangertypeAllData')) {
					// 隐患种类
					const restype = await this.$http.get('/index/Hjob.ashx?type=sel', {
						tabid: 'YH_liebiao08d2367f-618b-429c-bb8f-5c7634ad508b',
						mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
						job: 'demo_node_1',
						tbname: 'YH',
						T: 'app_yh_type_sql',
						level: this.user.level
					})
					this.dangertypeAllData = restype.data.data
				} else {
					this.dangertypeAllData = this.$cache.get('_dangertypeAllData')
				}
			},
			async checkFunc() {
				if (!this.$cache.get('_checkingType')) {
					// 检查类别
					const restype = await this.$http.get('/index/Hjob.ashx?type=sel', {
						tabid: 'YH_liebiao08d2367f-618b-429c-bb8f-5c7634ad508b',
						mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
						job: 'demo_node_1',
						tbname: 'YH',
						T: 'app_checking',
						department_id: this.user.department_id
					})
					this.checkingType = restype.data.data

				} else {
					this.checkingType = this.$cache.get('_checkingType')
				}
				if (this.checkingType && this.checkingType.length <= 0) {
					let obj = {
						createdate: "2021-07-12 17:48:12",
						end_time: "2088-07-12",
						ids: "7591465c-c9bc-4e9c-9d6b-bac734173bf4",
						jiancha_name: "日常检查",
						link_depart: "000000000000000000000000000000000001",
						link_departname: "集团",
						star_time: "2021-07-01",
					}
					this.checkingType.push(obj)
				}
			},
			checkingFunc(d) {
				this.form.yh_zhuanxiang = d[0].value
				this.form.yh_zhuanxiangLable = d[0].label
			},
			catchData() {
				// 地点主体部门
				this.pname = this.user.department_id
				// 责任部门
				this.form.bumen_name = this.user.department_name
				this.form.responsibledepartme = this.user.department_id
				// 检查人
				this.form.inspeopleTitle = this.user.users_name
				this.form.inspeople = this.user.users_name + '~' + this.userid + '~' + this.user.department_name + '~' +
					this.user.department_id
				// 班次
				if (this.oldOfClass.length > 0) {
					this.form.oldofclass = this.oldOfClass[0].dict_name
				}
				// 隐患等级
				if (this.radioList.length > 0) {
					let arr = this.radioList[0];
					this.form.yh_level = arr.dict_name + '~' + arr.dict_text + '~' + arr.color
				}
				// 检查日期
				this.form.inspectiondate = this.$u.timeFormat(new Date(), 'yyyy-mm-dd');
			},
			yhCentent() {
				this.$u.route({
					url: './select_yhcenter/select_yhcenter',
					type: 'navigateTo',
					animationType: 'pop-in',

				})
			},
			listOfPeople(e) {
				this.$u.route({
					url: '../listOfPeople/listOfPeople',
					type: 'navigateTo',
					animationType: 'pop-in',
					params: {
						type: e
					}
				})
			},
			anExamination() {
				if (this.form.responsibledepartme == '') {
					this.$refs.uToast.show({
						title: '请选择责任部门',
						type: 'error',
					})
					return
				}
				this.$u.route({
					url: './select_address/select_address',
					type: 'navigateTo',
					animationType: 'pop-in',
					params: {
						pname: this.pname
					}
				})
			},
			topzerenbumen() {
				// 责任部门
				this.zeren = true
				this.depart = true;
			},
			xiaohao() {
				// 销号部门
				this.zeren = false;
				this.depart = true;
			},
			my_dept() {
				this.form.del_dept_id = this.user.department_id
				// this.form.del_dept = this.user.department_name
				this.$set(this.form,'del_dept',this.user.department_name)
				// this.$forceUpdate()
			},
			zr_dept() {
				// console.log(this.form)
				this.form.del_dept_id = this.form.responsibledepartme
				// this.form.del_dept = this.form.bumen_name
				this.$set(this.form,'del_dept',this.form.bumen_name)
				// this.$forceUpdate()
			},
			// 补零函数
			doHandleZero(zero) {
				var date = zero;
				if (zero.toString().length == 1) {
					date = "0" + zero;
				}
				return date;
			},
			// 获取当前年-月-日
			getDateNow(n = 0) {
				var myDate = new Date();
				var tYear = myDate.getFullYear();
				var tMonth = myDate.getMonth();
				var tDay = myDate.getDate() * 1 + n * 1;

				tMonth = this.doHandleZero(tMonth + 1);
				tDay = this.doHandleZero(tDay);

				return tYear + "-" + tMonth + "-" + tDay;
			},
			// 选中要求完成时间
			reqDate(d) {
				this.form.yh_requesttime = d.result
			},
			// 要求完成时间单选组
			radioGroupChange(d) {
				// console.log(this.getDateNow(d))
				this.rname = d
				this.form.yh_requesttime = this.getDateNow(d != "null" ? d : 0);
			},
			uploadFile() {
				// 视频上传
				this.$http.urlVideoUpload({
					sourceType: ['album', 'camera'],
					compressed: true, // "是否压缩所选的视频源文件，默认值为 true，需要压缩", 
					maxDuration: 6000000, // "拍摄视频最长拍摄时间，单位秒。最长支持 60 秒", //默认 60
					camera: 'back', ///前置还是后置摄像头', //'front'、'back'，默认'back'
					name: 'file', //"后台接受文件key名称", //默认 file
				}).then(res => {
					if (res.statusCode == '200') {
						let fileUploadUrl = JSON.parse(res.data).url
						// this.form.filepath.push(fileUploadUrl)
						this.video.push(fileUploadUrl)
					}
				});
			},
			// 图片上传成功
			uploadChange(res, index, lists, name) {
				if (res.statusCode == '200') {

				}
			},
			insFunc(d) {
				this.form.inspeople = d[0].value
				this.form.inspeopleTitle = d[0].label
			},
			dangertypeFunc(d) { // 隐患种类
				this.form.yh_kindt = d[0].label
				this.form.yh_kind = d[0].label
			},

			accFunc(d) {
				this.form.accompany = d[0].value
				this.form.accompanyTitle = d[0].label
			},
			inspectiondateFunc(d) {
				this.form.inspectiondate = d.result
			},
			onDeleteVideo(index) {
				// 删除文件
				this.video.splice(index, 1)
			},

			treeSelect() { // 责任部门
				// 选中的部门数据
				let sel = this.$refs.tree.getCheckedNodes()
				if (sel.length != 0) {
					if (this.pin_number && !this.zeren) {
						this.form.del_dept_id = sel[0].id;
						this.form.del_dept = sel[0].bumen_name;
						this.depart = false;
					} else {
						this.form.responsibledepartme = sel[0].id;
						this.pname = sel[0].id;
						// console.log(sel[0])
						this.form.bumen_name = sel[0].bumen_name;
						this.depart = false;
					}

				} else {
					this.$refs.uToast.show({
						title: '请选择部门',
						type: 'error',
					})
				}
			},
			load(node, resolve) {
				let function_perms = ''
				if (this.user.function_perms) {
					function_perms = this.user.function_perms.split(",")
				}
				let perms = {
					permsid: function_perms.join("','")
				}
				if (node.key) {
					perms = {}
				}
				let params = Object.assign({
					tabid: 'YH_liebiao178698a5-ccf0-439a-8cf1-f4d8dc8121d8',
					mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
					job: 'demo_node_1',
					tbname: 'YH',
					T: '部门管理sql',
					level: 'A',
					zr: 1,
					pid: node.key,
				}, perms)
				this.$http.get('/index/Hjob.ashx?type=sel', params).then(res => {
					let array = res.data.data;
					// console.log(res.data.data)
					if (array) {
						resolve(array)
					} else {
						resolve([])
					}
				})
			},
			formData(mes = false) {
				let imgs = [];

				this.$refs.uUpload.lists.filter(val => {
					imgs.push(val.response.url)
				})
				// 隐患编码
				this.form.yh_code = this.yh_code;
				this.form.filepath = [...this.video, ...imgs];
				// 历史记录信息
				let detailJson = this.form
				detailJson.operating_json = null;
				// 隐患流程
				this.form.operating_json = JSON.stringify(detailJson) // 隐患信息插入
				// 录入人
				this.form.yh_enroll = this.user.jobnumber
				this.form.yh_enroll_id = this.userid
				// 来源
				this.form.yh_origin = this.user.department_name + '~' + this.user.department_id
				this.form.level = this.user.level // 重点-有用
				// 罚款 -- 废弃，为零
				this.form.fine = 0

				//  带班领导
				if (this.form.leaderv) {
					this.form.leader = 'on';
					if (this.form.yh_route == '') {
						this.$refs.uToast.show({
							title: '您是带班领导，请选择行走路线',
							type: 'error',
						})
						return;
					}
				} else {
					this.form.leader = ''
				}

				if (mes) {
					if (this.rname == "null" ? true : false) {
						// 当班直接销号 -- 当天不销号
						this.form.yh_state = 8; //隐患状态 --当班整改 直接销号 8
					}
				}
				let objmerge = Object.assign(this.form, {
					mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
					tabid: 'YH_liebiao178698a5-ccf0-439a-8cf1-f4d8dc8121d8',
					job: 'demo_node_1',
					tbname: 'YH',
					T: 'circuit'
				})
				this.$http.post('/index/Hjob.ashx?type=ajaxaddup',
					objmerge).then(res => {
					if (res.data.code == '200') {
						this.$refs.uToast.show({
							title: '添加成功',
							type: 'success',
						})
						if (mes) {
							let content = this.form
							content.sendName = this.user.users_name
							this.message({
								deptId: objmerge.responsibledepartme,
								title: '隐患下达通知',
								content: JSON.stringify([content])
							})
						} else {
							this.successEmpty()
						}
					}
				})
			},
			message(option) {
				this.$http.post('/api/SendMessage',
					Qs.stringify(option)
				).then(() => {
					this.successEmpty()
				})
			},
			async genNewYhCode() {
				const res = await this.$http.post('/api/GenNewYinHuanCode', {
					date: this.form.inspectiondate
				})
				if (res.statusCode == 200) {
					this.yh_code = res.data.data;
				}
			},
			successEmpty() {
				// 成功后清空部分
				this.form.yh_content = '';
				this.form.id = this.$u.guid(null);
			},
			save() {
				this.$refs.uForm.validate(valid => {
					this.form.yh_state = 0
					if (valid) {
						this.genNewYhCode().then(() => {
							this.formData()
						}).catch(e => {
							this.$refs.uToast.show({
								title: '请求失败',
								type: 'error',
							})
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					this.form.yh_state = 1;
					if (valid) {
						this.genNewYhCode().then(() => {
							this.formData(true);
						}).catch(e => {
							this.$refs.uToast.show({
								title: '请求失败',
								type: 'error',
							})
						})
					} else {
						console.log('验证失败');
					}
				});
			}
		},

	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;

		.wrap {
			width: 100%;
			border-radius: 20rpx;
			padding: 20rpx;
			background-color: #FFF;
		}
	}

	.sbtn {
		margin: 0 10rpx;
	}

	.upload_info {
		width: 200rpx;
		background-color: #f4f5f6;
		height: 200rpx;
		border-radius: 10rpx;
		justify-content: center;
		align-items: center;
		position: relative;
		margin: 10rpx;

		.vbox {
			width: 100%;
			height: 100%;
			position: relative;

			.delete {
				position: absolute;
				right: 10rpx;
				border-radius: 50%;
				z-index: 999;
			}

			.video {
				width: 100%;
				height: 100%;
			}
		}

		.u-add-wrap {
			text-align: center;
		}

		.upload-img {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
	}

	.btnbox {
		text-align: right;
		justify-content: space-between;

		.btn {
			margin: 10rpx;
		}
	}

	.btngroup {
		background: #fff;
		bottom: 10rpx;
		left: 0;
		text-align: center;
		right: 0;
		margin: auto;

		button {
			margin: 10rpx;
		}
	}

	.p_content {
		padding: 24rpx;
		height: 100%;
		overflow: hidden;
	}
</style>
