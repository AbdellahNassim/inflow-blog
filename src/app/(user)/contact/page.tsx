import React from 'react'
import { Dancing_Script } from '@next/font/google'
import ContactAuthorForm from '@/components/ContactAuthorForm'

type Props = {}
const dancing_script = Dancing_Script({ subsets: ['latin'] })
function Contact({}: Props) {
  return (
    <main className='mt-10'>
        <h1 className={`text-7xl ${dancing_script.className} text-center`}>Contact Author</h1>
        <div className="font-semibold text-center my-4 max-w-2xl mx-auto text-gray-500">
          Hey dear reader, you can send me a message using the form below about any topic, whether it is freelance work, collaboration, consulting... I will get back to you as soon as possible.
        </div>
        <ContactAuthorForm/>
    </main>
  )
}

export default Contact