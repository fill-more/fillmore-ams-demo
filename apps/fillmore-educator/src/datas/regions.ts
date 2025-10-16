import type { RegionValue } from '@/types/region.types';

interface Region {
  id: string;
  top: string;
  left: string;
}

export const regions: Record<RegionValue, Region> = {
  WestCoast: {
    id: 'region-WestCoast',
    top: '28%',
    left: '10%',
  },
  EastCoast: {
    id: 'region-EastCoast',
    top: '42%',
    left: '70%',
  },
  GulfCoast: {
    id: 'region-GulfCoast',
    top: '60%',
    left: '60%',
  },
  MiddleWest: {
    id: 'region-MiddleWest',
    top: '10%',
    left: '50%',
  },
};

export const regionCoordinates = Object.values(regions).map((region) => ({
  id: region.id,
  top: region.top,
  left: region.left,
}));
