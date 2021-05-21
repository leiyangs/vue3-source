// home的类型
export enum CATEGORY_TYPES { // 外卖类型
  All,
  BREAKFAST,
  LUNCH,
  AFTERNOON,
  DINNER,
}

export interface ISlider {
image: string
}

export interface IGoods {
  hasMore: boolean,
  loading: boolean,
  offset: number,
  limit: number,
  list: IGoodsList[]
}

export interface IGoodsList {
  name: string,
  image: string,
  category?: string 
}

export interface IHomeState {
  currentCategory: CATEGORY_TYPES,
  sliders: ISlider[],
  goods: IGoods
}
