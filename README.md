# BITCHESGONEMAAD - Visual Magazine

A Next.js starter project for a visual magazine focused on fashion, art, and culture.

---

## 🌎 Languages

- [English](#-english-readme)
- [日本語](#-日本語-readme)
- [Монгол](#-монгол-readme)

---

## 🇬🇧 English README

### ✨ Features

- **Modern Tech Stack**: Next.js App Router, React, TypeScript.
- **Styling**: Tailwind CSS with ShadCN UI components for a sleek, modern, and responsive design.
- **Content Management**: A full-featured admin dashboard to create, read, update, and delete articles and events.
- **Image Uploads**: Direct image uploads to Firebase Storage from the admin panel.
- **AI Integration**: Built-in AI flows using Genkit for content summarization and read-time estimation.
- **Dynamic Pages**: Fully dynamic pages for articles, events, categories, and author bios.
- **Search Functionality**: Real-time search for all articles.

### 💻 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **AI Framework**: [Genkit (Firebase)](https://firebase.google.com/docs/genkit)
- **Backend & Storage**: [Firebase](https://firebase.google.com/) (Firestore & Storage)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation.

### 🚀 Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run the Development Server**:
    ```bash
    npm run dev
    ```

3.  **Run the Genkit AI Development Server**: (In a separate terminal)
    ```bash
    npm run genkit:dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

### 🗂️ Folder Structure

-   `src/app/`: Main application routes (App Router).
-   `src/app/admin/`: Routes for the content management dashboard.
-   `src/components/`: Reusable React components.
-   `src/lib/`: Core logic, including Firebase integration (`firebase.ts`) and data fetching (`data.ts`).
-   `src/ai/`: Genkit flows for AI-powered features.
-   `src/styles/`: Global styles and Tailwind CSS configuration.
-   `public/`: Static assets.

---

## 🇯🇵 日本語 README

### ✨ 主な機能

- **モダンな技術スタック**: Next.js App Router, React, TypeScript。
- **スタイリング**: Tailwind CSSとShadCN UIコンポーネントによる、洗練されたモダンでレスポンシブなデザイン。
- **コンテンツ管理**: 記事やイベントを作成、表示、更新、削除するための全機能搭載の管理ダッシュボード。
- **画像アップロード**: 管理パネルからFirebase Storageへの直接画像アップロード。
- **AI統合**: Genkitを使用したコンテンツ要約や読了時間推定のための組み込みAIフロー。
- **動的ページ**: 記事、イベント、カテゴリ、著者略歴のための完全動的ページ。
- **検索機能**: 全記事を対象としたリアルタイム検索。

### 💻 技術スタック

- **フレームワーク**: [Next.js](https://nextjs.org/) (App Router使用)
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **UIコンポーネント**: [ShadCN UI](https://ui.shadcn.com/)
- **AIフレームワーク**: [Genkit (Firebase)](https://firebase.google.com/docs/genkit)
- **バックエンド & ストレージ**: [Firebase](https://firebase.google.com/) (Firestore & Storage)
- **フォーム管理**: [React Hook Form](https://react-hook-form.com/) と [Zod](https://zod.dev/) によるバリデーション。

### 🚀 はじめに

1.  **依存関係のインストール**:
    ```bash
    npm install
    ```

2.  **開発サーバーの実行**:
    ```bash
    npm run dev
    ```

3.  **Genkit AI開発サーバーの実行**: (別のターミナルで)
    ```bash
    npm run genkit:dev
    ```

ブラウザで [http://localhost:9002](http://localhost:9002) を開いて結果を確認してください。

### 🗂️ フォルダ構成

-   `src/app/`: メインアプリケーションのルート (App Router)。
-   `src/app/admin/`: コンテンツ管理ダッシュボードのルート。
-   `src/components/`: 再利用可能なReactコンポーネント。
-   `src/lib/`: Firebase連携 (`firebase.ts`) やデータ取得 (`data.ts`) を含むコアロジック。
-   `src/ai/`: AI機能のためのGenkitフロー。
-   `src/styles/`: グローバルスタイルとTailwind CSSの設定。
-   `public/`: 静的アセット。

---

## 🇲🇳 Монгол README

### ✨ Үндсэн боломжууд

- **Орчин үеийн технологи**: Next.js App Router, React, TypeScript.
- **Стайлинг**: Tailwind CSS болон ShadCN UI компонент ашигласан загварлаг, орчин үеийн, бүх төрлийн дэлгэцэнд тохирсон дизайн.
- **Контент Удирдлага**: Нийтлэл, эвент үүсгэх, унших, засах, устгах бүрэн боломжтой админ самбар.
- **Зураг Хуулах**: Админ самбараас шууд Firebase Storage руу зураг хуулах боломж.
- **Хиймэл Оюуны Нэгдэл**: Genkit ашиглан контентын хураангуй гаргах, унших хугацааг тооцоолох зэрэг хиймэл оюуны боломжууд.
- **Динамик Хуудсууд**: Нийтлэл, эвент, ангилал, зохиогчийн танилцуулга зэрэг бүрэн динамик хуудсууд.
- **Хайлтын систем**: Бүх нийтлэлийн хүрээнд бодит цагийн хайлт хийх боломж.

### 💻 Технологийн Сонголт

- **Фрэймворк**: [Next.js](https://nextjs.org/) (App Router-тай)
- **Хэл**: [TypeScript](https://www.typescriptlang.org/)
- **Стайлинг**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Компонент**: [ShadCN UI](https://ui.shadcn.com/)
- **Хиймэл Оюуны Фрэймворк**: [Genkit (Firebase)](https://firebase.google.com/docs/genkit)
- **Бэкэнд & Мэдээллийн сан**: [Firebase](https://firebase.google.com/) (Firestore & Storage)
- **Форм Удирдлага**: [React Hook Form](https://react-hook-form.com/) болон [Zod](https://zod.dev/) ашиглан форм шалгах.

### 🚀 Эхлүүлэх заавар

1.  **Шаардлагатай сангуудыг суулгах**:
    ```bash
    npm install
    ```

2.  **Хөгжүүлэлтийн серверийг ажиллуулах**:
    ```bash
    npm run dev
    ```

3.  **Genkit AI хөгжүүлэлтийн серверийг ажиллуулах**: (Өөр терминал дээр)
    ```bash
    npm run genkit:dev
    ```

Хөтөч дээрээ [http://localhost:9002](http://localhost:9002) хаягийг нээн, үр дүнг харна уу.

### 🗂️ Фолдерын Бүтэц

-   `src/app/`: Үндсэн хуудаснуудын зам (App Router).
-   `src/app/admin/`: Контент удирдах самбарын зам.
-   `src/components/`: Дахин ашиглагдах React компонент.
-   `src/lib/`: Firebase-ийн холболт (`firebase.ts`), өгөгдлийн сангийн логик (`data.ts`) зэрэг үндсэн кодууд.
-   `src/ai/`: Хиймэл оюуны үйлдлүүдийг агуулсан Genkit-ийн файлууд.
-   `src/styles/`: Глобал стиль болон Tailwind CSS-ийн тохиргоо.
-   `public/`: Статик файлууд (зураг, фонт г.м).
