import { createRouter, createWebHistory } from 'vue-router'
import ViewAllGames from "../views/ViewAllGames.vue"
import ViewGame from "../views/ViewGame.vue"

const routes = [
  {
    path: '/',
    name: 'ViewAllGames',
    component: ViewAllGames
  },
  {
    path: '/viewgame/:game_id',
    name: 'viewgame',
    component: ViewGame
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
