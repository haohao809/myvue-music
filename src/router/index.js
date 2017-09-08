import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import Recommend from '@/components/recommend/recommend'
import Rank from '@/components/rank/rank'
import Singer from '@/components/singer/singer'
import Search from '@/components/search/search'
import User from '@/components/user/user'
import Disc from '@/components/disc/disc'
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
    	component: Singer    	
    },
     {
    	path: '/rank',
    	component: Rank    	
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
