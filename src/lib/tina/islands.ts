// @ts-nocheck (generated types/client appear after your first tinacms dev run)
import type { IslandRegistry } from "@tinacms/astro/experimental";
import type { QueryResult } from "@tinacms/astro/data";
import type { BlogEsQuery, BlogEnQuery } from "../../../tina/__generated__/types";
import PostBodyBlog from "../../components/tina/PostBodyBlog.astro";

import { getBlogPostEs, getBlogPostEn } from "./data";

export const islands: IslandRegistry = {
  blogEs: {
    fetch: (_request, params) => getBlogPostEs(params.get("relativePath") ?? ""),
    component: PostBodyBlog,
    wrapper: { tag: "article" },
    propsFromData: (data) => ({
      data: (data as QueryResult<BlogEsQuery>).data?.blogEs,
    }),
  },
  blogEn: {
    fetch: (_request, params) => getBlogPostEn(params.get("relativePath") ?? ""),
    component: PostBodyBlog,
    wrapper: { tag: "article" },
    propsFromData: (data) => ({
      data: (data as QueryResult<BlogEnQuery>).data?.blogEn,
    }),
  },
};
