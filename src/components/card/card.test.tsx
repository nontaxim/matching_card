import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import Card from './card'

const URL =
    'https://t3.ftcdn.net/jpg/03/37/46/98/360_F_337469861_iFRwd4Ia15Ihuwfa8fEDA9OKPhIVsgZR.jpg'

describe('Card', () => {
    describe('when card is closed', () => {
        test('renders card', () => {
            render(
                <Card
                    index={0}
                    isOpen={false}
                    url={URL}
                    name="someName"
                    value={1}
                />,
            )
            const card = screen.getByRole('img', { name: /someName/i })
            expect(card).toBeInTheDocument()
        })

        test('calls onClick when card is clicked', async () => {
            user.setup()
            const onClick = jest.fn()
            render(
                <Card
                    index={0}
                    isOpen={false}
                    url={URL}
                    name="someName"
                    value={1}
                    onClick={onClick}
                />,
            )
            const card = screen.getByRole('img', { name: /someName/i })
            await user.click(card)
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        test('does not call onClick when card is clicked without onClick prop', async () => {
            user.setup()
            const onClick = jest.fn()
            render(
                <Card
                    index={0}
                    isOpen={false}
                    url={URL}
                    name="someName"
                    value={1}
                />,
            )
            const card = screen.getByRole('img', { name: /someName/i })
            await user.click(card)
            expect(onClick).not.toHaveBeenCalled()
        })

        test('can find matching card', async () => {
            user.setup()
            let firstCard = -1
            let secondCard = -2
            const onClick = (
                e: React.MouseEvent<HTMLElement>,
                value: number,
            ) => {
                if (firstCard === -1) {
                    firstCard = value
                } else if (secondCard === -2) {
                    secondCard = value
                }

                if (firstCard === secondCard) {
                    unmount1()
                    unmount2()
                }
            }
            const { unmount: unmount1 } = render(
                <Card
                    index={0}
                    isOpen={false}
                    url={URL}
                    name="someName1"
                    value={1}
                    onClick={onClick}
                />,
            )
            const { unmount: unmount2 } = render(
                <Card
                    index={0}
                    isOpen={false}
                    url={URL}
                    name="someName2"
                    value={1}
                    onClick={onClick}
                />,
            )
            const card1 = screen.getByRole('img', { name: /someName1/i })
            const card2 = screen.getByRole('img', { name: /someName2/i })
            await user.click(card1)
            expect(card1).toBeInTheDocument()
            expect(card2).toBeInTheDocument()
            await user.click(card2)
            expect(card1).not.toBeInTheDocument()
            expect(card2).not.toBeInTheDocument()
        })
    })
})
