import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import ImageUploading, { ImageListType } from "react-images-uploading";
import UPLOAD_IMAGE from '../../assets/images/upload.png'
import { useState } from 'react';

function important<T>(value: T): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (value + " !important") as any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    uploadImageWrapper: {
      width: "100%",
      height: "200px",
      border: "1px dashed #aaa",
      borderRadius: "5px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      marginBottom: important(theme.spacing(2)),
      direction: 'rtl',
      fontFamily: 'vazirMatn',
    },
    customFontUpload: {
      fontSize: '1.2rem',
      color: '#333',
      fontWeight: 500,
    },
    previewImageWrapper: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '10px',
      flexWrap: 'wrap',
      '& img': {
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
      },
      '& img:hover': {
        transform: 'scale(1.05)',
      },
      '& .image-item__btn-wrapper': {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        '& button': {
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '5px 10px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        },
        '& button:hover': {
          backgroundColor: '#e0e0e0',
        },
      },
    },
    removeImg: {
      backgroundColor: '#ffcccc',
      border: '1px solid #ff9999',
      color: '#cc0000',
      borderRadius: '5px',
      padding: '5px 10px',
      cursor: 'pointer',
      transition: 'background-color 0.2s, color 0.2s',
      '&:hover': {
        backgroundColor: '#ff9999',
        color: '#990000',
      },
    },
    removeAllImages: {
      borderRadius: '7px',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      padding: important(theme.spacing(0.5, 2)),
      margin: important(theme.spacing(2, "auto")),
    }
  })
);

interface ImageUploaderProps {
  isMultiple: boolean
  handleChange: (files: ImageListType) => Promise<void>
  maxAcceptImage: number

}

const ImageUploader = ({ isMultiple, handleChange, maxAcceptImage }: ImageUploaderProps) => {
  const [images, setImages] = useState([])
  const styles = useStyles()
  const addImage = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    setImages(imageList as never[]);
    handleChange(imageList)
  }
  return (
    <ImageUploading
      multiple={isMultiple}
      value={images}
      onChange={addImage}
      maxNumber={maxAcceptImage}
      acceptType={["jpg", "png", "webm", "webp"]}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
        errors
      }) => (
        <div className="upload__image-wrapper">
          <div
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
            {...dragProps}
            className={styles.uploadImageWrapper}
          >
            <img src={UPLOAD_IMAGE} alt="upload" />
            <span>
              <span className={styles.customFontUpload}>اینجا کلیک کنید </span>
              یا تصویر موردنظر را بکشید و رها کنید</span>
            <span>فرمت هایی مجاز:(هر کدام ۲ مگابایت)JPG,PNG,WEBM,WEBP</span>
          </div>
          &nbsp;
          <button onClick={onImageRemoveAll} className={styles.removeAllImages}>پاک کردن همه تصاویر</button>
          <div className={styles.previewImageWrapper}>
            {imageList.map((image, index) => (
              <div key={index}>
                <img src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)} className={styles.removeImg}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div>
            {errors && <div>
              {errors.maxNumber && <span>Number of selected images exceed maxNumber</span>}
              {errors.acceptType && <span>Your selected file type is not allow</span>}
              {errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
              {errors.resolution && <span>Selected file is not match your desired resolution</span>}
            </div>}
          </div>
        </div>
      )}
    </ImageUploading>
  )
}

export default ImageUploader