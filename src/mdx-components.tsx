import type { MDXComponents } from "mdx/types";

/**
 * Post bodies are wrapped in `.prose`, which styles elements directly, so
 * there is nothing to map here. The file still has to exist for @next/mdx.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components;
}
