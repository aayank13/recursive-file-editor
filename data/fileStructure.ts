type FileSystemItem = {
    name: string
    type: 'file' | 'folder'
    children?: FileSystemItem[]
    content?: string
  }
  
export  const fileStructure: FileSystemItem = {
    name: 'project-root',
    type: 'folder',
    children: [
      {
        name: 'src',
        type: 'folder',
        children: [
          { name: 'index.ts', type: 'file', content: 'console.log("Hello, World!");' },
          { name: 'styles.css', type: 'file', content: 'body { font-family: sans-serif; }' },
          {
            name: 'components',
            type: 'folder',
            children: [
              { name: 'Button.tsx', type: 'file', content: 'export const Button = () => { \n <button>Click me</button> \n}' },
              { name: 'Input.tsx', type: 'file', content: 'export const Input = () => <input type="text" />;' },
            ],
          },
        ],
      },
      {
        name: 'public',
        type: 'folder',
        children: [
          { name: 'favicon.ico', type: 'file', content: 'Binary content...' },
          { name: 'logo.svg', type: 'file', content: '<svg>...</svg>' },
        ],
      },
      { name: 'package.json', type: 'file', content: '{\n  "name": "my-project",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.0.0",\n    "next": "^13.0.0"\n  }\n}' },
      { name: 'README.md', type: 'file', content: '# My Project\n\nThis is a sample project readme file.' },
    ],
  }