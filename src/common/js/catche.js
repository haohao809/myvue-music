import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '_FAVORITE_'
const FAVORITE_LEN = 200


function insertArray(arr,val,compare,maxLen){
	const index = arr.findIndex(compare)
	if(index === 0){
		return
	}
	if(index > 0){
		arr.splice(index,1)
	}
	arr.unshift(val)
	if(maxLen && arr.length > maxLen){
		arr.pop()
	}
}
export function saveSearch(query){
	let searches = storage.get(SEARCH_KEY,[])
	insertArray(searches,query, (item) =>{
		return item === query
	},SEARCH_MAX_LEN)
	storage.set(SEARCH_KEY,searches)
	return searches
}

export function loadSearch(){
	return storage.get(SEARCH_KEY,[])
}
export function deleteSearch(query){
	let searches = storage.get(SEARCH_KEY,[])
	const index = searches.indexOf(query);
	searches.splice(index,1);
	storage.set(SEARCH_KEY,searches)
	return searches
}
export function clearSearch(){
	let searches = storage.get(SEARCH_KEY,[])
	searches = []
	storage.set(SEARCH_KEY,[])
	return searches	
}
export function savePlay(song){
	let songs = storage.get(PLAY_KEY,[])
	insertArray(songs,song,(item) =>{
		 return item === song
	},PLAY_MAX_LEN)
	storage.set(PLAY_KEY,songs)
	return songs
}
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song){
	let songs = storage.get(FAVORITE_KEY,[])
	insertArray(songs,song,(item) =>{
		 return item === song
	},FAVORITE_LEN)
	storage.set(FAVORITE_KEY,songs)
	return songs
}
export function deleteFavorite(song){
	let songs = storage.get(FAVORITE_KEY,[])
	const index = songs.indexOf(song);
	songs.splice(index,1);
	storage.set(FAVORITE_KEY,songs)
	return songs
}
export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}