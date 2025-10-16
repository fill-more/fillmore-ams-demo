import mapImg from '@/assets/usa-map.svg';
import S from './styles';

type RegionValue = 'WestCoast' | 'EastCoast' | 'GulfCoast' | 'MiddleWest';

interface MapProps {
  onRegionSelect: (region: RegionValue) => void;
}

const regionAreas = [
  { region: 'WestCoast' as const, top: 0, left: 0, width: 31, height: 100 },
  { region: 'MiddleWest' as const, top: 0, left: 70, width: 60, height: 44 },
  { region: 'EastCoast' as const, top: 0, left: 120, width: 44, height: 100 },
  { region: 'GulfCoast' as const, top: 61, left: 47, width: 103, height: 39 },
];

function Map({ onRegionSelect }: MapProps) {
  return (
    <S.MapContainer>
      {regionAreas.map(({ region, top, left, width, height }) => (
        <S.ClickableArea
          key={region}
          top={top}
          left={left}
          width={width}
          height={height}
          onClick={() => onRegionSelect(region)}
        />
      ))}

      <img src={mapImg} alt="USA Map" />
    </S.MapContainer>
  );
}

export default Map;
