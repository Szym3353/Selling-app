import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Stack,
  ImageList,
  ImageListItem,
} from "@mui/material";
import React from "react";
import ReactImageUploading, { ImageListType } from "react-images-uploading";

type props = {
  images: never[];
  setImages: React.Dispatch<React.SetStateAction<never[]>>;
};

const ImageUpload = ({ images, setImages }: props) => {
  return (
    <Card sx={{ my: 4 }}>
      <CardHeader title="Photos" />
      <CardContent>
        <ReactImageUploading
          multiple
          value={images}
          maxNumber={12}
          onChange={(imageList: ImageListType) =>
            setImages(imageList as never[])
          }
        >
          {({ imageList, onImageUpload, onImageRemoveAll, dragProps }) => (
            <div className="upload__image-wrapper">
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={onImageUpload}
                  {...dragProps}
                  size="small"
                >
                  Click or Drop here
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={onImageRemoveAll}
                >
                  Remove all photos
                </Button>
              </Stack>
              <ImageList cols={6}>
                {imageList.map((image, index) => (
                  <ImageListItem key={index}>
                    <img src={image.dataURL} alt="" width="100" />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          )}
        </ReactImageUploading>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;

{
  /* <div key={index} className="image-item">
<div className="image-item__btn-wrapper">
<button onClick={() => onImageUpdate(index)}>Update</button>
<button onClick={() => onImageRemove(index)}>Remove</button>
</div>
</div> */
}
