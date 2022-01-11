import OSS from 'ali-oss'
import request from './request.js'


	//获取临时凭证


export async function putObject(file){
	const sts = await request(...['get',,'/sts'])
		const client = new OSS({
			region:'oss-cn-beijing',//oss-cn-beijing
			accessKeyId: sts.data.AccessKeyId,
			accessKeySecret: sts.data.AccessKeySecret,
			stsToken:sts.data.SecurityToken,
			bucket: 'lzc-mylove',
			refreshSTSToken: async() => {
					
			        const refreshToken = await request(...['get',,'/sts'])
			        return {
			          accessKeyId: refreshToken.AccessKeyId,
			          accessKeySecret: refreshToken.AccessKeySecret,
			          stsToken: refreshToken.SecurityToken,
			        };
			},
			refreshSTSTokenInterval: 3600 
		})
	
	const time = (new Date()).valueOf()
	try{
		const result = await client.put(
			`${time}`,//这里是oss object的名称，我是以id命名的
			file,//这里传入file对象、Blob数据
		)
		return result.url;
	}catch(e){
		console.log(e)
	}
}