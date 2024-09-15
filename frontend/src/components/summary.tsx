import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { OutlineButton } from "./ui/outline-button";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../http/getSummary";
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat)

export function Summary() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
  })

  if (!data) {
    return null
  }

  const firstDayOfTheWeek = dayjs().startOf('week').format('MMMM, Do')
  const lastDayOfTheWeek = dayjs().endOf('week').format('MMMM, Do')

  const percentageOfCompletion = Math.round(data.completed * 100 / data.total)

  return (
    <div className="py-10 max-w-[520px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex item-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold">
            {firstDayOfTheWeek} - {lastDayOfTheWeek}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className='size-4' />
            Create goal
          </Button>
        </DialogTrigger>
      </div>
      <div className="flex flex-col gap-3">
        <Progress max={15} value={2}>
          <ProgressIndicator style={{ width: `${percentageOfCompletion}%` }} />
        </Progress>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            You have completed
            <span className="text-zinc-50 font-bold">&nbsp;{data?.completed}&nbsp;</span>
            out of
            <span className="text-zinc-50 font-bold">&nbsp;{data?.total}&nbsp;</span>
            goals this week
          </span>
          <span>{percentageOfCompletion}%</span>
        </div>
      </div>
      <Separator />
      <div className="flex flex-wrap gap-3">
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          Meditar
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          Nadar
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          Tocar Violão
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          Tocar Bateria
        </OutlineButton>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Your week</h2>
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">Sunday <span className="text-zinc-400 text-xs">(August 10th)</span></h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">You have completed "<span className="text-zinc-50 font-bold">Wake up early</span>" at <span className="text-zinc-50 font-bold">08:10</span></span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">You have completed "<span className="text-zinc-50 font-bold">Wake up early</span>" at <span className="text-zinc-50 font-bold">08:10</span></span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">You have completed "<span className="text-zinc-50 font-semibold">Wake up early</span>" at <span className="text-zinc-50 font-semibold">08:10</span></span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">Monday <span className="text-zinc-400 text-xs">(August 11th)</span></h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">You have completed "<span className="text-zinc-50 font-bold">Wake up early</span>" at <span className="text-zinc-50 font-bold">08:10</span></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}