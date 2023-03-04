import Script from "next/script"

function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Script src="https://js.hcaptcha.com/1/api.js" async defer />
            {children}
        </>
    )
}

export default ContactLayout