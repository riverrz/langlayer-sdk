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
