import { screen, render, waitFor, cleanup } from '@testing-library/react'
import Ending from './ending'
import user from '@testing-library/user-event'

describe('Ending Component', () => {
    afterEach(cleanup)
    test('should render header', () => {
        const setData = jest.fn()
        const setMatching = jest.fn()
        const setClickCount = jest.fn()
        render(
            <Ending
                setIsEnding={jest.fn()}
                isEnding={true}
                clickCount={0}
                setData={setData}
                setMatching={setMatching}
                setClickCount={setClickCount}
            />,
        )
        const header = screen.getByText(/Congratulations!/i)
        expect(header).toBeInTheDocument()
    })

    test('should render restart button', () => {
        const setData = jest.fn()
        const setMatching = jest.fn()
        const setClickCount = jest.fn()
        render(
            <Ending
                setIsEnding={jest.fn()}
                isEnding={true}
                clickCount={0}
                setData={setData}
                setMatching={setMatching}
                setClickCount={setClickCount}
            />,
        )
        const button = screen.getByRole('button', { name: /restart-end/i })
        expect(button).toBeInTheDocument()
    })

    test('should disappear if click restart button', async () => {
        user.setup()
        const setData = jest.fn()
        const setMatching = jest.fn()
        const setClickCount = jest.fn()
        let isEnding = true
        const { rerender } = render(
            <Ending
                setIsEnding={() => {
                    isEnding = false
                    rerender(
                        <Ending
                            setIsEnding={() => {}}
                            isEnding={isEnding}
                            clickCount={0}
                            setData={setData}
                            setMatching={setMatching}
                            setClickCount={setClickCount}
                        />,
                    )
                }}
                isEnding={isEnding}
                clickCount={0}
                setData={setData}
                setMatching={setMatching}
                setClickCount={setClickCount}
            />,
        )
        const button = screen.getByRole('button', { name: 'restart-end' })
        const frame = screen.queryByTestId('ending')
        await waitFor(async () => {
            await user.click(button)
        })
        await waitFor(() => {
            expect(frame).toHaveClass('backdrop-none opacity-0')
        })
    })

    test('should call restart function when clicked', async () => {
        user.setup()
        const setData = jest.fn()
        const setMatching = jest.fn()
        const setClickCount = jest.fn()
        const setIsEnding = jest.fn()
        render(
            <Ending
                setIsEnding={setIsEnding}
                isEnding={true}
                clickCount={0}
                setData={setData}
                setMatching={setMatching}
                setClickCount={setClickCount}
            />,
        )
        const button = screen.getByRole('button', { name: 'restart-end' })
        await user.click(button)
        await new Promise((resolve) => setTimeout(resolve, 750))
        expect(setData).toHaveBeenCalledTimes(2)
        expect(setMatching).toHaveBeenCalledTimes(1)
        expect(setClickCount).toHaveBeenCalledTimes(1)
        expect(setIsEnding).toHaveBeenCalledTimes(1)
    })
})
