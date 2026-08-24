// @ts-nocheck (generated types/client appear after your first tinacms dev run)
import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../../tina/__generated__/client';

export const getBlogPostEs = (relativePath: string) =>
  requestWithMetadata(client.queries.blogEs({ relativePath }), {
    priority: 'primary',
  });

export const getBlogPostEn = (relativePath: string) =>
  requestWithMetadata(client.queries.blogEn({ relativePath }), {
    priority: 'primary',
  });
