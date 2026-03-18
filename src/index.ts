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
    
    // Comment on the issue with the SVG preview
    const svgBase64 = Buffer.from(svg).toString('base64');
    const dataUri = `data:image/svg+xml;base64,${svgBase64}`;
    
    await github.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: issue.number,
      body: `## Generated Typing SVG\n\n![Typing SVG](${dataUri})\n\n<details>\n<summary>Raw SVG</summary>\n\n\`\`\`xml\n${svg}\n\`\`\`\n</details>`,
    });
    
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
