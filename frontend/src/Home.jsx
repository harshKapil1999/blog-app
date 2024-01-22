import Intro from "./components/intro"
import RecentPosts from "./components/recent-posts"


export default function Home() {
  return (
    <div className="w-full h-screen">
      <Intro />
      <RecentPosts />
    </div>
  )
}
