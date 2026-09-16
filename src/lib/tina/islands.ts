// @ts-nocheck (generated types/client appear after your first tinacms dev run)
import type { IslandRegistry } from "@tinacms/astro/experimental";
import type { QueryResult } from "@tinacms/astro/data";
import type { BlogEsQuery, BlogEnQuery, SiteConfigQuery, HeaderMenuQuery, GalleryLogosQuery, BannersQuery, ToursGlobalesEsQuery, ToursGlobalesEnQuery, ToursGrupalesEsQuery, ToursGrupalesEnQuery, Page404Query } from "../../../tina/__generated__/types";
import PostBodyBlog from "../../components/tina/PostBodyBlog.astro";
import HeroHome from "../../components/section/HeroHome.astro";
import PortadaDinamica from "../../components/section/PortadaDinamica.astro";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";
import Infotravel from "../../components/section/Infotravel.astro";
import Page404Body from "../../components/islands/Page404Body.astro";

import { getBlogPostEs, getBlogPostEn, getConfig, getMenuData, getGalleryLogos, getBanners, getTourGlobalesEs, getTourGlobalesEn, getTourGrupalesEs, getTourGrupalesEn, getPage404 } from "./data";
import { getLocaleData } from "../../utils/getLocaleData";

// ✅ Getter functions prevent Vite tree-shaking
function _heroHome() { return HeroHome; }
function _portadaDinamica() { return PortadaDinamica; }
function _header() { return Header; }
function _footer() { return Footer; }
function _postBodyBlog() { return PostBodyBlog; }
function _infotravel() { return Infotravel; }
function _page404Body() { return Page404Body; }

export const islands: IslandRegistry = {
  // ── Blog ────────────────────────────────────────────────────────────
  blogEs: {
    fetch: (_request, params) => getBlogPostEs(params.get("relativePath") ?? ""),
    get component() { return _postBodyBlog(); },
    wrapper: { tag: "article" },
    propsFromData: (data) => ({
      data: (data as QueryResult<BlogEsQuery>).data?.blogEs,
    }),
  },
  blogEn: {
    fetch: (_request, params) => getBlogPostEn(params.get("relativePath") ?? ""),
    get component() { return _postBodyBlog(); },
    wrapper: { tag: "article" },
    propsFromData: (data) => ({
      data: (data as QueryResult<BlogEnQuery>).data?.blogEn,
    }),
  },

  // ── Hero Home ───────────────────────────────────────────────────────
  heroHome: {
    fetch: (_request, params) => getConfig(),
    get component() { return _heroHome(); },
    wrapper: { tag: "section" },
    propsFromData: (data) => ({
      siteConfig: (data as QueryResult<SiteConfigQuery>).data?.siteConfig,
    }),
  },

  // ── Banners (Portada Dinámica) ──────────────────────────────────────
  banners: {
    fetch: (_request, params) => getBanners(),
    get component() { return _portadaDinamica(); },
    wrapper: { tag: "div" },
    propsFromData: (data) => ({
      bannersData: (data as QueryResult<BannersQuery>).data?.banners,
    }),
  },

  // ── Header ──────────────────────────────────────────────────────────
  header: {
    fetch: async (_request, params) => {
      const [configData, menuData] = await Promise.all([
        getConfig(),
        getMenuData(),
      ]);
      return { configData, menuData };
    },
    get component() { return _header(); },
    wrapper: { tag: "header" },
    propsFromData: (data: any) => ({
      siteConfig: (data.configData as QueryResult<SiteConfigQuery>).data?.siteConfig,
      menuData: (data.menuData as QueryResult<HeaderMenuQuery>).data?.headerMenu,
    }),
  },

  // ── Footer ──────────────────────────────────────────────────────────
  footer: {
    fetch: (_request, params) => getConfig(),
    get component() { return _footer(); },
    wrapper: { tag: "footer" },
    propsFromData: (data) => ({
      siteConfig: (data as QueryResult<SiteConfigQuery>).data?.siteConfig,
    }),
  },

  // ── Tours Globales ──────────────────────────────────────────────────
  toursGlobalesEs: {
    fetch: async (_request, params) => {
      const [tourData, configData, galleryData, bannersData] = await Promise.all([
        getTourGlobalesEs(params.get("relativePath") ?? ""),
        getConfig(),
        getGalleryLogos(),
        getBanners(),
      ]);
      return { tourData, configData, galleryData, bannersData };
    },
    get component() { return _infotravel(); },
    wrapper: { tag: "section" },
    propsFromData: (data: any) => ({
      data: (data.tourData as QueryResult<ToursGlobalesEsQuery>).data?.toursGlobalesEs,
      lenguaje: getLocaleData("es").lenguaje,
      siteConfig: (data.configData as QueryResult<SiteConfigQuery>).data?.siteConfig,
      galleryLogosData: (data.galleryData as QueryResult<GalleryLogosQuery>).data?.galleryLogos,
      paymentLogosData: (data.bannersData as QueryResult<BannersQuery>).data?.banners?.paymentLogos ?? [],
    }),
  },
  toursGlobalesEn: {
    fetch: async (_request, params) => {
      const [tourData, configData, galleryData, bannersData] = await Promise.all([
        getTourGlobalesEn(params.get("relativePath") ?? ""),
        getConfig(),
        getGalleryLogos(),
        getBanners(),
      ]);
      return { tourData, configData, galleryData, bannersData };
    },
    get component() { return _infotravel(); },
    wrapper: { tag: "section" },
    propsFromData: (data: any) => ({
      data: (data.tourData as QueryResult<ToursGlobalesEnQuery>).data?.toursGlobalesEn,
      lenguaje: getLocaleData("en").lenguaje,
      siteConfig: (data.configData as QueryResult<SiteConfigQuery>).data?.siteConfig,
      galleryLogosData: (data.galleryData as QueryResult<GalleryLogosQuery>).data?.galleryLogos,
      paymentLogosData: (data.bannersData as QueryResult<BannersQuery>).data?.banners?.paymentLogos ?? [],
    }),
  },

  // ── Tours Grupales ─────────────────────────────────────────────────
  toursGrupalesEs: {
    fetch: async (_request, params) => {
      const [tourData, configData, galleryData, bannersData] = await Promise.all([
        getTourGrupalesEs(params.get("relativePath") ?? ""),
        getConfig(),
        getGalleryLogos(),
        getBanners(),
      ]);
      return { tourData, configData, galleryData, bannersData };
    },
    get component() { return _infotravel(); },
    wrapper: { tag: "section" },
    propsFromData: (data: any) => ({
      data: (data.tourData as QueryResult<ToursGrupalesEsQuery>).data?.toursGrupalesEs,
      lenguaje: getLocaleData("es").lenguaje,
      siteConfig: (data.configData as QueryResult<SiteConfigQuery>).data?.siteConfig,
      galleryLogosData: (data.galleryData as QueryResult<GalleryLogosQuery>).data?.galleryLogos,
      paymentLogosData: (data.bannersData as QueryResult<BannersQuery>).data?.banners?.paymentLogos ?? [],
    }),
  },
  toursGrupalesEn: {
    fetch: async (_request, params) => {
      const [tourData, configData, galleryData, bannersData] = await Promise.all([
        getTourGrupalesEn(params.get("relativePath") ?? ""),
        getConfig(),
        getGalleryLogos(),
        getBanners(),
      ]);
      return { tourData, configData, galleryData, bannersData };
    },
    get component() { return _infotravel(); },
    wrapper: { tag: "section" },
    propsFromData: (data: any) => ({
      data: (data.tourData as QueryResult<ToursGrupalesEnQuery>).data?.toursGrupalesEn,
      lenguaje: getLocaleData("en").lenguaje,
      siteConfig: (data.configData as QueryResult<SiteConfigQuery>).data?.siteConfig,
      galleryLogosData: (data.galleryData as QueryResult<GalleryLogosQuery>).data?.galleryLogos,
      paymentLogosData: (data.bannersData as QueryResult<BannersQuery>).data?.banners?.paymentLogos ?? [],
    }),
  },

  // ── 404 Page ─────────────────────────────────────────────────────
  page404: {
    fetch: (_request, _params) => getPage404(),
    get component() { return _page404Body(); },
    wrapper: { tag: "div" },
    propsFromData: (data) => ({
      data: (data as QueryResult<Page404Query>).data?.page404,
    }),
  },
};
