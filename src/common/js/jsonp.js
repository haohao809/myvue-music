import oriJsonp from 'jsonp'

export default function jsonp(url,data,option){
	url += (url.indexOf('?')==-1 ?'?':'&') + param(data)
	return new Promise((resolve,reject) => {
		oriJsonp(url,option,(err,data)=>{
			if(!err){
				resolve(data)
			}else{
				reject(err)
			}
		})
		
	})
}
export function param(data){
	let url = '';
	for(var i in data){
		let val = data[i]!=undefined?data[i]:'';
		url +='&'+i+'='+encodeURIComponent(val); 
	}
	return url?url.substring(1):''
}

