import { useState } from 'react';

import type { RegionValue } from '@/types/region.types';
import InteractiveMap from './InteractiveMap';
import MapNavigation from './MapNavigation';

import S from './styles';

const regionOptions = [
  { value: 'GulfCoast', label: 'Gulf Coast' },
  { value: 'EastCoast', label: 'East Coast' },
  { value: 'MiddleWest', label: 'Middle West' },
  { value: 'WestCoast', label: 'West Coast' },
];

function MapView() {
  const [selectedRegion, setSelectedRegion] = useState<RegionValue | null>(
    regionOptions[0].value as RegionValue | null
  );

  return (
    <S.MapViewContainer>
      <MapNavigation
        options={regionOptions}
        selectedRegion={selectedRegion}
        onRegionSelect={setSelectedRegion}
      />
      <InteractiveMap selectedRegion={selectedRegion} />
    </S.MapViewContainer>
  );
}

export default MapView;
