import renderer from "react-test-renderer";

import { CheckboxSize, ICheckbox } from "../../types/Checkbox";
import { LocaleMock, MessageMock, mockedMessages } from "../../utils/mocks/IntlProviderMock";
import { getLocalizedTestable } from "../../utils/tests";

import Checkbox, { DATA_CY_DEFAULT } from ".";

const defaultProps: ICheckbox = {};

const getCheckboxTestable = (props?: ICheckbox, dataCy = DATA_CY_DEFAULT, domNode = "label") =>
  getLocalizedTestable(Checkbox, { dataCy, domNode, props: { ...defaultProps, ...props } });

describe("Checkbox test suite:", () => {
  it("default", () => {
    const { element, wrapper } = getCheckboxTestable();
    expect(wrapper).toHaveLength(1);
    const input = wrapper.find("input");
    expect(input.prop("checked")).toBeFalsy();
    expect(input.prop("data-indeterminate")).toBeFalsy();
    expect(input.prop("disabled")).toBeFalsy();
    expect(input.prop("required")).toBeFalsy();

    const snapshotWrapper = renderer.create(element).toJSON();
    expect(snapshotWrapper).toMatchSnapshot();
  });

  it("dataCy", () => {
    const { element, wrapper } = getCheckboxTestable({ dataCy: "custom" }, "custom");
    expect(wrapper).toHaveLength(1);

    const snapshotWrapper = renderer.create(element).toJSON();
    expect(snapshotWrapper).toMatchSnapshot();
  });

  it("localized", () => {
    const label = MessageMock.checkbox;
    const { element, wrapper } = getCheckboxTestable({ ...defaultProps, label, localized: true }, MessageMock.checkbox);
    const labelElement = wrapper.find("span.MuiFormControlLabel-label");
    expect(labelElement.text()).toEqual(mockedMessages[LocaleMock.en][label]);

    const snapshotWrapper = renderer.create(element).toJSON();
    expect(snapshotWrapper).toMatchSnapshot();
  });

  it("checked", () => {
    const { element, wrapper } = getCheckboxTestable({ value: true });
    const input = wrapper.find("input");
    expect(input.prop("checked")).toBeTruthy();

    const snapshotWrapper = renderer.create(element).toJSON();
    expect(snapshotWrapper).toMatchSnapshot();
  });

  it("disabled", () => {
    const { element, wrapper } = getCheckboxTestable({ disabled: true });
    const input = wrapper.find("input");
    expect(input.prop("disabled")).toBeTruthy();

    const snapshotWrapper = renderer.create(element).toJSON();
    expect(snapshotWrapper).toMatchSnapshot();
  });

  it("intermediate", () => {
    const { element, wrapper } = getCheckboxTestable({ intermediate: true });
    const input = wrapper.find("input");
    expect(input.prop("data-indeterminate")).toBeTruthy();

    const snapshotWrapper = renderer.create(element).toJSON();
    expect(snapshotWrapper).toMatchSnapshot();
  });

  it("label", () => {
    const label = "Checkbox";
    const { element, wrapper } = getCheckboxTestable({ ...defaultProps, label });
    const labelElement = wrapper.find("span.MuiFormControlLabel-label");
    expect(labelElement.text()).toEqual(label);

    const snapshotWrapper = renderer.create(element).toJSON();
    expect(snapshotWrapper).toMatchSnapshot();
  });

  it("label placement", () => {
    const label = "Checkbox";
    const { element, wrapper } = getCheckboxTestable({ ...defaultProps, label, labelPlacement: "end" });
    const labelElement = wrapper.find("span.MuiFormControlLabel-label");
    expect(labelElement.text()).toEqual(label);

    const snapshotWrapper = renderer.create(element).toJSON();
    expect(snapshotWrapper).toMatchSnapshot();
  });

  it("onChange", () => {
    const onChange = jest.fn();
    const { element, wrapper } = getCheckboxTestable({ onChange });
    const inputBefore = wrapper.find("input");
    inputBefore.simulate("change", { target: { checked: true } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);

    const snapshotWrapper = renderer.create(element).toJSON();
    expect(snapshotWrapper).toMatchSnapshot();
  });

  it("onChange - not handled", () => {
    const { element, wrapper } = getCheckboxTestable();
    const inputBefore = wrapper.find("input");
    inputBefore.simulate("change", { target: { checked: true } });

    const snapshotWrapper = renderer.create(element).toJSON();
    expect(snapshotWrapper).toMatchSnapshot();
  });

  it("required", () => {
    const { element, wrapper } = getCheckboxTestable({ required: true });
    const input = wrapper.find("input");
    expect(input.prop("required")).toBeTruthy();

    const snapshotWrapper = renderer.create(element).toJSON();
    expect(snapshotWrapper).toMatchSnapshot();
  });

  it("size", () => {
    const { element } = getCheckboxTestable({ size: CheckboxSize.small });

    const snapshotWrapper = renderer.create(element).toJSON();
    expect(snapshotWrapper).toMatchSnapshot();
  });
});
