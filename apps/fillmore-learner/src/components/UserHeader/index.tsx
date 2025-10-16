import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { HStack, Divider, Popover, Text } from '@fillmore/ui';

import { PATHNAME } from '@/lib/constants';
import ProfileImage from '@/components/ProfileImage';
import { useAuth } from '@/hooks/useAuth';
import { formatDisplayName } from '@/lib/utils/nameUtils';
import { calculatePercentage } from '@/lib/utils/percentageUtils';

import logoImg from '@/assets/logo-full/colored-white.svg';
import S from './styles';

interface UserHeaderProps {
  showDetails?: boolean;
}

function UserHeader({ showDetails }: UserHeaderProps) {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);

  const EXPERIENCE_MAX = 2000;
  const currentExperience = currentUser?.experiencePoints || 0;

  const experiencePercent = calculatePercentage(
    currentExperience,
    EXPERIENCE_MAX
  );
  const experienceLabel = `EXP: ${currentExperience.toLocaleString()} / ${EXPERIENCE_MAX.toLocaleString()}`;

  const handleLogoClick = () => {
    navigate(PATHNAME.MAIN);
  };

  return (
    <S.UserHeader>
      <S.LogoImage
        src={logoImg}
        alt="Company Logo"
        onClick={handleLogoClick}
        role="button"
        tabIndex={0}
      />
      <HStack align="center" gap={16}>
        {showDetails && currentUser && (
          <>
            <HStack gap={12}>
              <S.Achievement src="https://zyaottgyyvvxhklkbckq.supabase.co/storage/v1/object/public/achievements/06.png" />
              <S.RoleText>Level {currentUser?.level || 0}</S.RoleText>
              <S.ExperienceBarWrapper
                onMouseEnter={() => setIsExperienceOpen(true)}
                onMouseLeave={() => setIsExperienceOpen(false)}
              >
                <S.ExperienceBarFill
                  style={{ width: `${experiencePercent}%` }}
                />
                <Popover
                  isOpen={isExperienceOpen}
                  position="bottom"
                  backgroundColor="var(--black)"
                >
                  <Text as="b" size={10} weight="bold" color="var(--white)">
                    {experienceLabel}
                  </Text>
                </Popover>
              </S.ExperienceBarWrapper>
            </HStack>
            <Divider direction="vertical" length={20} color="var(--black-20)" />
          </>
        )}
        <HStack gap={4}>
          <S.RoleText>{currentUser?.rank}</S.RoleText>
          <S.NameText>
            {formatDisplayName(
              currentUser?.firstName || '',
              currentUser?.lastName || ''
            )}
          </S.NameText>
        </HStack>
        <ProfileImage
          src={currentUser?.profileImageUrl}
          userId={currentUser?.id || '1'}
        />
      </HStack>
    </S.UserHeader>
  );
}

export default UserHeader;
