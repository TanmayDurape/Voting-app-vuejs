import Vue from 'vue'
import Router from 'vue-router'
import PollList from '@/components/PollList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PollList',
      component: PollList
    }
  ]
})
