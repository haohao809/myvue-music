import {playMode} from 'common/js/config'
import {loadSearch} from 'common/js/catche'
const state = {
	singer: {},
	playing: false,
	fullScreen: false,
	playList:[],
	sequenceList:[],
	mode: playMode.sequence,
	currentIndex: -1,
	disc: {},
	query: '',
	searchHistory: loadSearch()
}
export default state