<template>
	<view class="content">
		<!-- 录入 -->
		<view class="wrap">
			<u-form :model="form" ref="uForm" :error-type="errorType">
				<u-form-item label-width='150rpx' prop="responsibledepartme" label="责任部门">
					<u-select v-model="depart" label-name='bumen_name' value-name='id' :list="departmentData"
						@confirm="departFunc"></u-select>
					<u-input v-model="form.responsibledepartmeT" type="select" @click='depart = true' />
				</u-form-item>
				<u-form-item label-width='150rpx' prop="address" label="检查地点">
					<u-input v-model="form.address" />
				</u-form-item>
				<u-form-item label-width='150rpx' prop="yh_address_all" label="详细地点">
					<u-input v-model="form.yh_address_all" type="text" />
				</u-form-item>
				<u-form-item label-width='150rpx' prop="inspeopleTitle" label="检查人">
					<u-select v-model="jcpeople" label-name='title' value-name='value' :list="inspeopleList"
						@confirm="insFunc"></u-select>
					<u-input v-model="form.inspeopleTitle" type="select" @click='jcpeople = true' />
				</u-form-item>
				<u-form-item label-width='150rpx' prop="accompanyTitle" label="陪检人">
					<u-select v-model="pjpeople" label-name='title' value-name='value' :list="inspeopleList"
						@confirm='accFunc'></u-select>
					<u-input v-model="form.accompanyTitle" type="select" @click='pjpeople = true' />
				</u-form-item>
				<u-form-item label-width='150rpx' prop="inspectiondate" label="检查日期">
					<u-calendar v-model="dateShow" mode="date" @change='inspectiondateFunc'></u-calendar>
					<u-input v-model="form.inspectiondate" type="select" @click='dateShow = true' />
				</u-form-item>
				<u-form-item label-width='150rpx' prop="oldofclass" label="班次">
					<u-radio-group v-model="form.oldofclass">
						<u-radio v-model="item.checked" v-for="(item, index) in oldOfClass" :key="index"
							:name="item.dict_name">
							{{ item.dict_name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label-width='150rpx' prop="leader" label="带班领导">
					<u-switch slot="right" v-model="form.leader"></u-switch>
				</u-form-item>
				<u-form-item label-width='150rpx' label="行走路线">
					<u-input v-model="form.yh_route" type="texgt" />
				</u-form-item>
				<u-form-item label-width='150rpx' prop="yh_content" label="隐患内容">
					<u-input v-model="form.yh_content" type="textarea" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="整改要求">
					<u-input v-model="form.yh_rectify" type="textarea" />
				</u-form-item>
				<u-form-item label-width='150rpx' prop="yh_level" label="隐患等级">
					<!-- <u-input v-model="form.yh_level" type="textarea" /> -->
					<u-radio-group v-model="form.yh_level">
						<u-radio v-for="(item, index) in radioList" :key="item.ids" :name="item.dict_name + '~' + item.dict_text + '~' + item.color"
							:disabled="item.isshow == 'True'?'':'disabled'">
							{{ item.dict_name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label-width='150rpx' prop="dangertypeShow" label="隐患种类">
					<u-select v-model="dangertypeShow" @confirm="dangertypeFunc" label-name='dict_name'
						value-name='dict_name' :list="dangertype">
					</u-select>
					<u-input v-model="form.yh_kindt" type="select" @click='dangertypeShow = true' />
				</u-form-item>
				<u-form-item label-width='150rpx' label="标准条款">
					<u-select v-model="termsShow" @confirm="termsFunc" label-name='file_name' value-name='ids'
						:list="terms"></u-select>
					<u-input v-model="form.yh_termst" type="select" @click='termsShow = true' />
				</u-form-item>
				<u-form-item label-width='150rpx' label="单位罚款">
					<u-input v-model="form.fine" type="text" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="个人罚款">
					<u-input v-model="form.personalfine" type="text" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="接收部门">
					<u-select v-model="rec" label-name='bumen_name' value-name='id' :list="departmentData"
						@confirm="recFunc"></u-select>
					<u-input v-model="form.yh_receivet" type="select" @click='rec = true' />
				</u-form-item>
				<u-form-item label-width='150rpx' label="抄送部门">
					<u-select v-model="copy" label-name='bumen_name' value-name='id' :list="departmentData"
						@confirm="copyFunc"></u-select>
					<u-input v-model="form.yh_copyt" type="select" @click='copy = true' />
				</u-form-item>
				<u-upload ref="uUpload" :action="action" :file-list="fileList" @on-change='uploadChange'></u-upload>
				<view class="input_box u-flex">
					<view class="upload_info u-flex" v-for="(v,i) in video" :key='i'>
						<view class="vbox">
							<video class="video" :src="'http://59.110.63.135:9010'+v" controls></video>
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
				<view class="btnbox u-flex u-flex-nowrap uicon-file-text-fill">
					<u-button class="btn" type="success" :ripple="true" size="medium" @click='submit'>提交并下达</u-button>
					<u-button class="btn" type="primary" :ripple="true" size="medium" @click="save">保存</u-button>
				</view>
			</u-form>
		</view>
		<u-toast ref="uToast" />
		<u-tabbar :list="tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	import base from '@/config/baseUrl.js'
	export default {
		data() {
			return {
				video: [],
				jcpeople: false, // 检查人
				pjpeople: false, // 陪检人
				termsShow: false, //条款
				departmentData: [],
				rec: false, // 接收
				copy: false,
				depart: false,
				dangertypeShow: false, // 隐患种类
				dateShow: false, // 日期
				params: { // 日期
					year: true,
					month: true,
					day: true,

				}, // 文字提示
				errorType: ['message', 'toast'],
				form: {
					responsibledepartme: '',
					filepath: [],
					operating_json: JSON.stringify({
						valie: '1',
						title: '2'
					}),
					operating_type: '隐患下达',
					yh_origin: '平煤神马集团~761c99d3-06ed-42df-81c6-79dbe41683ef',
					yh_circuit: '',
					id: this.$u.guid(null),
					yh_state: 0,
				},
				rules: { // 验证
					responsibledepartme: [{
						required: true,
						message: '请输入责任部门',
					}],
					address: [{
						required: true,
						message: '请输入检查地点',
					}],
					inspeopleTitle: [{ // 检查人
						required: true,
						message: '请输入检查人',
					}],
					yh_address_all: [{
						required: true,
						message: '请输入详细地点',
					}],
					accompanyTitle: [{
						required: true,
						message: '请选择陪检人',
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
				},
				inspeopleList: [],
				dangerData: [],
				radio: '',
				switchVal: false,
				terms: [], // 条款
				// 演示地址，请勿直接使用
				action: 'http://59.110.63.135:9010/root/HandlerUpload.ashx?type=3',
				fileList: [],
				unding: {
					0: 'ABCDE', //提交
					1: 'ABCDE', // 下达 --整改单位权限
					2: 'ABCDE', // 退回 - 整改
					3: 'ABCDE',
					4: 'AABCDE',
					5: 'ABCDE',
					6: 'ABCDE',
					7: 'ABCDE', // 整改页面 状态提交为7 复查销号页面使用
					8: 'ABCDE'
				},
				json: {
					Aa: { // 集团 -重大隐患
						0: 'A', //提交
						1: 'ABE', // 下达 --整改单位权限
						2: 'BE', // 退回 - 整改
						3: 'A',
						4: 'A',
						5: 'A',
						6: 'A',
						7: 'A', // 整改页面 状态提交为7 复查销号页面使用
						8: 'A', // 抽查
					},
					Ab: { // 集团 - 较大隐患
						0: 'A', //提交
						1: 'ABE', // 下达 --整改单位权限
						2: 'BE', // 退回 - 整改
						3: 'A',
						4: 'A',
						5: 'A',
						6: 'A',
						7: 'B', // 整改页面 状态提交为7 复查销号页面使用
						8: 'A'
					},
					Ac: { // 集团 - 一般隐患
						0: 'A', //提交
						1: 'ABE', // 下达 --整改单位权限
						2: 'BE', // 退回 - 整改
						3: 'A',
						4: 'A',
						5: 'A',
						6: 'A',
						7: 'B', // 整改页面 状态提交为7 复查销号页面使用
						8: 'A'
					},
					Ad: { // 集团 -严重不安全行为
						0: 'A', //提交
						1: 'ABDE', // 下达 --整改单位权限
						2: 'BE', // 退回 - 整改
						3: 'A',
						4: 'A',
						5: 'A',
						6: 'A',
						7: 'BD', // 整改页面 状态提交为7 复查销号页面使用
						8: 'A'
					},
					Ba: { // 矿-重大隐患
						0: 'B', //提交
						1: 'BE', // 下达 --整改单位权限
						2: 'E', // 退回 - 整改
						3: 'A',
						4: 'A',
						5: 'A',
						6: 'B',
						7: 'B', // 整改页面 状态提交为7 复查销号页面使用
						8: 'B'
					},
					Bb: { // 矿-较大隐患
						0: 'B', //提交
						1: 'BE', // 下达 --整改单位权限
						2: 'E', // 退回 - 整改
						3: 'A',
						4: 'A',
						5: 'A',
						6: 'B',
						7: 'B', // 整改页面 状态提交为7 复查销号页面使用
						8: 'B'
					},
					Bc: { // 矿-一般隐患
						0: 'B', //提交
						1: 'BE', // 下达 --整改单位权限
						2: 'E', // 退回 - 整改
						3: 'A',
						4: 'A',
						5: 'A',
						6: 'B',
						7: 'B', // 整改页面 状态提交为7 复查销号页面使用
						8: 'B'
					},
					Be: { // 矿- 不规范 整改流程
						0: 'B', //提交
						1: 'BE', // 下达 --整改单位权限
						2: 'BE', // 退回 - 整改
						3: 'A',
						4: 'A',
						5: 'A',
						6: 'A',
						7: 'E', // 整改页面 状态提交为7 复查销号页面使用
						8: 'B'
					},
					Db: { // 科、区-较大隐患整改流程
						0: 'D', //提交
						1: 'DE', // 下达 --整改单位权限
						2: 'E', // 退回 - 整改
						3: 'A',
						4: 'A',
						5: 'A',
						6: 'A',
						7: 'D', // 整改页面 状态提交为7 复查销号页面使用
						8: 'B'
					},
					Dc: { // 科、区-一般隐患整改流程
						0: 'D', //提交
						1: 'DE', // 下达 --整改单位权限
						2: 'E', // 退回 - 整改
						3: 'A',
						4: 'A',
						5: 'A',
						6: 'A',
						7: 'D', // 整改页面 状态提交为7 复查销号页面使用
						8: 'B'
					},
					Ec: { // 队-一般隐患整改流程
						0: 'E', //提交
						1: 'E', // 下达 --整改单位权限
						2: 'E', // 退回 - 整改
						3: 'A',
						4: 'A',
						5: 'A',
						6: 'A',
						7: 'E', // 整改页面 状态提交为7 复查销号页面使用
						8: 'B'
					},

				}
			}
		},
		computed: {
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
			dangertype() {
				return this.dangerData.filter(function(item) {
					if (item.type == "dangertype") {
						
						return item
					}
				})
			},

		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
			this.tabbar = this.$store.state.list

			this.danger()
		},
		methods: {
			uploadFile() {
				// 视频上传
				this.$http.urlVideoUpload({
					sourceType: ['album', 'camera'],
					compressed: true, // "是否压缩所选的视频源文件，默认值为 true，需要压缩", 
					maxDuration: 60, // "拍摄视频最长拍摄时间，单位秒。最长支持 60 秒", //默认 60
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
					// let fileUploadUrl = JSON.parse(res.data).url
					// this.imgs.push(fileUploadUrl)
				}
			},
			insFunc(d) {
				this.form.inspeople = d[0].value
				this.form.inspeopleTitle = d[0].label
			},
			departFunc(d) { // 责任部门
				this.form.responsibledepartme = d[0].value;
				this.form.responsibledepartmeT = d[0].label;
			},
			copyFunc(d) {
				this.form.yh_copy = d[0].value;
				this.form.yh_copyt = d[0].label;
			},
			recFunc(d) { // 接收部门
				this.form.yh_receive = d[0].value;
				this.form.yh_receivet = d[0].label;
			},
			dangertypeFunc(d) { // 隐患种类
				this.form.yh_kind = d[0].value;
				this.form.yh_kindt = d[0].label;
			},
			termsFunc(d) { // 执行条款
				this.form.yh_terms = JSON.stringify([{
					value: d[0].value,
					title: d[0].label
				}])
				this.form.yh_termst = d[0].label;
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
			danger() { // 班次 - 隐患等级
				this.$http.get('?type=sel', {
					tabid: 'YH_liebiao178698a5-ccf0-439a-8cf1-f4d8dc8121d8',
					mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
					job: 'demo_node_1',
					tbname: 'YH',
					T: '部门管理sql',
					level: 'A'
				}).then(res => {
					this.departmentData = res.data.data
				})
				// 隐患等级
				this.$http.get('?type=sel', {
					tabid: 'YH_liebiao08d2367f-618b-429c-bb8f-5c7634ad508b',
					mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
					job: 'demo_node_1',
					tbname: 'YH',
					T: 'add_yhsql',
					level: 'A'
				}).then(res => {

					this.dangerData = res.data.data
				})
				// 执行条款
				this.$http.get('?type=sel', {
					tabid: 'YH_liebiaoeb3ca14d-7202-496b-9e10-5892d0b3c035',
					mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
					job: 'demo_node_1',
					tbname: 'YH',
					T: '执行条款sql'
				}).then(result => {
					this.terms = result.data.data
				});
				// 检查人
				this.$http.get('?type=sel', {
					tabid: 'YH_liebiaodb6b3b20-139d-4200-84fd-66c3701ff6ee',
					mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
					job: 'demo_node_1',
					tbname: 'YH',
					T: 'addpagesql'
				}).then(result => {
					this.inspeopleList = result.data.data
				})
			},
			formData() {
				let imgs = [];
				this.$refs.uUpload.lists.filter(val => {
					imgs.push(val.response.url)
				})
				this.form.filepath = [...this.video, ...imgs];

				let lev = this.$store.state.user.level;

				let prop = lev + this.form.yh_level.split('~')[1];
				this.form.yh_circuit = JSON.stringify(this.json[prop]) || JSON.stringify(this.unding);

				this.$http.post(
					'?type=ajaxaddup&mid=9c6a100d-8543-438e-9311-ce6a38e75cae&tabid=YH_liebiao178698a5-ccf0-439a-8cf1-f4d8dc8121d8&job=demo_node_1&tbname=YH&T=circuit',
					this.form).then(res => {
					if (res.data.code == '200') {
						this.$refs.uToast.show({
							title: '添加成功',
							type: 'success',
							url: '/pages/danger/danger'
						})
						this.$u.route({
							type:'tab',
							url: '../danger/danger',
							params:{
								
							}
						})
					}
				})
			},
			save() {
				this.$refs.uForm.validate(valid => {
					this.form.yh_state = 0
					if (valid) {
						this.formData()
					} else {
						console.log('验证失败');
					}
				});
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					this.form.yh_state = 1;
					if (valid) {
						this.formData();
					} else {
						console.log('验证失败');
					}
				});
			}
		},

	}
</script>

<style lang="scss">
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
</style>
