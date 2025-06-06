import { IconButton, Menu, MenuItem, Box, Typography } from "@mui/material";
import { useNavigate, useLocation } from "@remix-run/react";
import { useState } from "react";
import { FlagIcon } from "~/components/common";

const supportedLanguages = [
  { code: "en", label: "English", countryCode: "gb" },
  { code: "sl", label: "Slovenščina", countryCode: "si" },
];

export function LanguageSelect({
  currentLang,
  onChangeLang,
}: {
  currentLang: string;
  onChangeLang: (code: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const open = Boolean(anchorEl);
  const selectedLang =
    supportedLanguages.find((lang) => lang.code === currentLang) ||
    supportedLanguages[0];

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleChangeLang = (code: string) => {
    onChangeLang(code);
    handleClose();
    setTimeout(() => {
      navigate(location.pathname + location.search);
    }, 200);
  };

  return (
    <>
      <IconButton onClick={handleOpen} size="small">
        <FlagIcon countryCode={selectedLang.countryCode} width="24px" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {supportedLanguages.map((lang) => (
          <MenuItem
            key={lang.code}
            selected={lang.code === currentLang}
            onClick={() => handleChangeLang(lang.code)}
          >
            <Box display="flex" alignItems="center" gap="8px">
              <FlagIcon countryCode={lang.countryCode} width="20px" />
              <Typography>{lang.label}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
