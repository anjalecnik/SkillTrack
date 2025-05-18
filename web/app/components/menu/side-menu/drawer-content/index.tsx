import SimpleBar from "../SimpleBar";
import Navigation from "./navigation";
import BottomNav from "./navigation/BottomNav";

const DrawerContent = () => (
  <>
    <SimpleBar
      sx={{
        "& .simplebar-content": {
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Navigation />
      <BottomNav />
    </SimpleBar>
  </>
);

export default DrawerContent;
