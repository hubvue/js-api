import { lazy } from 'react'
const Home = lazy(() => import('./Home.jsx'))
const Route = [
  {
    path: '/',
    title: '主页',
    name: '主页',
    component: Home,
    exact
  },
  {}
]

Route.map(route => {
  return <Route {...route,}></Route>
})
