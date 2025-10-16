import { Dropdown } from '@fillmore/ui';
import Map from './Map';
import S from './styles';
import type { RegionValue } from '@/types/region.types';

interface MapNavigationProps {
  options: { value: string; label: string }[];
  selectedRegion: RegionValue | null;
  onRegionSelect: (region: RegionValue) => void;
}

function MapNavigation({
  options,
  selectedRegion,
  onRegionSelect,
}: MapNavigationProps) {
  return (
    <S.MapNavigationContainer>
      <Map onRegionSelect={onRegionSelect} />
      <Dropdown
        options={options}
        value={selectedRegion || ''}
        onChange={(value: string) => onRegionSelect(value as RegionValue)}
      />
    </S.MapNavigationContainer>
  );
}

export default MapNavigation;
