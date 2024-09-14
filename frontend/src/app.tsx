import logo from './assets/logo-in-orbit.svg'
import letsStart from './assets/lets-start-illustration.svg'
import { Plus, Save, X } from 'lucide-react'
import { Button } from './components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from './components/ui/radio-group';

export function App() {
	return (
    <Dialog>
      <div className="h-screen flex flex-col items-center justify-center gap-8">
        <img src={logo} alt="in.orbit" />
        <img src={letsStart} alt="in.orbit" />
        <p className='text-zinc-300 leading-relaxed max-w-80 text-center'>
          You still haven't created any goals, what about do it right now?
        </p>
        <DialogTrigger asChild>
          <Button>
            <Plus className='size-4' />
            Create goal
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <div className='flex flex-col gap-6 h-full'>
          <div className='flex flex-col gap-3'>
            <div className="flex items-center justify-between">
              <DialogTitle>Create goal</DialogTitle>
              <DialogClose>
                <X className='size-5 text-zinc-600' />
              </DialogClose>
            </div>
            <DialogDescription>
              Add activities that makes you feel good and that you want to keep practicing every week
            </DialogDescription>
          </div>
          <form className='flex flex-col justify-between flex-1'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='title'>What is the activity?</Label>
                <Input
                  autoFocus
                  placeholder='Practice exercises, meditate, etc...'
                  id='title'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label>How many times a week?</Label>
                <RadioGroup>
                  <RadioGroupItem value='1'>
                    <RadioGroupIndicator />
                    <span className='text-zinc-300 text-sm font-medium leading-none'>1x a week</span>
                    <span className='leading-none'>🥱</span>
                  </RadioGroupItem>
                  <RadioGroupItem value='2'>
                    <RadioGroupIndicator />
                    <span className='text-zinc-300 text-sm font-medium leading-none'>1x a week</span>
                    <span className='leading-none'>🥱</span>
                  </RadioGroupItem>
                  <RadioGroupItem value='3'>
                    <RadioGroupIndicator />
                    <span className='text-zinc-300 text-sm font-medium leading-none'>1x a week</span>
                    <span className='leading-none'>🥱</span>
                  </RadioGroupItem>
                </RadioGroup>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <DialogClose asChild>
                <Button variant='secondary' className='flex-1'>
                  Close
                  <X size={16} strokeWidth={2} />
                </Button>
              </DialogClose>
              <Button className='flex-1'>
                Save
                <Save size={16} strokeWidth={2} />
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
	);
}
