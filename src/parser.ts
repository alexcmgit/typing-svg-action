import YAML from 'yaml';
import { SvgParams } from './types';

/**
 * Extract the first YAML codeblock from issue body
 */
export function extractYamlFromBody(body: string): string | null {
  // Match ```yaml or ```yml codeblocks
  const yamlRegex = /```ya?ml\s*\n([\s\S]*?)```/i;
  const match = body.match(yamlRegex);
  return match ? match[1].trim() : null;
}

/**
 * Parse YAML string into SvgParams
 */
export function parseYamlParams(yamlStr: string): SvgParams {
  const parsed = YAML.parse(yamlStr);
  
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid YAML: must be an object');
  }

  if (!parsed.lines) {
    throw new Error('Missing required parameter: lines');
  }

  return parsed as SvgParams;
}

/**
 * Parse issue body and extract SVG parameters
 */
export function parseIssueBody(body: string): SvgParams {
  const yaml = extractYamlFromBody(body);
  if (!yaml) {
    throw new Error('No YAML codeblock found in issue body');
  }
  return parseYamlParams(yaml);
}
