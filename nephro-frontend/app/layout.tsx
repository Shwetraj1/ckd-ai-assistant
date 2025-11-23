import "./globals.css"

export const metadata = {
  title: "NephroCare AI",
  description: "AI-powered CKD Management Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
