import { twMerge } from 'tailwind-merge'
import { RestartButton } from '../playing/restart'

interface EndingProps {
    isEnding: boolean
    setIsEnding: React.Dispatch<React.SetStateAction<boolean>>
    clickCount: number
    setData: React.Dispatch<
        React.SetStateAction<
            {
                url: string
                name: string
                value: number
                isOpen: boolean
                isClear: boolean
            }[]
        >
    >
    setMatching: React.Dispatch<
        React.SetStateAction<{ value: number; index: number }[]>
    >
    setClickCount: React.Dispatch<React.SetStateAction<number>>
}

const Ending = ({
    isEnding,
    setIsEnding,
    clickCount,
    setData,
    setMatching,
    setClickCount,
}: EndingProps) => {
    return (
        <div
            data-testid="ending"
            className={twMerge(
                `min-w-screen fixed inset-0 flex min-h-screen w-full flex-col items-center justify-center transition-all duration-500 ease-in-out`,
                isEnding
                    ? 'z-10 opacity-100 backdrop-blur'
                    : 'backdrop-none opacity-0',
            )}
        >
            <div className="flex h-2/5 min-h-32 w-3/5 min-w-32 max-w-96 flex-col items-center justify-center gap-8 rounded-lg border-2 border-slate-700 bg-slate-800 p-2 shadow sm:h-2/5 sm:w-2/4 sm:p-6">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="mb-4 text-center text-xl font-bold sm:text-4xl">
                        Congratulations!
                    </h1>
                    <p className="text-center text-slate-400">
                        You have finished the game.
                    </p>
                </div>
                <div>
                    <p className="text-xl text-slate-400">
                        use only <span className="font-bold">{clickCount}</span>{' '}
                        click
                    </p>
                </div>
                <div>
                    <RestartButton
                        ariaLabel="restart-end"
                        setData={setData}
                        setMatching={setMatching}
                        setClickCount={setClickCount}
                        setIsEnding={setIsEnding}
                    />
                </div>
            </div>
        </div>
    )
}

export default Ending
