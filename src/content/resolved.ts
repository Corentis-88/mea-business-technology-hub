import { baselineCustomPages, baselineSiteSettings } from "./defaults";
import { publishedContentOverride } from "./published";

export const siteSettings = publishedContentOverride?.siteSettings ?? baselineSiteSettings;
export const customPages = publishedContentOverride?.customPages ?? baselineCustomPages;
