// @ts-nocheck (generated types/client appear after your first tinacms dev run)
import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../../tina/__generated__/client';

// ── Blog ──────────────────────────────────────────────────────────────
export const getBlogPostEs = (relativePath: string) =>
  requestWithMetadata(client.queries.blogEs({ relativePath }), {
    priority: 'primary',
  });

export const getBlogPostEn = (relativePath: string) =>
  requestWithMetadata(client.queries.blogEn({ relativePath }), {
    priority: 'primary',
  });

// ── Site Config (global) ──────────────────────────────────────────────
export const getConfig = () =>
  requestWithMetadata(client.queries.siteConfig({ relativePath: 'site.json' }));

// ── Header Menu (global) ─────────────────────────────────────────────
export const getMenuData = () =>
  requestWithMetadata(client.queries.headerMenu({ relativePath: 'menu.json' }));

// ── Gallery Logos ────────────────────────────────────────────────────
export const getGalleryLogos = () =>
  requestWithMetadata(client.queries.galleryLogos({ relativePath: 'gallery-logos.json' }));

// ── Banners ───────────────────────────────────────────────────────────
export const getBanners = () =>
  requestWithMetadata(client.queries.banners({ relativePath: 'banners.json' }));

// ── Tours Globales ────────────────────────────────────────────────────
export const getTourGlobalesEs = (relativePath: string) =>
  requestWithMetadata(client.queries.toursGlobalesEs({ relativePath }), {
    priority: 'primary',
  });

export const getTourGlobalesEn = (relativePath: string) =>
  requestWithMetadata(client.queries.toursGlobalesEn({ relativePath }), {
    priority: 'primary',
  });

// ── Tours Grupales ───────────────────────────────────────────────────
export const getTourGrupalesEs = (relativePath: string) =>
  requestWithMetadata(client.queries.toursGrupalesEs({ relativePath }), {
    priority: 'primary',
  });

export const getTourGrupalesEn = (relativePath: string) =>
  requestWithMetadata(client.queries.toursGrupalesEn({ relativePath }), {
    priority: 'primary',
  });

// ── 404 Page ─────────────────────────────────────────────────────────
export const getPage404 = () =>
  requestWithMetadata(client.queries.page404({ relativePath: '404.json' }));
