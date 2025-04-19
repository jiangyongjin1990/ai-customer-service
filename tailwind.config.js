/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'peacock-blue': 'var(--peacock-blue)',
        'electric-purple': 'var(--electric-purple)',
        'cyber-green': 'var(--cyber-green)',
        'deep-blue': 'var(--deep-blue)',
        'neon-pink': 'var(--neon-pink)',
        'coral-orange': 'var(--coral-orange)',
      },
      boxShadow: {
        'tech-blue': 'var(--tech-shadow-blue)',
        'tech-purple': 'var(--tech-shadow-purple)',
        'tech-green': 'var(--tech-shadow-green)',
      },
      backgroundImage: {
        'gradient-1': 'var(--gradient-1)',
        'gradient-2': 'var(--gradient-2)',
        'gradient-3': 'var(--gradient-3)',
        'gradient-4': 'var(--gradient-4)',
        'gradient-5': 'var(--gradient-5)',
      },
    },
  },
  plugins: [],
}; 
 