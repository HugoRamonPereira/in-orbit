import { DialogContent, DialogTitle, DialogClose, DialogDescription } from "./ui/dialog";
import { RadioGroup, RadioGroupItem, RadioGroupIndicator } from "./ui/radio-group";
import { X, Save, CircleAlert } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGoal } from "../http/create-goal";
import { useQueryClient } from "@tanstack/react-query";

const createGoalFormSchema = z.object({
  title: z.string().min(1, 'Inform the goal you wish to achieve'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7)
})

type CreateGoalFormSchema = z.infer<typeof createGoalFormSchema>

export function CreateGoal() {
  const queryClient = useQueryClient()
  const { register, control, handleSubmit, formState, reset } = useForm<CreateGoalFormSchema>({
    resolver: zodResolver(createGoalFormSchema)
  })

  async function handleCreateGoal(data: CreateGoalFormSchema) {
    await createGoal({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency
    })

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })

    reset()
  }

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
          <form
            onSubmit={handleSubmit(handleCreateGoal)}
            className='flex flex-col justify-between flex-1'
          >
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='title'>What is the activity?</Label>
                <Input
                  autoFocus
                  placeholder='Practice exercises, meditate, etc...'
                  id='title'
                  {...register('title')}
                />
                {formState.errors.title && (
                  <p className="text-red-500 text-[11px] flex items-center gap-1">
                    <CircleAlert className="size-3 text-red-500" />
                    {formState.errors.title.message}
                  </p>
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <Label>How many times a week?</Label>
                <Controller
                  control={control}
                  name="desiredWeeklyFrequency"
                  defaultValue={1}
                  render={({ field }) => {
                    return (
                      <RadioGroup onValueChange={field.onChange} value={String(field.value)}>
                        <RadioGroupItem value='1'>
                          <RadioGroupIndicator />
                          <span className='text-zinc-300 text-sm font-medium leading-none'>1x a week</span>
                          <span className='leading-none'>🥱</span>
                        </RadioGroupItem>
                        <RadioGroupItem value='2'>
                          <RadioGroupIndicator />
                          <span className='text-zinc-300 text-sm font-medium leading-none'>2x a week</span>
                          <span className='leading-none'>🙂</span>
                        </RadioGroupItem>
                        <RadioGroupItem value='3'>
                          <RadioGroupIndicator />
                          <span className='text-zinc-300 text-sm font-medium leading-none'>3x a week</span>
                          <span className='leading-none'>🤨</span>
                        </RadioGroupItem>
                        <RadioGroupItem value='4'>
                          <RadioGroupIndicator />
                          <span className='text-zinc-300 text-sm font-medium leading-none'>4x a week</span>
                          <span className='leading-none'>😝</span>
                        </RadioGroupItem>
                        <RadioGroupItem value='5'>
                          <RadioGroupIndicator />
                          <span className='text-zinc-300 text-sm font-medium leading-none'>5x a week</span>
                          <span className='leading-none'>😎</span>
                        </RadioGroupItem>
                        <RadioGroupItem value='6'>
                          <RadioGroupIndicator />
                          <span className='text-zinc-300 text-sm font-medium leading-none'>6x a week</span>
                          <span className='leading-none'>🤯</span>
                        </RadioGroupItem>
                        <RadioGroupItem value='7'>
                          <RadioGroupIndicator />
                          <span className='text-zinc-300 text-sm font-medium leading-none'>The whole week</span>
                          <span className='leading-none'>🔥</span>
                        </RadioGroupItem>
                      </RadioGroup>
                    )
                  }}
                />
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