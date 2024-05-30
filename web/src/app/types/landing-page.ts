export interface HomepageAttributes {
  header: string;
  subheader?: string;
  background_color?: string;
  background_image?: string;
  button_text: string;
  button_href: string;
  button_background?: string;
  text_color: string;
  button_text_color: string;
}

export interface AboutAttributes {
  text_color: string;
  background_color: string;
  text: string;
}

export interface TallyAttributes {
  orders_count: number;
  total_products_sold_count: number;
  reviews_count: number;
}
