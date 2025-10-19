import './globals.css'

export const metadata = {
  title: 'Screenhound',
  description: 'Interactive dog photo display for bars',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
