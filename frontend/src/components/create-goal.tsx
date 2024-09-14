import { DialogContent, DialogTitle, DialogClose, DialogDescription } from "./ui/dialog";
import { RadioGroup, RadioGroupItem, RadioGroupIndicator } from "./ui/radio-group";
import { X, Save } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function CreateGoal() {
  return (
    <DialogContent>
        <div className='flex flex-col gap-6 h-full'>
          <div className='flex flex-col gap-3'>
            <div className="flex items-center justify-between">
              <DialogTitle>Create goal</DialogTitle>
              <DialogClose>
                <X className='size-5 text-zinc-600 hover:text-zinc-400 transition-colors duration-150' />
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
  )
}