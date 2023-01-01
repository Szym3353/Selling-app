import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import React from "react";

const PhotoDisplay = ({ photos }: { photos: any[] }) => {
  let [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <>
      <ImageList sx={{ bgcolor: "#eee", p: 1 }} cols={6}>
        {photos.map((photo, index) => (
          <ImageListItem
            key={index}
            onClick={() => setSelectedIndex(index)}
            sx={{
              border: `1px solid`,
              borderColor: `${
                selectedIndex === index ? "black" : "transparent"
              }`,
            }}
          >
            <img src={photo.dataURL} />
          </ImageListItem>
        ))}
      </ImageList>
      <img style={{ width: "100%" }} src={photos[selectedIndex].dataURL} />
    </>
  );
};

export default PhotoDisplay;
