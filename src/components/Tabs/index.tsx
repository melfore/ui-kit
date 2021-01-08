import React, { FC, useState } from "react";
import { Grid as MUIGrid, Paper as MUIPaper, Tab as MUITab, Tabs as MUITabs } from "@material-ui/core";

import { ITabs } from "../../types/Tabs";
import { getComposedDataCy } from "../../utils";

export const DATA_CY_DEFAULT = "tabs";

export const SUBPARTS_MAP = {
  tab: {
    label: "Tab",
    value: (label = "{label}") => `tab-${label}`,
  },
  tabContent: {
    label: "Tab Content",
  },
};

// TODO#lb: handle style
const Tabs: FC<ITabs> = ({ dataCy = DATA_CY_DEFAULT, defaultTab = 0, tabs }) => {
  const [tab, setTab] = useState(defaultTab);

  return (
    <MUIGrid item xs={12}>
      <MUIPaper>
        <MUITabs
          data-cy={dataCy}
          indicatorColor="primary"
          onChange={(_, tab: number) => setTab(tab)}
          textColor="primary"
          value={tab}
        >
          {tabs.map(({ label }) => (
            <MUITab data-cy={getComposedDataCy(dataCy, SUBPARTS_MAP.tab, label)} key={label} label={label} />
          ))}
        </MUITabs>
        <MUIGrid data-cy={getComposedDataCy(dataCy, SUBPARTS_MAP.tabContent)} item xs={12}>
          {tabs[tab].component}
        </MUIGrid>
      </MUIPaper>
    </MUIGrid>
  );
};

export const TabsProps = Tabs;

export default Tabs;
