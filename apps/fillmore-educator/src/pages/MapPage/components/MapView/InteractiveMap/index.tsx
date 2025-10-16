import { useEffect, useRef } from 'react';

import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch';

import { shipbuildingCompanies } from '@/datas/companies';
import { regionCoordinates } from '@/datas/regions';
import type { RegionValue } from '@/types/region.types';
import ShipbuildingIcon from '../ShipbuildingIcon';

import mapImage from '@/assets/north-america-map.png';
import S from './styles';

interface InteractiveMapProps {
  selectedRegion: RegionValue | null;
}

function InteractiveMap({ selectedRegion }: InteractiveMapProps) {
  const transformRef = useRef<ReactZoomPanPinchRef>(null);

  useEffect(() => {
    if (selectedRegion && transformRef.current) {
      const elementId = `region-${selectedRegion}`;
      transformRef.current.zoomToElement(elementId, 2, 500);
    }
  }, [selectedRegion]);

  return (
    <TransformWrapper
      ref={transformRef}
      initialScale={2}
      minScale={1}
      maxScale={3}
      centerOnInit
      wheel={{ step: 0.5, smoothStep: 0.01 }}
      doubleClick={{ disabled: true }}
    >
      <TransformComponent
        wrapperStyle={{
          height: '100%',
        }}
      >
        <S.MapImage src={mapImage} alt="North America Map" draggable={false} />

        {regionCoordinates.map((region) => (
          <S.RegionTarget
            key={region.id}
            id={region.id}
            top={region.top}
            left={region.left}
          />
        ))}

        {selectedRegion &&
          shipbuildingCompanies(selectedRegion).map((shipbuilding, index) => (
            <ShipbuildingIcon
              key={`${selectedRegion}-${index}`}
              icon={shipbuilding.icon}
              name={shipbuilding.name}
              top={shipbuilding.top}
              left={shipbuilding.left}
            />
          ))}
      </TransformComponent>
    </TransformWrapper>
  );
}

export default InteractiveMap;
