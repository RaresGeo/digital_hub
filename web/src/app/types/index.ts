import type {
  HomepageAttributes,
  AboutAttributes,
  TallyAttributes,
} from "./landing-page";

interface BaseResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
  meta: Record<string, unknown>;
}

export type {
  BaseResponse,
  HomepageAttributes,
  AboutAttributes,
  TallyAttributes,
};
