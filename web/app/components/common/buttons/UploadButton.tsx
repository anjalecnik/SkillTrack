import {
  Button,
  ButtonProps,
  IconButton,
  InputLabel,
  Typography,
  useTheme,
} from "@mui/material";
import { Flex, FlexColumn } from "~/components/common";
import { useState, useRef } from "react";
import { t } from "i18next";
import {
  CloseSquareOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

interface IUploadButtonProps extends ButtonProps {
  onFilesSelected?: (files: File[]) => void;
  label?: React.ReactNode;
  text: React.ReactNode;
  name: string | undefined;
  multiple?: boolean;
  required?: boolean;
}

export function UploadButton({
  onFilesSelected,
  label,
  text,
  name,
  multiple = false,
  required = false,
  ...rest
}: IUploadButtonProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFilesList = event.target.files;
    if (!selectedFilesList?.length) {
      return;
    }

    const fileList = Array.from(selectedFilesList);

    let updatedFiles;
    if (multiple) {
      const newFiles = fileList.filter(
        (file) =>
          !selectedFiles.some(
            (selectedFile) =>
              selectedFile.name === file.name && selectedFile.size === file.size
          )
      );
      updatedFiles = [...selectedFiles, ...newFiles];
    } else {
      updatedFiles = fileList.slice(0, 1);
    }

    setSelectedFiles(updatedFiles);
    onFilesSelected?.(updatedFiles);
  };

  const handleFileDelete = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    onFilesSelected?.(updatedFiles);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <FlexColumn gap="8px">
      {label && (
        <Flex gap="4px">
          {required && (
            <>
              <Typography
                sx={{
                  height: "0px",
                  color: theme.palette.customColors.red.main,
                }}
              >
                *
              </Typography>
            </>
          )}
          <InputLabel>{label}</InputLabel>
        </Flex>
      )}
      <Flex alignItems="center" gap="8px">
        <Button
          component="label"
          variant="outlined"
          sx={{ borderColor: "#D9D9D9" }}
          startIcon={<VerticalAlignTopOutlined />}
          {...rest}
        >
          {text}
          <input
            ref={inputRef}
            name={name}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple={multiple}
          />
        </Button>
        <FlexColumn gap="4px">
          {selectedFiles.length > 0 ? (
            selectedFiles.map((file, index) => (
              <Flex key={`${file.name}-${index}`} alignItems="center" gap="4px">
                <Typography>{file.name}</Typography>
                <IconButton
                  size="small"
                  onClick={() => handleFileDelete(index)}
                >
                  <CloseSquareOutlined />
                </IconButton>
              </Flex>
            ))
          ) : (
            <Typography color={theme.palette.secondary.main}>
              {t("userHub.noFileChosen")}
            </Typography>
          )}
        </FlexColumn>
      </Flex>
    </FlexColumn>
  );
}
