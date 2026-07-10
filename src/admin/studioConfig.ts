export const STUDIO_PATH = "/manage-mea-7f3k9q";
export const STUDIO_QUERY_KEY = "mea-7f3k9q";
export const CONTENT_FILE_PATH = "src/content/editorContent.json";
export const GITHUB_OWNER = "Corentis-88";
export const GITHUB_REPOSITORY = "mea-business-technology-hub";
export const GITHUB_BRANCH = "main";

export const studioUrl = () => `${window.location.origin}${import.meta.env.BASE_URL}?studio=${STUDIO_QUERY_KEY}`;
