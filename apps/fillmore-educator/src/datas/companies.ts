import minusBae from '@/assets/shipbuilding/minus-bae.svg';
import minusEastern from '@/assets/shipbuilding/minus-eastern.svg';
import minusIngalls from '@/assets/shipbuilding/minus-ingalls.svg';
import plusAustal from '@/assets/shipbuilding/plus-austal.svg';
import plusBollinger from '@/assets/shipbuilding/plus-bollinger.svg';
import plusTampa from '@/assets/shipbuilding/plus-tampa.svg';
import type { RegionValue } from '@/types/region.types';

interface CompanyPosition {
  top: string;
  left: string;
}

interface Company {
  name: string;
  icon: string;
  regions: Record<RegionValue, CompanyPosition>;
}

export const companies: Record<string, Company> = {
  bae: {
    name: 'BAE Systems',
    icon: minusBae,
    regions: {
      WestCoast: { top: '46.3%', left: '16.9%' },
      EastCoast: { top: '58%', left: '66.1%' },
      GulfCoast: { top: '54%', left: '65.2%' },
      MiddleWest: { top: '8.3%', left: '51%' },
    },
  },
  eastern: {
    name: 'Eastern Shipbuilding Group, Inc.',
    icon: minusEastern,
    regions: {
      WestCoast: { top: '37.5%', left: '11%' },
      EastCoast: { top: '60%', left: '66.5%' },
      GulfCoast: { top: '54.5%', left: '59.7%' },
      MiddleWest: { top: '23.5%', left: '57.4%' },
    },
  },
  ingalls: {
    name: 'Ingalls Shipbuilding',
    icon: minusIngalls,
    regions: {
      WestCoast: { top: '44.8%', left: '15.7%' },
      EastCoast: { top: '21%', left: '79.5%' },
      GulfCoast: { top: '53.7%', left: '55.7%' },
      MiddleWest: { top: '8.5%', left: '52.5%' },
    },
  },
  austal: {
    name: 'Austal Mobile USA',
    icon: plusAustal,
    regions: {
      WestCoast: { top: '34%', left: '10%' },
      EastCoast: { top: '39%', left: '72.3%' },
      GulfCoast: { top: '53%', left: '56.4%' },
      MiddleWest: { top: '18.8%', left: '56.6%' },
    },
  },
  bollinger: {
    name: 'Bollinger Amelia',
    icon: plusBollinger,
    regions: {
      WestCoast: { top: '9.7%', left: '8.2%' },
      EastCoast: { top: '41.5%', left: '71.8%' },
      GulfCoast: { top: '55.7%', left: '52.2%' },
      MiddleWest: { top: '14.6%', left: '56.4%' },
    },
  },
  tampa: {
    name: 'Tampa Ship LLC',
    icon: plusTampa,
    regions: {
      WestCoast: { top: '35%', left: '10.6%' },
      EastCoast: { top: '30.8%', left: '73.7%' },
      GulfCoast: { top: '60%', left: '63.8%' },
      MiddleWest: { top: '12.6%', left: '60.1%' },
    },
  },
};

export const shipbuildingCompanies = (selectedRegion: RegionValue) => {
  if (!selectedRegion) return [];

  return Object.values(companies).map((company) => ({
    icon: company.icon,
    name: company.name,
    top: company.regions[selectedRegion].top,
    left: company.regions[selectedRegion].left,
  }));
};
