import React from "react";
import { user } from "../types/user";
import { offert } from "../types/offert";

//Hooks
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";

//Components
import SingleOffert from "../components/OffertsDisplay/SingleOffertGrid";
import Settings from "@mui/icons-material/Settings";
import LoadingComponent from "../components/LoadingComponent";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";

type profileData = {
  userData: user;
  offerts: offert[];
};

const Profile = () => {
  let { id } = useParams();
  let { currentUser } = useAuth();
  let navigate = useNavigate();
  let [profileData, setProfileData] = React.useState<profileData>();
  let [page, setPage] = React.useState(0);
  let { fetchData, loading } = useFetch();

  React.useEffect(() => {
    fetchData("GET", `/profile/${id}/${page}`, (data) => {
      if (data) {
        setProfileData(data);
      }
    });
  }, [page]);

  return !loading && profileData ? (
    <>
      <Card>
        <CardHeader
          title={`${profileData.userData.username}`}
          subheader={`Joined ${profileData.userData.createdAt}`}
          action={
            currentUser!.id === id && (
              <IconButton
                color={"primary"}
                onClick={() => navigate("./settings")}
              >
                <Settings />
              </IconButton>
            )
          }
        />
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardHeader title={`User offerts (${profileData.offerts.length})`} />
        <CardContent>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {profileData.offerts.map((offert) => (
              <SingleOffert key={offert._id} offert={offert} />
            ))}
          </Grid>
        </CardContent>
      </Card>
    </>
  ) : (
    <LoadingComponent />
  );
};

export default Profile;
