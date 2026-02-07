/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_NAME?: string;
    // 他の環境変数をここに追加
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
