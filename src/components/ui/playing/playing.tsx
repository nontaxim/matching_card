import Card from '../../card/card'
import { useState, useEffect } from 'react'
import { RestartButton } from './restart'
import Ending from '../ending/ending'

interface matching {
    value: number
    index: number
}

// get para cards instead of shuffle in setData
const Playing = ({
    cards,
}: {
    cards: {
        url: string
        name: string
        value: number
        isOpen: boolean
        isClear: boolean
    }[]
}) => {
    const [data, setData] = useState(cards)
    const [matching, setMatching] = useState<matching[]>([])
    const [isDelay, setIsDelay] = useState<boolean>(false)
    const [isClear, setIsClear] = useState<boolean>(false)
    const [isEnding, setIsEnding] = useState<boolean>(false)
    const [clickCount, setClickCount] = useState<number>(0)

    useEffect(() => {
        if (isDelay) {
            setTimeout(() => {
                const temp = data
                temp[matching[0].index].isOpen = false
                temp[matching[1].index].isOpen = false
                setData(temp)
                setMatching([])
                setIsDelay(false)
            }, 750)
        } else if (isClear) {
            setTimeout(() => {
                const temp = data
                temp[matching[0].index].isClear = true
                temp[matching[1].index].isClear = true
                setData(temp)
                setMatching([])
                setIsClear(false)
                if (data.every((card) => card.isClear)) {
                    setIsEnding(true)
                }
            }, 750)
        }
    }, [data, isClear, isDelay, matching])

    const openSelectedCard = (index: number, value: number) => {
        const temp = data
        temp[index].isOpen = true
        setData(temp)
        setMatching([...matching, { value: value, index: index }])
        setClickCount((prev) => prev + 1)
    }

    return (
        <>
            <Ending
                isEnding={isEnding}
                setIsEnding={setIsEnding}
                clickCount={clickCount}
                setData={setData}
                setMatching={setMatching}
                setClickCount={setClickCount}
            />
            <div className="p-auto m-auto flex min-h-screen flex-col items-center justify-center gap-4">
                <div className="flex w-full flex-col gap-2">
                    <h1 className="text-center text-4xl">Matching Card</h1>
                    <div className="flex flex-row-reverse justify-between">
                        <div
                            className="text-right text-slate-400"
                            title="click count"
                        >
                            Click count:{' '}
                            <span className="font-bold">{clickCount}</span>
                        </div>
                        <RestartButton
                            ariaLabel="restart"
                            setData={setData}
                            setMatching={setMatching}
                            setClickCount={setClickCount}
                            setIsEnding={setIsEnding}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 place-content-center items-center justify-center justify-items-center gap-4 sm:grid-cols-4 sm:gap-2">
                    {data.map((card, index) => (
                        <Card
                            key={index}
                            url={card.url}
                            name={card.name}
                            value={card.value}
                            index={index}
                            isClear={card.isClear}
                            isOpen={card.isOpen}
                            onClick={(e, value: number, index: number) => {
                                if (
                                    isDelay ||
                                    isClear ||
                                    matching[0]?.index === index
                                ) {
                                    // cannot click if card is fading out
                                    // cannot click on the same card
                                    return
                                }

                                openSelectedCard(index, value)
                                if (matching.length === 0) {
                                    // do nothing
                                } else if (matching[0].value === value) {
                                    // select matching card
                                    setIsClear(true)
                                } else {
                                    // select non-matching card
                                    setIsDelay(true)
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Playing
