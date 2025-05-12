import IAttributesGroup from "../attribute/IAttributesGroup";
import FilterValueEnum from "../attribute/FilterValueEnum"
import { v4 as uuid } from "uuid";
import IAction from "../../../contracts/IAction";
import ICategoryItem from "../../contracts/ICategoryItem";

export const initState: ICategoryItem = {
  id: "",
  name: {
    FA: "",
    EN: ""
  },
  slug: "",
  parentId: null,
  icon: "",
  isActive: true,
  filterGroups: [
    {
      hash: uuid(),
      name: "مشخصات کلی",
      slug: "General-Specifications",
      filters: []
    },
  ],
};

export const reducer = (
  state: ICategoryItem,
  action: IAction
): ICategoryItem => {
  let newState: ICategoryItem;
  const { payload } = action;
  switch (action.type) {
    case "ADD_ATTRIBUTE_CATEGORY":
      newState = {
        ...state,
        filterGroups: [
          ...state.filterGroups,
          {
            hash: payload.hash,
            name: payload.title,
            slug: payload.slug,
            filters: []
          },
        ],
      };
      break;
    case "ADD_ATTRIBUTE":
      newState = {
        ...state,
        filterGroups: state.filterGroups.map((group) => {
          if (group.hash === payload.groupID) {
            return {
              ...group,
              filters: [...group.filters, payload.filters]
            };
          }
          return group;
        }),
      };
      break;
    case "UPDATE_ATTRIBUTE":
      newState = {
        ...state,
        //filters: state.filters.map((group) => {
        // const newAttribute = group.values.map((attr) => {
        //   if (attr.hash === payload.attributeID) {
        //     return { ...attr, ...payload.data };
        //   }
        //   return attr;
        // });
        // group.values = newAttribute;
        //return group;
        //}),
      };
      break;
    case "UPDATE_ATTRIBUTE_VALUES":
      newState = {
        ...state,
        filterGroups: state.filterGroups.map((group) => ({
          ...group,
          filters: group.filters.map(filter => {
            if (filter.hash === action.payload.hash) {
              return {
                ...filter,
                values: filter?.values?.length > 0 ? [...filter.values, action.payload.value] : [action.payload.value]
              }
            }
            return filter
          })
        }))
      }
      break;
    case "UPDATE_ATTRIBUTE_NAME":
      newState = {
        ...state,
        filterGroups: state.filterGroups.map((group) => ({
          ...group,
          filters: group.filters.map(filter => {
            if (filter.hash === action.payload.hash) {
              return {
                ...filter,
                name: {
                  fa: action.payload.name,
                  en: ""
                }
              }
            }
            return filter
          })
        }))
      }
      break;
    case "UPDATE_ATTRIBUTE_SLUG":
      newState = {
        ...state,
        filterGroups: state.filterGroups.map((group) => ({
          ...group,
          filters: group.filters.map(filter => {
            if (filter.hash === action.payload.hash) {
              return {
                ...filter,
                slug: action.payload.slug
              }
            }
            return filter
          })
        }))
      }
      break;
    case "UPDATE_ATTRIBUTE_TYPE":
      newState = {
        ...state,
        filterGroups: state.filterGroups.map((group) => ({
          ...group,
          filters: group.filters.map(filter => {
            if (filter.hash === action.payload.hash) {
              return {
                ...filter,
                type: action.payload.type as FilterValueEnum
              }
            }
            return filter
          })
        }))
      }
      break;
    case "UPDATE_CATEGORY_NAME":
      newState = {
        ...state, name: {
          FA: payload.lang === "FA" ? payload.name : state.name.FA,
          EN: payload.lang === "EN" ? payload.name : state.name.EN
        }
      };
      break;
    case "UPDATE_CATEGORY_SLUG":
      newState = { ...state, slug: payload.slug };
      break;
    case "DELETE_ATTRIBUTE_GROUP":
      newState = {
        ...state,
        filterGroups: state.filterGroups.filter((group) => group.hash !== payload.hash),
      };
      break;
    case "UPDATE_CATEGORY_PARENT":
      newState = {
        ...state,
        parentId: action.payload.parentId
      }
      break;
    default:
      throw new Error(`${action.type} not define in this state`);
  }
  return newState;
};
