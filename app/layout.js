export const metadata = {
    title: 'React App',
    description: 'Web site created with Next.js.',
    icons: [
        { rel: 'icon1', url: '/logo192.png' },
        { rel: 'icon2', url: '/logo512.png' },
    ],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    }
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    )
}