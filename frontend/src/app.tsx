import logo from './assets/logo-in-orbit.svg'
import letsStart from './assets/lets-start-illustration.svg'
import { Plus } from 'lucide-react'
import { Button } from './components/ui/button';

export function App() {
	return (
		<div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="in.orbit" />
      <img src={letsStart} alt="in.orbit" />
      <p className='text-zinc-300 leading-relaxed max-w-80 text-center'>
        You still haven't created any goals, what about do it right now?
      </p>
      {/* <button
        type='button'
        className='px-4 py-2.5 rounded-lg bg-violet-500 text-violet-50 flex items-center gap-2 text-sm font-medium hover:bg-violet-600 transition-colors duration-200'
      >
        <Plus className='size-4' />
        Create goal
      </button> */}
      <Button>
        <Plus className='size-4' />
        Create goal
      </Button>
    </div>
	);
}
