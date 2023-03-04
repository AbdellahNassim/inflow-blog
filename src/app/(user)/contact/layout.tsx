import Script from "next/script"

function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <head />
            <Script src="https://js.hcaptcha.com/1/api.js" async defer />
            <body>{children}</body>
        </html>
    )
}

export default ContactLayout