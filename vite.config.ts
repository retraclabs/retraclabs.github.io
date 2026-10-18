import { defineConfig, type Plugin } from 'vite'
import fs from 'fs'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// public/.well-known/security.txt has to carry an expiry date under a year out,
// and an expired one is invalid. Warn when it gets close, both when the dev
// server starts and in the deploy build (where it also shows as an annotation
// on the GitHub Actions run). MAINTAINING.md, "Security Contact".
const securityTxtExpiry = (): Plugin => ({
  name: 'security-txt-expiry',
  buildStart() {
    const file = path.resolve(__dirname, 'public/.well-known/security.txt')
    let message = ''
    try {
      const expires = fs.readFileSync(file, 'utf8').match(/^Expires:\s*(\S+)/m)?.[1] ?? ''
      const days = Math.floor((new Date(expires).getTime() - Date.now()) / 86_400_000)
      if (Number.isNaN(days)) message = 'security.txt has no valid Expires line.'
      else if (days < 0) message = `security.txt expired ${-days} days ago. Move its Expires line ahead.`
      else if (days < 45) message = `security.txt expires in ${days} days. Move its Expires line ahead.`
    } catch {
      message = 'public/.well-known/security.txt is missing.'
    }
    if (!message) return
    this.warn(message)
    if (process.env.GITHUB_ACTIONS) console.log(`::warning file=public/.well-known/security.txt::${message}`)
  },
})

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    securityTxtExpiry(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
