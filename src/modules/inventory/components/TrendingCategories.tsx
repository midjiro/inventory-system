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
import { selectInventory } from '@/modules/inventory';
import { getLoadByCategory } from '../analytics';
import type React from 'react';
import type { HTMLProps } from 'react';
import { cn } from '@/lib/utils';

const chartConfig = {
  load: {
    label: 'Category Popularity',
    color: 'hsl(var(--chart-1))',
  },
};

export const PopularCategoriesChart: React.FC<HTMLProps<HTMLDivElement>> = ({
  className,
}) => {
  const { isPending, items } = useAppSelector(selectInventory);

  const { chartData, maxLoad, maxLoadCategory } = getLoadByCategory(items);

  return (
    <Card className={cn('shadow-none', className)}>
      <CardHeader>
        <CardTitle>Most Popular Categories</CardTitle>
        <CardDescription>
          Current product quantities by category
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
                dataKey="category"
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
          Most popular category: {maxLoadCategory} ({maxLoad} units){' '}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total available products per category
        </div>
      </CardFooter>
    </Card>
  );
};
