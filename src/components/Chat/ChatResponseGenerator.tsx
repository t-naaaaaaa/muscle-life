"use client";

import { getRandomMessageByCategory } from "@/config/messages";

export class ChatResponseGenerator {
  static async generateAIResponse(userMessage: string): Promise<string> {
    const lowerMessage = userMessage.toLowerCase();
    
    // 特定のキーワードに基づいた特別な応答
    if (lowerMessage.includes("疲れ") || lowerMessage.includes("つらい")) {
      return "疲労も筋トレと同じで超回復が重要なんだ。今は休んで力を蓄える時期。でも長期的には、体を鍛えて疲れに強い体を作ることだ。それが本当の解決策になる！";
    }

    if (lowerMessage.includes("花粉") || lowerMessage.includes("アレルギー")) {
      return "花粉症アレルギーは結局体内に溜まる総量で発症するんだ。筋トレして身体を大きくしていけば花粉の影響も少なくなる。まずは体作りから始めよう！";
    }

    if (lowerMessage.includes("人間関係") || lowerMessage.includes("仲良く")) {
      return "人間関係も筋トレと同じで、適度な刺激を与えることが大切だ。その分だけ関係性も筋肉も成長する。壊された分だけ超回復するんだ。関係の超回復を目指せ！";
    }

    // カテゴリに基づいたベース応答の生成
    const baseResponse = this.generateBaseResponse(userMessage);
    return this.enhanceResponse(baseResponse);
  }

  private static generateBaseResponse(userMessage: string): string {
    const category = this.determineCategory(userMessage);
    return getRandomMessageByCategory(category);
  }

  private static enhanceResponse(baseResponse: string): string {
    const enhancements = [
      "筋肉は裏切らない。それが真実だ！",
      "すべては筋トレで解決する！",
      "心の筋肉も鍛えていこう！",
      "それが最強の道だ！"
    ];
    const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
    return `${baseResponse} ${randomEnhancement}`;
  }

  private static determineCategory(
  message: string
): "motivation" | "training" | "mindset" | "discipline" {
  const lowerCaseMessage = message.toLowerCase();

  // トレーニング関連のキーワード
  if (
    lowerCaseMessage.includes("筋トレ") ||
    lowerCaseMessage.includes("トレーニング") ||
    lowerCaseMessage.includes("フォーム") ||
    lowerCaseMessage.includes("重量") ||
    lowerCaseMessage.includes("ジム") ||
    lowerCaseMessage.includes("プロテイン")
  ) {
    return "training";
  }

  // モチベーション関連のキーワード
  if (
    lowerCaseMessage.includes("モチベーション") ||
    lowerCaseMessage.includes("やる気") ||
    lowerCaseMessage.includes("頑張") ||
    lowerCaseMessage.includes("励まし") ||
    lowerCaseMessage.includes("元気") ||
    lowerCaseMessage.includes("調子")
  ) {
    return "motivation";
  }

  // メンタル関連のキーワード
  if (
    lowerCaseMessage.includes("メンタル") ||
    lowerCaseMessage.includes("気持ち") ||
    lowerCaseMessage.includes("心") ||
    lowerCaseMessage.includes("不安") ||
    lowerCaseMessage.includes("悩み") ||
    lowerCaseMessage.includes("ストレス")
  ) {
    return "mindset";
  }

  // 規律関連のキーワード
  if (
    lowerCaseMessage.includes("継続") ||
    lowerCaseMessage.includes("習慣") ||
    lowerCaseMessage.includes("計画") ||
    lowerCaseMessage.includes("目標") ||
    lowerCaseMessage.includes("routine") ||
    lowerCaseMessage.includes("生活")
  ) {
    return "discipline";
  }

  // デフォルトはモチベーションカテゴリ
  return "motivation";
}
}