import React from "react";
import { Grid } from "@material-ui/core";

import { getAllComposedDataCy } from "../../utils";
import { getDocumentationPage } from "../../utils/stories";
import Typography from "../Typography";

import Tabs, { DATA_CY_DEFAULT, SUBPARTS_MAP } from ".";

export default {
  title: "Tabs",
  component: Tabs,
  parameters: {
    ...getDocumentationPage({
      basedOn: "@material-ui/core/Tabs",
      component: "Tabs",
      e2eTestInfo: {
        dataCyDefault: DATA_CY_DEFAULT,
        subpartsSuffixes: getAllComposedDataCy(SUBPARTS_MAP),
      },
    }),
  },
};

const tabs = [
  {
    component: (
      <div style={{ padding: "16px" }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography>Mosaic Library</Typography>
          </Grid>
        </Grid>
      </div>
    ),
    label: "Mosaic",
  },
  {
    component: (
      <div style={{ padding: "16px" }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography>Components List</Typography>
          </Grid>
        </Grid>
      </div>
    ),
    label: "Components",
  },
];

export const Canvas = () => <Tabs tabs={tabs} />;

export const Basic = () => <Tabs tabs={tabs} />;

export const DefaultTab = () => <Tabs defaultTab={1} tabs={tabs} />;
