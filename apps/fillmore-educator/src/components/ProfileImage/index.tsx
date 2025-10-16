import { useNavigate } from 'react-router-dom';
import S from './styles';

interface ProfileImageProps {
  src: string | null;
  alt?: string;
  size?: number;
  borderColor?: string;
  userId?: string;
  clickable?: boolean;
}

function ProfileImage({
  src,
  alt = 'Profile Image',
  size = 28,
  borderColor,
  userId,
  clickable = false,
}: ProfileImageProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (clickable && userId) {
      e.stopPropagation();
      navigate(`/user/${userId}`);
    }
  };

  return (
    <S.ProfileImageWrapper
      size={size}
      borderColor={borderColor}
      clickable={clickable}
      onClick={handleClick}
    >
      {src && <S.ProfileImage src={src} alt={alt} />}
    </S.ProfileImageWrapper>
  );
}

export default ProfileImage;
