type BotMessage = {
  id: number;
  text: string;
  category: "motivation" | "training" | "mindset" | "discipline";
};

export const botMessages: BotMessage[] = [
  // モチベーション系
  {
    id: 1,
    text: "限界なんてもんは存在しない！超えていけ！",
    category: "motivation",
  },
  {
    id: 2,
    text: "今日の積み重ねが、明日の最強の自分を作る",
    category: "motivation",
  },
  { id: 3, text: "痛みは一時的、諦めは永遠だ。選べ！", category: "motivation" },
  {
    id: 4,
    text: "弱音を吐くな、前を向け！道は開かれている！",
    category: "motivation",
  },
  {
    id: 5,
    text: "今の苦しみは、未来の勝利のための投資だ",
    category: "motivation",
  },

  // トレーニング系
  {
    id: 6,
    text: "フォームを意識しろ！それが真の強さを生む！",
    category: "training",
  },
  {
    id: 7,
    text: "重量より質を重視しろ！完璧な一回が重要だ！",
    category: "training",
  },
  {
    id: 8,
    text: "休息も成長の一部だ。賢く休め、強く戻れ！",
    category: "training",
  },
  {
    id: 9,
    text: "プランクは体幹の要！毎日60秒から始めろ！",
    category: "training",
  },
  {
    id: 10,
    text: "スクワットは脚の王様だ！深く沈み込め！",
    category: "training",
  },

  // マインドセット系
  {
    id: 11,
    text: "弱い自分を受け入れ、強い自分を作り出せ",
    category: "mindset",
  },
  {
    id: 12,
    text: "失敗は成功の材料だ。恐れるな、挑戦しろ！",
    category: "mindset",
  },
  {
    id: 13,
    text: "比べるのは過去の自分だけだ。前を向け！",
    category: "mindset",
  },
  {
    id: 14,
    text: "できないと思った時が、最も成長できる時だ",
    category: "mindset",
  },
  { id: 15, text: "完璧を求めるな、進歩を求めろ！", category: "mindset" },

  // 規律系
  {
    id: 16,
    text: "毎日の積み重ねが、非凡な結果を生む",
    category: "discipline",
  },
  {
    id: 17,
    text: "計画を立てろ、実行しろ、結果を出せ！",
    category: "discipline",
  },
  { id: 18, text: "言い訳している暇があったら動け！", category: "discipline" },
  {
    id: 19,
    text: "今やらないで、いつやる？今しかない！",
    category: "discipline",
  },
  { id: 20, text: "90%の準備より、100%の実行！", category: "discipline" },

  // ... 以下同様のパターンで80個追加 ...
  { id: 21, text: "汗は努力の証明だ。輝け！", category: "motivation" },
  {
    id: 22,
    text: "明日の自分に負けるな、今日を超えろ！",
    category: "motivation",
  },
  { id: 23, text: "最強の敵は、弱気な自分だ", category: "mindset" },
  { id: 24, text: "筋肉は裏切らない。信じろ！", category: "training" },
  { id: 25, text: "やれると思えばやれる、それが真実だ", category: "mindset" },
  // 続き
  { id: 26, text: "限界を超えた先に、真の強さがある", category: "motivation" },
  {
    id: 27,
    text: "今日の自分を超えていけ、それが成長だ",
    category: "training",
  },
  { id: 28, text: "諦めは敗北への一番の近道だ", category: "mindset" },
  { id: 29, text: "理想の自分まであと一歩、踏み出せ", category: "discipline" },
  { id: 30, text: "強さは心技体、全てを鍛えろ", category: "motivation" },

  {
    id: 31,
    text: "デッドリフトは全身の王様、背筋を伸ばせ！",
    category: "training",
  },
  { id: 32, text: "プロテインより大事なのは根性だ", category: "mindset" },
  {
    id: 33,
    text: "一日一歩でも前に進め、それが勝利だ",
    category: "discipline",
  },
  {
    id: 34,
    text: "肉体の限界は精神の限界を超えられない",
    category: "motivation",
  },
  {
    id: 35,
    text: "ベンチプレスは胸の芸術だ、美しく押し上げろ！",
    category: "training",
  },

  { id: 36, text: "筋肉は裏切らない、でも油断は裏切る", category: "mindset" },
  {
    id: 37,
    text: "予定は守るもんじゃない、超えるもんだ",
    category: "discipline",
  },
  {
    id: 38,
    text: "迷ったら攻めろ、それが最強の防御だ",
    category: "motivation",
  },
  { id: 39, text: "腹筋は台所で作られる、食事も鍛錬だ", category: "training" },
  { id: 40, text: "弱さを知る者だけが、強さを理解できる", category: "mindset" },

  { id: 41, text: "継続は最強の武器だ、手放すな", category: "discipline" },
  { id: 42, text: "汗と涙は、勝利への肥料だ", category: "motivation" },
  {
    id: 43,
    text: "懸垂は背中の勲章、一回でも多く上がれ",
    category: "training",
  },
  { id: 44, text: "不可能という言葉は、弱者の言い訳だ", category: "mindset" },
  {
    id: 45,
    text: "計画なき努力は、闇雲な消耗でしかない",
    category: "discipline",
  },

  { id: 46, text: "鍛えた筋肉は、人生の勲章だ", category: "motivation" },
  {
    id: 47,
    text: "ショルダープレスは天への挑戦だ、押し上げろ！",
    category: "training",
  },
  { id: 48, text: "痛みを恐れる者に、成長なし", category: "mindset" },
  { id: 49, text: "今日できることは明日に延ばすな", category: "discipline" },
  { id: 50, text: "最後の一回が、最強の一回になる", category: "motivation" },

  {
    id: 51,
    text: "腕立ては心の数だけ、限界まで追い込め",
    category: "training",
  },
  { id: 52, text: "強くなりたいなら、弱さと向き合え", category: "mindset" },
  { id: 53, text: "道具に頼るな、自分を信じろ", category: "discipline" },
  { id: 54, text: "一歩後退は、二歩前進のためだ", category: "motivation" },
  { id: 55, text: "ダンベルは相棒だ、信頼で応えろ", category: "training" },

  { id: 56, text: "成長に王道なし、すべては血と汗だ", category: "mindset" },
  { id: 57, text: "目標は高く、足元は着実に", category: "discipline" },
  {
    id: 58,
    text: "諦めという敗北を、知らない男であれ",
    category: "motivation",
  },
  { id: 59, text: "負荷は友達だ、受け入れて強くなれ", category: "training" },
  { id: 60, text: "弱い自分に負けるな、それが最大の敵だ", category: "mindset" },

  { id: 61, text: "毎日の積み重ねが、奇跡を起こす", category: "discipline" },
  { id: 62, text: "筋肉は最強の武器だ、磨き上げろ", category: "motivation" },
  { id: 63, text: "フォームは基礎だ、完璧を求めろ", category: "training" },
  { id: 64, text: "強さは心が決める、体は従うだけだ", category: "mindset" },
  { id: 65, text: "休むのも戦略だ、賢く使え", category: "discipline" },

  { id: 66, text: "限界は突破するためにある", category: "motivation" },
  { id: 67, text: "呼吸を整えろ、そこから全てが始まる", category: "training" },
  { id: 68, text: "己の弱さこそが、最強の教師だ", category: "mindset" },
  { id: 69, text: "結果を出すまで、止まるな", category: "discipline" },
  { id: 70, text: "筋肉は裏切らない、心が裏切るんだ", category: "motivation" },

  { id: 71, text: "重力に逆らえ、それが成長への道だ", category: "training" },
  { id: 72, text: "迷いは弱さの始まりだ、断ち切れ", category: "mindset" },
  { id: 73, text: "計画は完璧に、実行は柔軟に", category: "discipline" },
  { id: 74, text: "最強の敵は、昨日の自分だ", category: "motivation" },
  { id: 75, text: "体の声を聴け、でも甘やかすな", category: "training" },
  {
    id: 76,
    text: "己の限界を知るな、超えることだけを知れ",
    category: "motivation",
  },
  { id: 77, text: "チートデイも戦略の内、賢く使え", category: "training" },
  { id: 78, text: "恐れは可能性を殺す、挑戦こそが道だ", category: "mindset" },
  { id: 79, text: "100回できないなら、101回やれ", category: "discipline" },
  { id: 80, text: "筋肉は最高の勲章だ、誇れ", category: "motivation" },

  { id: 81, text: "スーパーセットは超人への道だ、挑め", category: "training" },
  { id: 82, text: "強さは心の中にある、解放しろ", category: "mindset" },
  { id: 83, text: "日々の積み重ねが、伝説を作る", category: "discipline" },
  { id: 84, text: "汗は努力の結晶だ、輝かせろ", category: "motivation" },
  { id: 85, text: "アイソメトリックも武器にしろ", category: "training" },

  { id: 86, text: "弱音は筋肉を裏切る、断ち切れ", category: "mindset" },
  { id: 87, text: "計画は実行の半分、残りは根性だ", category: "discipline" },
  { id: 88, text: "最強の敵は自分の中にいる、倒せ", category: "motivation" },
  { id: 89, text: "体重より質を重視しろ、それが王道だ", category: "training" },
  { id: 90, text: "できないは、まだできないだけだ", category: "mindset" },

  { id: 91, text: "一日一歩でも、千里の道を行ける", category: "discipline" },
  { id: 92, text: "明日の自分は今日を超えてるか？", category: "motivation" },
  { id: 93, text: "セットは人生だ、最後まで諦めるな", category: "training" },
  { id: 94, text: "痛みは成長の証だ、歓迎しろ", category: "mindset" },
  { id: 95, text: "習慣は第二の天性だ、作り上げろ", category: "discipline" },

  { id: 96, text: "限界は breakthrough のためにある", category: "motivation" },
  { id: 97, text: "レップを刻め、それが勝利への道だ", category: "training" },
  { id: 98, text: "弱さを知る者こそ、強さを掴める", category: "mindset" },
  {
    id: 99,
    text: "細かいことの積み重ねが、大きな変化を生む",
    category: "discipline",
  },
  {
    id: 100,
    text: "お前の限界はまだ見えていない、超えていけ！",
    category: "motivation",
  },
];


export const getRandomMessage = (): string => {
  const randomIndex = Math.floor(Math.random() * botMessages.length);
  return botMessages[randomIndex].text;
};

export const getRandomMessageByCategory = (
  category: BotMessage["category"]
): string => {
  const filteredMessages = botMessages.filter(
    (msg) => msg.category === category
  );
  const randomIndex = Math.floor(Math.random() * filteredMessages.length);
  return filteredMessages[randomIndex].text;
};
