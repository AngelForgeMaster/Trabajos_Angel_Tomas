"use client";
import { HomePage } from "./(panel)/page"
import { useUser } from "@clerk/nextjs";
import { Loading } from "@/components/shared/loading"
import { Login } from "./components"
export default function AppPage() {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return <Loading full />
  if (!isSignedIn) return <Login />
  return <HomePage />
}
