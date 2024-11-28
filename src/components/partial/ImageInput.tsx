import { Box } from "@mui/material";
import React, { useRef, useState } from "react";
import PlaceHolder from "../../assets/images/imagePlaceHolder.jpg";

import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    imagePlaceHolder: {
      width: "220px",
      maxWidth: "250px",
      height: "100%",
    },
  })
);

interface ImageInputProps {
  onChange: (file: File) => void;
}

const ImageInput = ({ onChange }: ImageInputProps) => {
  const styles = useStyles();
  const filesRef = useRef<HTMLInputElement>(null);
  const [imagePreviewSrc, setImagePreviewSrc] = useState<string>(PlaceHolder);

  const handleChange = () => {
    if (filesRef.current) {
      const files = filesRef.current.files as FileList;
      showImagePreview(files[0] as File);
      onChange(files[0] as File);
    }
  };

  const showImagePreview = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (e.target) {
        setImagePreviewSrc(e.target.result as string);
      }
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <Box flexDirection={"column"}>
      <img src={imagePreviewSrc} className={styles.imagePlaceHolder} />
      <input
        type="file"
        ref={filesRef}
        onChange={handleChange}
        accept="image/gif, .jpg, image/png"
      />
    </Box>
  );
};

export default ImageInput;
