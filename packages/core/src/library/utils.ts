import { TranslationTree } from "./types";

const doubleEncodeURIComponent = (str: string) =>
  encodeURIComponent(encodeURIComponent(str));

const getOrganizationUploadBasePath = ({
  organizationSlug,
}: {
  organizationSlug: string;
}) => `organization-${doubleEncodeURIComponent(organizationSlug)}`;

const getProjectUploadBasePath = ({
  projectSlug,
  organizationSlug,
}: {
  projectSlug: string;
  organizationSlug: string;
}) =>
  `${getOrganizationUploadBasePath({ organizationSlug })}/project-${doubleEncodeURIComponent(projectSlug)}`;

const getContentBranchUploadBasePath = ({
  projectSlug,
  organizationSlug,
  contentBranchName,
}: {
  projectSlug: string;
  organizationSlug: string;
  contentBranchName: string;
}) =>
  `${getProjectUploadBasePath({ projectSlug, organizationSlug })}/branch-${doubleEncodeURIComponent(contentBranchName)}`;

export const getUploadedContentPath = ({
  langFileName,
  organizationSlug,
  projectSlug,
  contentBranchName,
}: {
  langFileName: string;
  projectSlug: string;
  organizationSlug: string;
  contentBranchName: string;
}) =>
  `${getContentBranchUploadBasePath({ contentBranchName, projectSlug, organizationSlug })}/${doubleEncodeURIComponent(langFileName)}`;

export const getUploadedManifestPath = ({
  organizationSlug,
  projectSlug,
  contentBranchName,
}: {
  projectSlug: string;
  organizationSlug: string;
  contentBranchName: string;
}) =>
  `${getContentBranchUploadBasePath({ contentBranchName, projectSlug, organizationSlug })}/manifest.json`;

export const interpolate = (
  str: string,
  params: Record<string, unknown> = {},
) => {
  return Object.entries(params).reduce(
    (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)),
    str,
  );
};

export const createTranslationTree = (obj: Record<string, string>): TranslationTree => {
  const result: TranslationTree = {};

  for (const [key, value] of Object.entries(obj)) {
    const parts = key.split(".");

    let current: TranslationTree = result;

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;

      if (isLast) {
        current[part] = value;
        return;
      }

      if (typeof current[part] !== "object") {
        current[part] = {};
      }

      current = current[part] as TranslationTree;
    });
  }

  return result;
}
