import * as fs from 'fs';
import * as path from 'path';
import { parseIssueBody } from './parser';
import { generateSvg } from './generator';

interface GitHubContext {
  payload: {
    issue?: {
      number: number;
      body: string | null;
    };
  };
  repo: {
    owner: string;
    repo: string;
  };
}

interface GenerateOptions {
  github: any;
  context: GitHubContext;
  core: any;
}

export async function generateFromIssue({ github, context, core }: GenerateOptions): Promise<void> {
  const issue = context.payload.issue;
  
  if (!issue || !issue.body) {
    core.setFailed('No issue body found');
    return;
  }

  try {
    const params = parseIssueBody(issue.body);
    const svg = generateSvg(params);
    
    // Write SVG to file
    const outputDir = 'output';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const svgPath = path.join(outputDir, `typing-${issue.number}.svg`);
    fs.writeFileSync(svgPath, svg);
    
    core.setOutput('svg_path', svgPath);
    core.setOutput('svg_content', svg);
    core.setOutput('issue_number', issue.number.toString());
    
    core.info(`SVG generated and saved to ${svgPath}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    
    await github.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: issue.number,
      body: `❌ Failed to generate SVG: ${message}`,
    });
    
    core.setFailed(message);
  }
}

export { parseIssueBody, generateSvg };
export * from './types';
