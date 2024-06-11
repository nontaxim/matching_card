import './App.css'
import Playing from './components/ui/playing/playing'
import Starting from './components/ui/starting/starting'
import { cards } from './cards'
import shuffleArray from './utils/shuffle'

function App() {
    return (
        <div className="flex bg-slate-900 py-6 text-white selection:bg-slate-300 selection:text-slate-500 sm:py-0">
            <Starting />
            <Playing cards={shuffleArray(cards)} />
        </div>
    )
}

export default App
