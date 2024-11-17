import IAttributesGroup from "../attribute/IAttributesGroup";
import { v4 as uuid } from "uuid";
import IAction from "../../../contracts/IAction";

export interface CategoriesState {
  title: string;
  slug: string;
  groups: IAttributesGroup[];
}

export const initState: CategoriesState = {
  title: "",
  slug: "",
  groups: [
    {
      hash: uuid(),
      title: "مشخصات کلی",
      attributes: [],
    },
  ],
};

export const reducer = (
  state: CategoriesState,
  action: IAction
): CategoriesState => {
  let newState: CategoriesState;
  const { payload } = action;
  switch (action.type) {
    case "ADD_ATTRIBUTE_CATEGORY":
      newState = {
        ...state,
        groups: [
          ...state.groups,
          {
            hash: payload.hash,
            title: payload.title,
            attributes: [],
          },
        ],
      };
      break;
    case "ADD_ATTRIBUTE":
      newState = {
        ...state,
        groups: state.groups.map((group) => {
          if (group.hash === payload.groupID) {
            return {
              ...group,
              attributes: [...group.attributes, payload.attribute],
            };
          }
          return group;
        }),
      };
      break;
    case "UPDATE_ATTRIBUTE":
      newState = {
        ...state,
        groups: state.groups.map((group) => {
          const newAttribute = group.attributes.map((attr) => {
            if (attr.hash === payload.attributeID) {
              return { ...attr, ...payload.data };
            }
            return attr;
          });
          group.attributes = newAttribute;
          return group;
        }),
      };
      break;
    case "UPDATE_CATEGORY_TITLE":
      newState = { ...state, title: payload.title };
      break;
    case "UPDATE_CATEGORY_SLUG":
      newState = { ...state, slug: payload.slug };
      break;
    case "DELETE_ATTRIBUTE_GROUP":
      newState = {
        ...state,
        groups: state.groups.filter((group) => group.hash !== payload.hash),
      };
      break;
    default:
      throw new Error(`${action.type} not define in this state`);
  }
  return newState;
};
