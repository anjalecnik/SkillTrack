import { backdropClasses, Theme } from "@mui/material";
import Accordion from "./Accordion";
import AccordionDetails from "./AccordionDetails";
import AccordionSummary from "./AccordionSummary";
import Alert from "./Alert";
import AlertTitle from "./AlertTitle";
import AppBar from "./AppBar";
import Autocomplete from "./Autocomplete";
import Badge from "./Badge";
import Button from "./Button";
import ButtonBase from "./ButtonBase";
import ButtonGroup from "./ButtonGroup";
import CardContent from "./CardContent";
import Checkbox from "./Checkbox";
import Chip from "./Chip";
import Dialog from "./Dialog";
import DialogActions from "./DialogActions";
import DialogContentText from "./DialogContentText";
import DialogTitle from "./DialogTitle";
import Fab from "./Fab";
import IconButton from "./IconButton";
import InputBase from "./InputBase";
import InputLabel from "./InputLabel";
import LinearProgress from "./LinearProgress";
import Link from "./Link";
import ListItemButton from "./ListItemButton";
import ListItemIcon from "./ListItemIcon";
import LoadingButton from "./LoadingButton";
import OutlinedInput from "./OutlinedInput";
import Pagination from "./Pagination";
import PaginationItem from "./PaginationItem";
import Paper from "./Paper";
import Popover from "./Popover";
import Radio from "./Radio";
import Slider from "./Slider";
import Switch from "./Switch";
import Tab from "./Tab";
import TableBody from "./TableBody";
import TableCell from "./TableCell";
import TableFooter from "./TableFooter";
import TableHead from "./TableHead";
import TablePagination from "./TablePagination";
import TableRow from "./TableRow";
import Tabs from "./Tabs";
import ToggleButton from "./ToggleButton";
import Tooltip from "./Tooltip";
import TreeItem from "./TreeItem";
import Typography from "./Typography";

export default function ComponentsOverrides(theme: Theme) {
  return {
    ...Accordion(theme),
    ...AccordionDetails(theme),
    ...AccordionSummary(theme),
    ...Alert(theme),
    ...AlertTitle(),
    ...AppBar(theme),
    ...Autocomplete(),
    ...Badge(theme),
    ...Button(theme),
    ...ButtonBase(),
    ...ButtonGroup(),
    ...CardContent(),
    ...Checkbox(theme),
    ...Chip(theme),
    ...Dialog(),
    ...DialogActions(theme),
    ...DialogContentText(theme),
    ...DialogTitle(),
    ...Fab(theme),
    ...IconButton(theme),
    ...InputBase(),
    ...InputLabel(theme),
    ...LinearProgress(),
    ...Link(),
    ...ListItemButton(theme),
    ...ListItemIcon(theme),
    ...LoadingButton(theme),
    ...OutlinedInput(theme),
    ...Pagination(),
    ...PaginationItem(theme),
    ...Paper(theme),
    ...Popover(theme),
    ...Radio(theme),
    ...Slider(theme),
    ...Switch(theme),
    ...Tab(theme),
    ...TableBody(theme),
    ...TableCell(theme),
    ...TableFooter(theme),
    ...TableHead(theme),
    ...TablePagination(),
    ...TableRow(),
    ...Tabs(),
    ...ToggleButton(theme),
    ...Tooltip(theme),
    ...TreeItem(),
    ...Typography(),
    MuiModal: {
      styleOverrides: {
        root: {
          [`&:has(> div.${backdropClasses.root}[style*="opacity: 0"])`]: {
            pointerEvents: "none",
          },
        },
      },
    },
  };
}
