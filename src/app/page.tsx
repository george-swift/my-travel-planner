import { AuthProvider } from './provider'
import {
  BeenThere,
  BucketList,
  Hero,
  Home,
  Navigation,
  PlacePicker
} from './dashboard'

export default async function Page() {
  return (
    <AuthProvider>
      <Home>
        <div className="bg-gray-900">
          <Navigation />
          <Hero />
        </div>

        <PlacePicker />

        {/* @ts-expect-error Async Server Component */}
        <BucketList />

        {/* @ts-expect-error Async Server Component */}
        <BeenThere />
      </Home>
    </AuthProvider>
  )
}
