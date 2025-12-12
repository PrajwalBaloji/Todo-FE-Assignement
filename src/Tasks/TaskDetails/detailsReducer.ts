interface Details {
  title: string;
  description: string;
}

interface DetailsState {
  details: Details;
  titleError: string;
  descriptionError: string;
}

type DetailsAction =
  | { type: "setTitle"; payload: string }
  | { type: "setDescription"; payload: string }
  | { type: "setInitial"; payload: { title: string; description: string } }
  | { type: "reset" };

export const initialState: DetailsState = {
  details: {
    title: "",
    description: "",
  },
  titleError: "",
  descriptionError: "",
};

const detailsReducer = (state: DetailsState, action: DetailsAction) => {
  switch (action.type) {
    case "setTitle": {
      const charLength = action.payload.trim().length;
      if (charLength > 120) {
        return {
          ...state,
          details: { ...state.details, title: action.payload },
          titleError: "Title must be less than 120 characters",
        };
      }
      return {
        ...state,
        details: { ...state.details, title: action.payload },
        titleError: "",
      };
    }
    case "setDescription": {
      const charLength = action.payload.trim().length;
      if (charLength > 1000) {
        return {
          ...state,
          details: { ...state.details, description: action.payload },
          descriptionError: "Description must be less than 1000 characters",
        };
      }
      return {
        ...state,
        details: { ...state.details, description: action.payload },
        descriptionError: "",
      };
    }
    case "setInitial":
      return {
        ...state,
        details: {
          title: action.payload.title,
          description: action.payload.description,
        },
        titleError: "",
        descriptionError: "",
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

export default detailsReducer;
