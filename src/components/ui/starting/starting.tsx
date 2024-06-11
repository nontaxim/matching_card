import { useState } from 'react'
import Button from '../../button/button'
import { twMerge } from 'tailwind-merge'

// interface StartingProps {
//     // Add any props you need for the Starting component
// }

const Starting = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    return (
        <div
            className={twMerge(
                `min-w-screen fixed inset-0 z-20 flex min-h-screen w-full items-center justify-center ${isPlaying ? 'backdrop-none' : 'backdrop-blur-md'} transition-all duration-500 ease-in-out`,
                isPlaying ? 'z-0 hidden' : '',
            )}
        >
            <div className="flex h-2/5 min-h-32 w-3/5 min-w-32 max-w-96 flex-col items-center justify-center gap-8 rounded-lg border-2 border-slate-700 bg-slate-800 shadow sm:h-2/5 sm:w-2/4 sm:p-6">
                <h1
                    className={`${isPlaying ? 'z-0 hidden' : ''} mb-4 text-center text-xl font-bold sm:text-4xl`}
                >
                    Matching Card
                </h1>
                <Button
                    children="Get Started"
                    className={`${isPlaying ? 'z-0 hidden' : 'rounded-full bg-slate-500 p-2 font-bold text-white hover:bg-slate-700 hover:text-slate-200 sm:px-4 sm:py-2'}`}
                    onClick={() => setIsPlaying(true)}
                />
            </div>
        </div>
    )
}

export default Starting
