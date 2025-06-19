import Link from "next/link"
import { Building2, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8 text-emerald-400" />
              <span className="font-bold text-xl">Saudi Hotel Investment</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Empowering smart hotel investments in Saudi Arabia through AI and local expertise.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@saudihotel.investment</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+966 11 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Riyadh, Saudi Arabia</span>
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/investments" className="hover:text-white transition-colors">
                  Browse Hotels
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-white transition-colors">
                  ROI Calculator
                </Link>
              </li>
              <li>
                <Link href="/data-and-ai" className="hover:text-white transition-colors">
                  Data & AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Market */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Market</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/saudi-market" className="hover:text-white transition-colors">
                  Saudi Market
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition-colors">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-white transition-colors">
                  Legal
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 Saudi Hotel Investment. All rights reserved.</p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">Built by Nabil Alrokayh • Powered by Vision 2030</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
