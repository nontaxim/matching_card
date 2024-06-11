import { screen, render } from '@testing-library/react'
import { RestartButton, restart } from './restart'
import user from '@testing-library/user-event'

describe('Restart Functionality', () => {
    test('should reset data, matching, and click count', async () => {
        const mockSetData = jest.fn()
        const mockSetMatching = jest.fn()
        const mockSetClickCount = jest.fn()
        const mockSetIsEnding = jest.fn()
        restart({
            setData: mockSetData,
            setMatching: mockSetMatching,
            setClickCount: mockSetClickCount,
            setIsEnding: mockSetIsEnding,
        })
        await new Promise((resolve) => setTimeout(resolve, 750))
        expect(mockSetData).toHaveBeenCalledTimes(2)
        expect(mockSetMatching).toHaveBeenCalledTimes(1)
        expect(mockSetClickCount).toHaveBeenCalledTimes(1)
        expect(mockSetIsEnding).toHaveBeenCalledTimes(1)
        // expect(mockSetData).toHaveBeenCalledTimes(2)
        // expect(mockSetMatching).toHaveBeenCalledTimes(1)
        // expect(mockSetClickCount).toHaveBeenCalledTimes(1)
    })
})

describe('RestartButton Component', () => {
    test('should render restart button', () => {
        const mockSetData = jest.fn()
        const mockSetMatching = jest.fn()
        const mockSetClickCount = jest.fn()
        const mockSetIsEnding = jest.fn()
        render(
            <RestartButton
                ariaLabel="restart"
                setData={mockSetData}
                setMatching={mockSetMatching}
                setClickCount={mockSetClickCount}
                setIsEnding={mockSetIsEnding}
            />,
        )
        const button = screen.getByRole('button', { name: /restart/i })
        expect(button).toBeInTheDocument()
    })

    test('should render svg', () => {
        const mockSetData = jest.fn()
        const mockSetMatching = jest.fn()
        const mockSetClickCount = jest.fn()
        const mockSetIsEnding = jest.fn()
        render(
            <RestartButton
                ariaLabel="restart"
                setData={mockSetData}
                setMatching={mockSetMatching}
                setClickCount={mockSetClickCount}
                setIsEnding={mockSetIsEnding}
            />,
        )
        const svg = screen.getByTestId('svg')
        expect(svg).toBeInTheDocument()
    })

    test('should call restart function when clicked', async () => {
        user.setup()
        const mockSetData = jest.fn()
        const mockSetMatching = jest.fn()
        const mockSetClickCount = jest.fn()
        const mockSetIsEnding = jest.fn()
        render(
            <RestartButton
                ariaLabel="restart"
                setData={mockSetData}
                setMatching={mockSetMatching}
                setClickCount={mockSetClickCount}
                setIsEnding={mockSetIsEnding}
            />,
        )
        const button = screen.getByRole('button', { name: /restart/i })
        await user.click(button)
        await new Promise((resolve) => setTimeout(resolve, 750))
        expect(mockSetData).toHaveBeenCalledTimes(2)
        expect(mockSetMatching).toHaveBeenCalledTimes(1)
        expect(mockSetClickCount).toHaveBeenCalledTimes(1)
    })
})
