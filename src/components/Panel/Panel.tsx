import React from "react";
import RTL from "../../theme/rtl";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Sidebar from "../partial/Sidebar";
import RenderRoutes from "../../router/routes";

const Panel: React.FC = (): JSX.Element => {
  return (
    <RTL>
      <div className="app">
        <Container maxWidth={"xl"}>
          <Grid container spacing={3}>
            <Grid size={{ md: 3 }}>
              <Sidebar />
            </Grid>
            <Grid size={{ md: 9 }}>
              <RenderRoutes />
            </Grid>
          </Grid>
        </Container>
      </div>
    </RTL>
  );
};

export default Panel;
