import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { LoaderCircle, TrendingUp } from 'lucide-react';
import { useAppSelector } from '@/hooks/redux';
import { selectInventory } from '../selectors';
import { getLoadByLocation } from '../analytics';
import type { HTMLProps } from 'react';
import type React from 'react';
import { cn } from '@/lib/utils';

const chartConfig = {
  load: {
    label: 'Warehouse Load',
    color: 'hsl(var(--chart-1))',
  },
};

export const WarehouseLoadChart: React.FC<HTMLProps<HTMLDivElement>> = ({
  className,
}) => {
  const { isPending, items } = useAppSelector(selectInventory);

  const { chartData, maxLoad, maxLoadLocation } = getLoadByLocation(items);

  return (
    <Card className={cn('shadow-none', className)}>
      <CardHeader>
        <CardTitle>Warehouse Load by Location</CardTitle>
        <CardDescription>
          Current product quantities by location
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <LoaderCircle className="animate-spin mx-auto" />
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart
              width={600}
              height={300}
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="location"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={value =>
                  value.length > 10 ? value.slice(0, 10) + '...' : value
                }
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="load" fill="var(--color-desktop)" radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Highest load: {maxLoad} units at {maxLoadLocation}{' '}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total available products per location
        </div>
      </CardFooter>
    </Card>
  );
};
