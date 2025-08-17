"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Image from "next/image"

export default function GoogleSignin() {
  const [loading, setLoading] = useState(false)

  const handleGoogleSignin = async () => {
    setLoading(true)
    await signIn("google", { callbackUrl: "/dashboard" })
    setLoading(false)
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleSignin}
      disabled={loading}
      className="w-full"
    >
      {loading ? (
        <Loader2 className="mr-2 size-4 animate-spin" />
      ) : (
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          width={20}
          height={20}
          className="mr-2"
        />
      )}
      Sign in with Google
    </Button>
  )
}
