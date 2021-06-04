<template>
	<view class="content">
		<!-- 录入 -->
		<view class="wrap">
			<u-form :model="form" ref="uForm" :error-type="errorType">
				<u-form-item label-width='150rpx' label="责任部门">
					<u-input v-model="form.responsibledepartme" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="检查地点">
					<u-input v-model="form.address" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="详细地点">
					<u-input v-model="form.yh_address_all" type="text" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="检查人">
					<u-select v-model="jcpeople" label-name='title' value-name='value' :list="inspeopleList"
						@confirm="insFunc"></u-select>
					<u-input v-model="form.inspeopleTitle" type="select" @click='jcpeople = true' />
				</u-form-item>
				<u-form-item label-width='150rpx' label="陪检人">
					<u-select v-model="pjpeople" label-name='title' value-name='value' :list="inspeopleList"
						@confirm='accFunc'></u-select>
					<u-input v-model="form.accompanyTitle" type="select" @click='pjpeople = true' />
				</u-form-item>
				<u-form-item label-width='150rpx' label="检查日期">
					<u-calendar v-model="dateShow" mode="date" @change='inspectiondateFunc'></u-calendar>
					<u-input v-model="form.inspectiondate" type="select" @click='dateShow = true' />
				</u-form-item>
				<u-form-item label-width='150rpx' label="班次">
					<u-radio-group>
						<u-radio v-model="item.checked" v-for="(item, index) in oldOfClass" :key="index"
							:name="item.dict_name">
							{{ item.dict_name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label-width='150rpx' label="带班领导">
					<u-switch slot="right" v-model="form.leader"></u-switch>
				</u-form-item>
				<u-form-item label-width='150rpx' label="行走路线">
					<u-input v-model="form.yh_route" type="texgt" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="隐患内容">
					<u-input v-model="form.yh_content" type="textarea" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="整改要求">
					<u-input v-model="form.yh_rectify" type="textarea" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="隐患等级">
					<!-- <u-input v-model="form.yh_level" type="textarea" /> -->
					<u-radio-group v-model="radio">
						<u-radio v-for="(item, index) in radioList" :key="item.ids" :name="item.dict_name"
							:disabled="item.isshow == 'True'?'':'disabled'">
							{{ item.dict_name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label-width='150rpx' label="隐患种类">
					<u-select v-model="dangertypeShow" label-name='dict_name' value-name='dict_name' :list="dangertype">
					</u-select>
					<u-input v-model="form.yh_level" type="select" @click='dangertypeShow = true' />
				</u-form-item>
				<u-form-item label-width='150rpx' label="标准条款">
					<u-select v-model="termsShow" label-name='file_name' value-name='ids' :list="terms"></u-select>
					<u-input v-model="form.yh_terms" type="select" @click='termsShow = true' />
				</u-form-item>
				<u-form-item label-width='150rpx' label="单位罚款">
					<u-input v-model="form.fine" type="text" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="个人罚款">
					<u-input v-model="form.personalfine" type="text" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="接收部门">
					<u-input v-model="form.yh_receive" type="text" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="抄送部门">
					<u-input v-model="form.yh_copy" type="text" />
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
				dangertypeShow: false, // 隐患种类
				dateShow: false, // 日期
				params: { // 日期
					year: true,
					month: true,
					day: true,

				}, // 文字提示
				errorType: ['message'],
				form: {
					responsibledepartme: '',
					filepath: [],
				},
				rules: { // 验证
					responsibledepartme: [{
						required: true,
						message: '请输入责任部门',
						trigger: 'change'
					}],
					address: [{
						min: 5,
						message: '简介不能少于5个字',
						trigger: 'change'
					}],
					inspeopleTitle: [{ // 检查人
						min: 5,
						message: '简介不能少于5个字',
						trigger: 'change'
					}],
					yh_address_all: [{
						min: 5,
						message: '简介不能少于5个字',
						trigger: 'change'
					}],
				},
				inspeopleList: [],

				dangerData: [],
				radio: '',
				switchVal: false,
				terms: [], // 条款
				// 演示地址，请勿直接使用
				action: 'http://59.110.63.135:9010/root/HandlerUpload.ashx?type=3',
				fileList: []
			}
		},
		computed: {
			radioList() {
				return this.dangerData.filter(function(item) {
					if (item.type == "yh_grade") {
						return item
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
			save() {
				let imgs = [];
				this.$refs.uUpload.lists.filter(val => {
					imgs.push(val.response.url)
				})
				this.form.filepath = [...this.video, ...imgs]

				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			},
			submit() {
				let imgs = [];
				this.$refs.uUpload.lists.filter(val => {
					imgs.push(val.response.url)
				})
				this.form.filepath = [...this.video, ...imgs]

				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
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
