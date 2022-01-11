export default function request(method,data,router){
	return new Promise((resolve,reject)=>{
		uni.request({
			method,
			url:`http://localhost:3344${router}`,
			data,
			success(res){
				resolve(res.data)
			},
			fail(err){
				reject(err)
			}
		})
	})
}
