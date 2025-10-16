import S from './styles';

interface ProfileImageProps {
  src?: string | null;
  alt?: string;
  size?: number;
  borderColor?: string;
  userId?: string;
}

function ProfileImage({
  src,
  alt = 'Profile Image',
  size = 28,
  borderColor,
}: ProfileImageProps) {
  return (
    <S.ProfileImageWrapper size={size} borderColor={borderColor}>
      {src && <S.ProfileImage src={src} alt={alt} />}
    </S.ProfileImageWrapper>
  );
}

export default ProfileImage;
