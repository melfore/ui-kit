import React from "react";
import renderer from "react-test-renderer";

import { ITabs } from "../../types/Tabs";
import { getTestable } from "../../utils/tests";

import Tabs, { DATA_CY_DEFAULT } from ".";

const defaultProps: ITabs = {
  tabs: [
    {
      component: <div>Tab 0</div>,
      label: "Tab0",
    },
    {
      component: <div>Tab 1</div>,
      label: "Tab1",
    },
  ],
};

const getTabsTestable = (props?: ITabs, dataCy = DATA_CY_DEFAULT) =>
  getTestable(Tabs, { dataCy, domNode: "div", props: { ...defaultProps, ...props } });

describe("Tabs test suite:", () => {
  it("default", () => {
    const { element, wrapper } = getTabsTestable();
    expect(wrapper).toHaveLength(1);
    expect("default-props-check").toBeTruthy();

    const snapshotWrapper = renderer.create(element).toJSON();
    expect(snapshotWrapper).toMatchSnapshot();
  });

  it("dataCy", () => {
    const { element, wrapper } = getTabsTestable({ ...defaultProps, dataCy: "custom" }, "custom");
    expect(wrapper).toHaveLength(1);

    const snapshotWrapper = renderer.create(element).toJSON();
    expect(snapshotWrapper).toMatchSnapshot();
  });

  it("tab change", () => {
    const { element, wrapper } = getTabsTestable();
    const tab1Button = wrapper.find(`button[data-cy='${DATA_CY_DEFAULT}-tab-Tab1']`);
    tab1Button.simulate("click");

    const snapshotWrapper = renderer.create(element).toJSON();
    expect(snapshotWrapper).toMatchSnapshot();
  });

  it("tab default", () => {
    const { element, wrapper } = getTabsTestable({ ...defaultProps, defaultTab: 1 });
    const tab1Button = wrapper.find(`button[data-cy='${DATA_CY_DEFAULT}-tab-Tab1']`);
    expect(tab1Button.hasClass("Mui-selected"));

    const snapshotWrapper = renderer.create(element).toJSON();
    expect(snapshotWrapper).toMatchSnapshot();
  });
});
