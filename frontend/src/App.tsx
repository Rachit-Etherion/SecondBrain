import './App.css'
import { Button } from './components/ui/Button'

function App() {

  return (
    <div className=''>
      <Button varients='primary' size='md' text='add content' startIcon={"+"} onClick={() => {}} />
      <Button varients='secondary' size='md' text='add content' startIcon={"+"} onClick={() => {}} />
    </div>
  )
}

export default App
