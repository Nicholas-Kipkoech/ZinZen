export interface HintItem {
  id: string;
  hint: boolean;
}

export interface IHintRequestBody {
  method: string;
  installId: string | null;
  goal: {
    title: string;
    duration?: string | null;
  };
  parentTitle?: string;
}
