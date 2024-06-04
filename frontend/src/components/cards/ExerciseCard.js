import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

import "./css/ExerciseCard.css";

const ExerciseCard = ({ imageFile, name, description, link, recommended }) => {
  return (
    <Card className="card-container" sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={name}
        height="240"
        image={`/images/${imageFile}`}
      />
      <CardContent>
        <Box className="card-heading-container">
          <Typography
            className="card-heading"
            gutterBottom
            variant="h5"
            component="div"
          >
            {name}
          </Typography>
          {recommended && <Chip className="card-chip" label="Recommended" />}
        </Box>
        <Typography
          className="card-body"
          variant="body2"
          color="text.secondary"
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className="card-button"
          size="large"
          variant="contained"
          onClick={() => {
            window.location.href = link;
          }}
        >
          Click to Start
        </Button>
      </CardActions>
    </Card>
  );
};

export default ExerciseCard;
