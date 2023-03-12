"use client"
import { useForm } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message';
import { ArrowUpRightIcon } from "@heroicons/react/24/solid"
import validator from "validator"
import { useSession } from "next-auth/react";
type Props = {}

interface FormValues {
    name: string
    email: string
    subject: string
    message: string
}

function ContactAuthorForm({ }: Props) {
    const {data : session} = useSession()
    const {
        register,
        formState: { errors }
    } = useForm<FormValues>({defaultValues : {
        name : session?.user?.name || "",
        email : session?.user?.email || ""
    }})
    // const onSubmit = handleSubmit(async (data) => {
    //     const res = await fetch("/api/contact", {
    //         method: "POST", body: JSON.stringify(data), headers: new Headers({
    //             'Content-Type': 'application/json',
    //             Accept: 'application/json',
    //         }),
    //     })
    //     const json = await res.json()
    //     if(json?.success === false) {
    //         alert(json?.message)
    //     }
    // })
    const handleEmailValidation = (email: string) => validator.isEmail(email)
    return (
        <div className="my-10 px-4 max-w-3xl mx-auto">
            <form className="flex flex-col space-y-4" method="POST" action="/api/contact">
                <div className="flex flex-col space-y-2 relative">
                    <label className="absolute z-10 border-white bg-white -top-1 border-x-4 left-3 focus:text-[#E7E247]" htmlFor="name">Name</label>
                    <input placeholder="Joe Smith" type="text" {...register("name", { required: { value: true, message: "You must specify your name" } })} className="border-2 border-gray-300 focus:border-[#E7E247]  p-2 rounded-md focus:outline-[#E7E247] hover:outline-[#E7E247] transition-colors duration-200 ease-in" />
                    <ErrorMessage
                        errors={errors}
                        name="name"
                        message="You must specify your name"
                        render={({ message }) => <p className="text-red-500 text-xs font-bold">{message}</p>}
                    />
                </div>
                <div className="flex flex-col space-y-2 relative">
                    <label className="absolute z-10 border-white bg-white -top-1 border-x-4 left-3 focus:text-[#E7E247]" htmlFor="name">Email</label>
                    <input placeholder="ex: joe@email.com" type="email"  {...register("email", {
                        validate: handleEmailValidation, required: { value: true, message: "You must specify a valid email" }
                    })} className="border-2 border-gray-300 focus:border-[#E7E247]  p-2 rounded-md focus:outline-[#E7E247] hover:outline-[#E7E247] transition-colors duration-200 ease-in" />
                    <ErrorMessage
                        errors={errors}
                        name="email"
                        message="You must specify a valid email"
                        render={({ message }) => <p className="text-red-500  text-xs font-bold">{message}</p>}
                    />
                </div>
                <div className="flex flex-col space-y-2 relative">
                    <label className="absolute z-10 border-white bg-white -top-1 border-x-4 left-3 focus:text-[#E7E247]" htmlFor="name">Subject</label>
                    <input {...register("subject", { required: { value: true, message: "Subject is required" } })} placeholder="Contribution to Inflow, Freelance work, suggestions..." type="text" className="border-2  border-gray-300 focus:border-[#E7E247]  p-2 rounded-md focus:outline-[#E7E247] hover:outline-[#E7E247] transition-colors duration-200 ease-in" />
                    <ErrorMessage
                        errors={errors}
                        name="subject"
                        message="You must specify a subject"
                        render={({ message }) => <p className="text-red-500 text-xs font-bold">{message}</p>}
                    />
                </div>
                <div className="flex flex-col space-y-2 relative">
                    <label className="absolute z-10 border-white bg-white -top-1 border-x-4 left-3 focus:text-[#E7E247]" htmlFor="name">Message</label>
                    <textarea {...register("message", { required: { value: true, message: "Message is required" } })} placeholder="Enter your message" rows={10} className="border-2 border-gray-300 focus:border-[#E7E247] p-2 rounded-md focus:outline-[#E7E247] hover:outline-[#E7E247] transition-colors duration-200 ease-in" />
                    <ErrorMessage
                        errors={errors}
                        name="message"
                        message="You must specify a message"
                        render={({ message }) => <p className="text-red-500 text-xs font-bold">{message}</p>}
                    />
                </div>
                <div
                    style={{ display: 'flex', flexDirection: 'row',gap : 10, alignItems : "center" }}
                    className="h-captcha"
                    data-sitekey={`${process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}`}
                >
                    <button type="submit" className="bg-[#E7E247] text-black w-min flex items-center  p-2 rounded-md hover:bg-[#E7E247] hover:text-white transition-colors duration-200 ease-in">
                        <span>Send</span> <ArrowUpRightIcon width={20} />
                    </button>
                </div>

            </form>
        </div>
    )
}

export default ContactAuthorForm