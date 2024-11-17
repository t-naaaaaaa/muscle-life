import {
  CalendarMessage,
  Background,
  MotivationalImage,
} from "../types/calendar";

export const messages: CalendarMessage[] = [
  { id: 1, text: "今日も限界を超えろ", imageId: 1 },
  { id: 2, text: "できないなんて言うな、やるんだ", imageId: 2 },
  { id: 3, text: "弱音を吐くな、前を向け", imageId: 3 },
  { id: 4, text: "諦めたら、そこで試合終了だ", imageId: 4 },
  { id: 5, text: "お前の限界はまだまだ先にある", imageId: 5 },
  { id: 6, text: "痛みは一時的、諦めは永遠だ", imageId: 6 },
  { id: 7, text: "プレッシャーを力に変えろ", imageId: 7 },
  { id: 8, text: "どんな壁も突き破れ", imageId: 1 },
  { id: 9, text: "100%の力で生きろ", imageId: 2 },
  { id: 10, text: "今日が最高の自分を更新する日だ", imageId: 3 },
  { id: 11, text: "汗を流せ、未来を変えろ", imageId: 4 },
  { id: 12, text: "弱さを力に変えろ", imageId: 5 },
  { id: 13, text: "立ち止まるな、前に進め", imageId: 6 },
  { id: 14, text: "結果にコミットしろ", imageId: 7 },
  { id: 15, text: "甘えは捨てろ、本気出せ", imageId: 1 },
  { id: 16, text: "今日の努力は明日の自分を作る", imageId: 2 },
  { id: 17, text: "限界を超えたその先へ", imageId: 3 },
  { id: 18, text: "逃げ道を断て", imageId: 4 },
  { id: 19, text: "熱く生きろ", imageId: 5 },
  { id: 20, text: "不可能を可能にしろ", imageId: 6 },
  { id: 21, text: "全力で生きろ", imageId: 7 },
  { id: 22, text: "目標を突き抜けろ", imageId: 1 },
  { id: 23, text: "今を超えろ", imageId: 2 },
  { id: 24, text: "最強の自分を見せろ", imageId: 3 },
  { id: 25, text: "一歩先へ進め", imageId: 4 },
  { id: 26, text: "本気の壁を超えろ", imageId: 5 },
  { id: 27, text: "魂を燃やせ", imageId: 6 },
  { id: 28, text: "夢を現実にしろ", imageId: 7 },
  { id: 29, text: "情熱を示せ", imageId: 1 },
  { id: 30, text: "最後まで諦めるな", imageId: 2 },
  { id: 31, text: "明日はもっと強くなれ", imageId: 3 },
];

export const backgrounds: Background[] = [
  { id: 1, className: "bg-gradient-to-r from-red-600 to-orange-600" },
  { id: 2, className: "bg-gradient-to-r from-yellow-600 to-red-600" },
  { id: 3, className: "bg-gradient-to-r from-orange-600 to-yellow-600" },
  { id: 4, className: "bg-gradient-to-r from-red-700 to-yellow-600" },
  { id: 5, className: "bg-gradient-to-r from-yellow-700 to-orange-600" },
];

export const motivationalImages: MotivationalImage[] = [
  {
    id: 1,
    url: "/images/motivational/image1.webp",
    alt: "Motivational workout image 1",
    category: "workout",
  },
  {
    id: 2,
    url: "/images/motivational/image2.webp",
    alt: "Motivational workout image 2",
    category: "workout",
  },
  {
    id: 3,
    url: "/images/motivational/image3.webp",
    alt: "Motivational workout image 3",
    category: "workout",
  },
  {
    id: 4,
    url: "/images/motivational/image4.webp",
    alt: "Motivational workout image 4",
    category: "workout",
  },
  {
    id: 5,
    url: "/images/motivational/image5.webp",
    alt: "Motivational workout image 5",
    category: "workout",
  },
  {
    id: 6,
    url: "/images/motivational/image6.webp",
    alt: "Motivational workout image 6",
    category: "workout",
  },
  {
    id: 7,
    url: "/images/motivational/image7.webp",
    alt: "Motivational workout image 7",
    category: "workout",
  },
];
