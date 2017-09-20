function getRodamDvalue(min,max){
	return Math.round(Math.random()*(max-min)+min);
}
export function shuffle(arr){
	let _arr = arr.slice();
	for(let i=0;i<_arr.length;i++){
		let j=getRodamDvalue(0,i);
		let t= _arr[i];
		_arr[i] = _arr[j];
		_arr[j] = t;
	}
	return _arr;
}
