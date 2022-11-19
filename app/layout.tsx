import "styles/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head></head>
      <body>
        {/* <nav>Hello from navbar</nav> */}
        {children}
      </body>
    </html>
  )
}
