/**
 * Maps technology display names (from content JSON) to SVG file slugs
 * in public/images/technologies/{slug}.svg
 */
export const technologyIconMap: Record<string, string> = {
  // Backend
  'Java': 'java',
  '.NET': 'dotnet',
  'Rust': 'rust',
  'Spring': 'spring',
  'Spring Boot': 'spring',
  'Node.js': 'nodejs',

  // Frontend
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'Vue.js': 'vuejs',
  'React': 'react',
  'Angular': 'angular',
  'Vite': 'vite',

  // Mobile
  'Flutter': 'flutter',
  'Android': 'android',
  'iOS': 'ios',

  // Data
  'PostgreSQL': 'postgresql',
  'MongoDB': 'mongodb',
  'Redis': 'redis',
  'Elasticsearch': 'elasticsearch',

  // DevOps
  'Kubernetes': 'kubernetes',
  'Docker': 'docker',
  'Terraform': 'terraform',
  'Ansible': 'ansible',
  'GitHub Actions': 'github-actions',
  'Helm': 'helm',

  // Architecture
  'OpenAPI': 'openapi',
};
