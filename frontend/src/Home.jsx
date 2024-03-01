import Intro from "./components/intro"
import RecentPosts from "./components/recent-posts"


export default function Home() {
  return (
    <div className="w-full min-h-screen p-2">
      <Intro />
      <RecentPosts />
    </div>
  )
}
