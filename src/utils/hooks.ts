import { graphql, useStaticQuery } from "gatsby";

/**
 * Hook to provide the site meta data.
 * Provides STRIPE_API_KEY and siteUrl
 */
export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query OPTIONS_QUERY {
        site {
          siteMetadata {
            STRIPE_API_KEY
            siteUrl
          }
        }
      }
    `
  );
  return site.siteMetadata;
};
