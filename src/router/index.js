import Vue from 'vue'
import Router from 'vue-router'
import MonsterGame from '@/components/MonsterGame'
import Todo from '@/components/Todo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/monster-game',
      name: 'MonsterGame',
      component: MonsterGame
    },
    {
      path: '/todo',
      name: 'Todo',
      component: Todo
    }
  ]
})
