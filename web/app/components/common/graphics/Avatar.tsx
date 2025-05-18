import {
  Avatar as MuiAvatar,
  useTheme,
  AvatarProps as MuiAvatarProps,
} from "@mui/material";
import { generateColor } from "~/util";

interface AvatarProps extends MuiAvatarProps {
  size?: string | object;
  fontSize?: string | object;
  src?: string;
  name?: string;
  bgColor?: string;
  avatarId?: number;
}

export const Avatar = ({
  size = "70px",
  fontSize,
  src,
  name,
  bgColor,
  avatarId,
}: AvatarProps) => {
  const theme = useTheme();
  const backgroundColor = bgColor ?? generateColor(avatarId ?? 0);

  const initials = name
    ?.split(" ")
    .map((x) => x[0])
    .slice(0, 2)
    .join("");

  return (
    <MuiAvatar
      src={src}
      sx={{
        width: size,
        height: size,
        bgcolor: backgroundColor ?? theme.palette.primary[100],
        color: theme.palette.primary[0],
        textTransform: "uppercase",
        fontSize,
      }}
    >
      {!src && initials}
    </MuiAvatar>
  );
};
