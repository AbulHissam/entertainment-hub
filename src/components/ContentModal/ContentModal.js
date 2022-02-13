import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { axiosInstance, api_key } from "../../requests/requests";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Carousel from "../Carousel/Carousel";
import "./ContentModal.css";

import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "80%",
  backgroundColor: "#39445a",
  borderRadius: 10,
  border: "1px solid #282c34",
  boxShadow: 3,
  p: 3,
};

const ContentModal = ({ children, media_type, id }) => {
  const [content, setContent] = useState();
  const [open, setOpen] = useState(false);
  const [videoKey, setVideoKey] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/${media_type}/${id}?api_key=${api_key}&language=en-US`
        );
        setContent(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchContent();
  }, []);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/${media_type}/${id}/videos?api_key=${api_key}&language=en-US`
        );
        setVideoKey(data.results[0]?.key);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVideo();
  }, []);

  return (
    <>
      <div
        className="media"
        onClick={handleOpen}
        style={{ cursor: "pointer" }}
        color="inherit"
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <Box sx={style}>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${videoKey}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
};

export default ContentModal;
