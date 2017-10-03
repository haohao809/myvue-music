import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import Recommend from '@/components/recommend/recommend'
import Rank from '@/components/rank/rank'
import Singer from '@/components/singer/singer'
import Search from '@/components/search/search'
import User from '@/components/user/user'
import Disc from '@/components/disc/disc'
import SingerDetail from '@/components/singer-detail/singer-detail'
import TopList from '@/components/top-list/top-list'
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
