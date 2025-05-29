import type { IItem } from './models';

function sumByKey(items: IItem[], key: keyof IItem) {
  return items.reduce<Record<string, number>>((acc, item) => {
    const value = item[key] as unknown as string;
    if (!value) return acc;
    acc[value] = (acc[value] ?? 0) + item.available;
    return acc;
  }, {});
}

export function getLoadByLocation(items: IItem[]) {
  const loadMap = sumByKey(items, 'location');

  const chartData = Object.entries(loadMap).map(([location, load]) => ({
    location,
    load,
  }));

  const maxLoad = Math.max(...chartData.map(d => d.load));
  const maxLoadLocation = chartData.find(d => d.load === maxLoad)?.location;

  return { chartData, maxLoad, maxLoadLocation };
}

export function getLoadByCategory(items: IItem[]) {
  const loadMap = sumByKey(items, 'category');

  const chartData = Object.entries(loadMap).map(([category, load]) => ({
    category,
    load,
  }));

  const maxLoad = Math.max(...chartData.map(d => d.load));
  const maxLoadCategory = chartData.find(d => d.load === maxLoad)?.category;

  return { chartData, maxLoad, maxLoadCategory };
}
