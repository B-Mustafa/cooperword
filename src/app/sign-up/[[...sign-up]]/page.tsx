import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex justify-center items-center m-4">
        <SignUp />
    </div>
  )
}