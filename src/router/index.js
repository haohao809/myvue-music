import Vue from 'vue'
import Router from 'vue-router'


//import Recommend from '@/components/recommend/recommend'
//import Rank from '@/components/rank/rank'
//import Singer from '@/components/singer/singer'
//import Search from '@/components/search/search'
//import User from '@/components/user/user'
//import Disc from '@/components/disc/disc'
//import SingerDetail from '@/components/singer-detail/singer-detail'
//import TopList from '@/components/top-list/top-list'
//实现路由懒加载
const Recommend = () => import('components/recommend/recommend')
const Rank = () => import('components/rank/rank')
const Singer = () => import('components/singer/singer')
const Search = () => import('components/search/search')
const User = () => import('components/user/user')
const Disc = () => import ('components/disc/disc')
const SingerDetail = () => import('components/singer-detail/singer-detail')
const TopList =() => import('components/top-list/top-list')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
//    name: 'Hello',
//    component: Hello
			redirect: '/recommend'
    },
    {
    	path: '/recommend',
    	component: Recommend,
    	children: [
    		{
    			path: ':id',
    			component : Disc
    		}
    	]
    },
     {
    	path: '/singer',
    	component: Singer,
    	children:[
    		{
    			path: ':id',
    			component : SingerDetail
    		}
    	
    	]
    },
     {
    	path: '/rank',
    	component: Rank ,
    	children:[
    		{
    			path: ':id',
    			component : TopList
    		}
    	
    	]
    },
    {
    	path: '/search',
    	component: Search   	
    },
    {
    	path: '/user',
    	component: User   	
    }
  ]
})
