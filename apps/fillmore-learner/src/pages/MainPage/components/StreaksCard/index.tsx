import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { HStack, VStack, Text } from '@fillmore/ui';
import S from './styles';

type Item = {
  label: string;
  current: number;
  total: number;
  accent?: string; // optional accent color for the bar glow
};

const items: Item[] = [
  { label: 'Daily login', current: 10, total: 10, accent: '#ff6b6b' },
  { label: 'Correct answers', current: 70, total: 200 },
  { label: 'Teamwork', current: 3, total: 6 },
];

function StreaksCard() {
  return (
    <VStack gap={8}>
      <HStack align="center" justify="space-between">
        <Text as="b" size={14} weight="bold" color="var(--white)">
          Streaks:
        </Text>
        <HStack gap={4} align="center">
          <FontAwesomeIcon icon={faHourglassHalf} color="var(--white)" />
          <Text as="span" size={12} color="var(--white)">
            19 hrs remaining
          </Text>
        </HStack>
      </HStack>

      <VStack gap={8}>
        {items.map((item, idx) => {
          const pct = (item.current / item.total) * 100;
          const giftColor = idx === 0 ? '#ff6b6b' : 'var(--white-10)';

          return (
            <HStack
              key={item.label}
              gap={12}
              fullWidth
              style={{
                padding: '8px 12px',
                background: 'rgba(0, 0, 0, 0.05)',
              }}
            >
              <VStack gap={4} fullWidth>
                <HStack justify="space-between" fullWidth>
                  <Text as="b" size={14} weight="bold" color="var(--white)">
                    {item.label}
                  </Text>
                  <Text as="b" size={14} weight="bold" color="var(--white)">
                    {item.current} / {item.total}
                  </Text>
                </HStack>
                <S.Bar>
                  <S.Fill pct={pct} accent={item.accent} />
                </S.Bar>
              </VStack>
              <FontAwesomeIcon
                icon={faGift}
                size="lg"
                color={giftColor}
                style={{
                  cursor: 'pointer',
                }}
              />
            </HStack>
          );
        })}
      </VStack>
    </VStack>
  );
}

export default StreaksCard;
