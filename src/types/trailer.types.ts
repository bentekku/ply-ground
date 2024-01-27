export type trailer = {
  count: number;
  next: null | undefined;
  previous: null | undefined;
  results: [
    {
      id: number;
      name: string;
      preview: string;
      data: {
        "480": string;
        max: string;
      };
    }
  ];
};

export type trailerResult = {
  id: number;
  name: string;
  preview: string;
  data: {
    "480": string;
    max: string;
  };
};
