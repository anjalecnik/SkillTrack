import { Box, Menu, MenuItem, styled, Typography } from "@mui/material";
import { useMenu } from "~/util";
import { Flex } from "~/components/common";
import { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { DRAWER_WIDTH } from "~/constants";

const WorkspaceTitle = styled(Typography)`
  font-family: Plus Jakarta Sans;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  margin-left: 12px;
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
`;

export default function DrawerHeader() {
  const { menuState } = useMenu();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const workspaceMenuOpen = Boolean(anchorEl);

  return (
    <>
      <Flex
        alignItems="center"
        marginRight={menuState.isMenuOpened ? "20px" : 0}
      >
        {menuState.isMenuOpened && (
          <>
            <WorkspaceTitle>Skill Track</WorkspaceTitle>
            <Box marginLeft="5px">
              {workspaceMenuOpen ? <UpOutlined /> : <DownOutlined />}
            </Box>
          </>
        )}
      </Flex>
      <Menu
        anchorEl={anchorEl}
        open={workspaceMenuOpen}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            minWidth: DRAWER_WIDTH,
            left: "0 !important",
            border: "none",
            bgcolor: (theme) => theme.palette.grey[50],
          },
        }}
      >
        <MenuItem
          sx={{
            justifyContent: "center",
            padding: "10px",
            borderRight: "3px solid transparent", // border is set to prevent moving text to the left on hover (border takes additional width)

            ":hover, :focus": {
              color: (theme) => theme.palette.primary.main,
              bgcolor: (theme) => theme.palette.primary.lighter,
              borderRight: (theme) => `3px solid ${theme.palette.primary.main}`,
            },
          }}
        ></MenuItem>
      </Menu>
    </>
  );
}
