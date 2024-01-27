export type game = {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: {};
  ratings_count: number;
  reviews_text_count: string;
  added: number;
  added_by_status: {};
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  esrb_rating: {
    id: number;
    slug: string;
    name: string;
  };
  platforms: [
    {
      platform: {
        id: number;
        slug: string;
        name: string;
      };
      released_at: string;
      requirements: {
        minimum: string;
        recommended: string;
      };
    }
  ];
  // new entries
  stores: [
    {
      id: number;
      url: string;
      store: {
        id: number;
        name: string;
        slug: string;
        domain: string;
        games_count: number;
        image_background: string;
      };
    }
  ];
  developers: [
    {
      id: number;
      name: string;
      slug: string;
      games_count: number;
      image_background: string;
    }
  ];
  genres: [
    {
      id: number;
      name: string;
      slug: string;
      games_count: number;
      image_background: string;
    }
  ];
  publishers: [
    {
      id: number;
      name: string;
      slug: string;
      games_count: number;
      image_background: string;
    }
  ];
  clip: undefined;
  description_raw: string;
};