import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-primary/10 bg-white/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="font-bold text-xl logo-text">EduEvents</span>
            </div>
          </Link>
        </div>
        <MainNav />
        <div className="hidden md:flex items-center space-x-4">
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-primary">
            <Link href="/pages/login">Iniciar Sesion</Link>
          </Button>
          <Button asChild className="auth-button">
            <Link href="/pages/register">Registrarse</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
