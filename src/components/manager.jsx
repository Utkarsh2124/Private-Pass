import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';


const manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])


    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }


    }, [])



    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eye-closed.svg")) {
            ref.current.src = "icons/eyeopen.png";
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eye-closed.svg"
        }

    }

    const savePassword = () => {
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        console.log(passwordArray)
        setform({ site: "", username: "", password: "" })
        toast('Password Saved', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const deletePassword = (id) => {
        console.log("Deleting Password" + id)
        let c = confirm("Do you want to delete")
        if (c) {

            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Deleted Sucessfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const editPassword = (id) => {

        console.log("Editing Password" + id)
        setform(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))

    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
                transition="Zoom"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>


            <div className="  md:*:flex flex-col justify-center text-center container mx-auto  max-w-6xl p-10  ">
                <span className=' font-bold text-2xl font-sans gap-5'>PassMan</span>
                <div className='text-black flex flex-col items-center gap-8 m-10'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='  rounded-full border border-indigo-700 w-full p-4 py-1 ' type="text" name="site" id="" />

                    <div className="flex w-full gap-8 ">
                        <input value={form.username} onChange={handleChange} placeholder='Enter userName' className='  rounded-full border border-indigo-700 w-full p-4 py-1 ' type="text" name="username" id="" />

                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='  rounded-full border border-indigo-700 w-full p-4 py-1 ' type="password" name="password" id="" />
                            <span className=' absolute right-[1px] cursor-pointer' onClick={showPassword}><img ref={ref} className='p-2  mx-1' width={35} src="/icons/eyeopen.png" alt="eye" /></span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-indigo-400 hover:bg-indigo-300 rounded-full w-fit px-3 py-2 m-3 gap-2 '>
                        <lord-icon
                            src="https://cdn.lordicon.com/hqymfzvj.json"
                            trigger="hover">
                        </lord-icon>
                        Save</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show </div>}

                    {passwordArray.length != 0 && <table className='table-auto w-full rounded-md overflow-hidden'>
                        <thead className=' bg-purple-400 text-indigo-500 '>
                            <tr>
                                <th>Site</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-violet-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='  text-center py-2 border border-white '>
                                        <div className='flex items-center justify-center ' onClick={() => { copyText(item.site) }}>


                                            <a href={item.site} target='_blank' >{item.site}</a>
                                            <div className='m-2 size-5 cursor-pointer'>
                                                <img src="/icons/copy.png" alt="" />
                                            </div>
                                        </div>
                                    </td>

                                    <td className='text-center py-2 border border-white '>
                                        <div className='flex items-center justify-center ' onClick={() => { copyText(item.username) }}>
                                            <span> {item.username}</span>
                                            <div className='m-2 size-5 cursor-pointer'>
                                                <img src="/icons/copy.png" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='   text-center py-2 border border-white '>
                                        <div className='flex items-center justify-center ' onClick={() => { copyText(item.password) }}>
                                            <span> {item.password}</span>
                                            <div className='m-2 size-5 cursor-pointer'>
                                                <img src="/icons/copy.png" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='flex items-center justify-center py-2 border border-white  '>
                                        <span className='cursor-pointer' onClick={() => { editPassword(item.id) }}><img className='m-1 size-5' src="/icons/edit.svg" alt="" /></span>
                                        <span className='cursor-pointer' onClick={() => { deletePassword(item.id) }}><img className='m-2 size-5' src="/icons/delete.svg" alt="" /></span>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                    }


                </div>
            </div>
        </>
    )
}
export default manager
