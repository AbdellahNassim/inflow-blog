import React from 'react'
import { Dancing_Script } from '@next/font/google'
import ContactAuthorForm from '@/components/ContactAuthorForm'
import Link from 'next/link'

type PageProps = {
  params ?: any,
  searchParams?: {
    error: string
  }
}
const dancing_script = Dancing_Script({ subsets: ['latin'] })
function Contact(props: PageProps) {

  const { error } = props.searchParams!
  return (
    <main className='mt-10'>
      <h1 className={`text-7xl ${dancing_script.className} text-center`}>Contact Author</h1>

      {
        error ? <div className="flex flex-col justify-center gap-2 items-center font-semibold text-center my-4 max-w-2xl mx-auto text-gray-500">
          <p>There was an issue while sending your message please retry later</p>
          <Link className="px-4 py-2 bg-[#E7E247] text-black flex items-center  p-2 rounded-md hover:bg-[#E7E247] hover:text-white transition-colors duration-200 ease-in" href="/contact">Contact Author</Link>
        </div> : <>
          <div className="font-semibold text-center my-4 max-w-2xl mx-auto text-gray-500">
            Hey dear reader, you can send me a message using the form below about any topic, whether it is freelance work, collaboration, consulting... I will get back to you as soon as possible.
          </div>
          <ContactAuthorForm />
        </>
      }

    </main>
  )
}



export default Contact