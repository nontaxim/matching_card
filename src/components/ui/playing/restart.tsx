import shuffleArray from '../../../utils/shuffle'
import Button from '../../button/button'

export const restart = ({
    setData,
    setMatching,
    setClickCount,
    setIsEnding,
}: {
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
    setIsEnding: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    setData((prev) => {
        return prev.map((card) => {
            return {
                ...card,
                isOpen: false,
                isClear: true,
            }
        })
    })
    setClickCount(0)
    setMatching([])
    setIsEnding(false)
    setTimeout(() => {
        setData((prev) => {
            return shuffleArray(
                prev.map((card) => {
                    return {
                        ...card,
                        isClear: false,
                    }
                }),
            )
        })
    }, 750)
}

export const RestartButton = ({
    setData,
    setMatching,
    setClickCount,
    setIsEnding,
    ariaLabel,
}: {
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
    ariaLabel: string
    setIsEnding: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <Button
            aria-label={ariaLabel}
            className="relative h-5 w-5 p-2 hover:opacity-60"
            children={
                <svg
                    data-testid="svg"
                    className="absolute inset-0"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="-30,50,300,150"
                >
                    <g
                        fill="#94a3b8"
                        fillRule="nonzero"
                        stroke="none"
                        strokeWidth="1"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeMiterlimit="10"
                        strokeDasharray=""
                        strokeDashoffset="0"
                        fontFamily="none"
                        fontWeight="none"
                        fontSize="none"
                        textAnchor="none"
                    >
                        <g transform="scale(5.12,5.12)">
                            <path d="M25,2c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175c10.51712,0 19,8.48288 19,19c0,10.51712 -8.48288,19 -19,19c-10.51712,0 -19,-8.48288 -19,-19c0,-5.4758 2.30802,-10.39189 6,-13.85547v3.85547c-0.0102,0.72127 0.36875,1.39216 0.99175,1.75578c0.623,0.36361 1.39351,0.36361 2.01651,0c0.623,-0.36361 1.00195,-1.0345 0.99175,-1.75578v-11h-11c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h4.52539c-4.61869,4.20948 -7.52539,10.27232 -7.52539,17c0,12.67888 10.32112,23 23,23c12.67888,0 23,-10.32112 23,-23c0,-12.67888 -10.32112,-23 -23,-23z"></path>
                        </g>
                    </g>
                </svg>
            }
            onClick={() =>
                restart({ setData, setMatching, setClickCount, setIsEnding })
            }
        />
    )
}
