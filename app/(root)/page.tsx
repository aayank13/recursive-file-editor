'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronRight, File, GitBranch, History, Search } from 'lucide-react'
import { fileStructure } from '@/data/fileStructure'

type FileSystemItem = {
  name: string
  type: 'file' | 'folder'
  children?: FileSystemItem[]
  content?: string
}

const FileTree: React.FC<{
  item: FileSystemItem
  onFileClick: (file: FileSystemItem) => void
  level?: number
}> = ({ item, onFileClick, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(level === 0)

  const toggleFolder = () => {
    if (item.type === 'folder') {
      setIsOpen(!isOpen)
    }
  }

  const handleClick = () => {
    if (item.type === 'file') {
      onFileClick(item)
    } else {
      toggleFolder()
    }
  }

  return (
    <div className={`${level > 0 ? 'ml-4' : ''}`}>
      <div
        className="flex items-center py-1 px-2 hover:bg-gray-100 cursor-pointer text-sm"
        onClick={handleClick}
      >
        <span className="mr-2">
          {item.type === 'folder' ? (
            isOpen ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )
          ) : (
            <File className="h-4 w-4 text-gray-500" />
          )}
        </span>
        {item.name}
      </div>
      {item.type === 'folder' && isOpen && (
        <div>
          {item.children?.map((child) => (
            <FileTree
              key={child.name}
              item={child}
              onFileClick={onFileClick}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const Page: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FileSystemItem | null>(null)

  const handleFileClick = (file: FileSystemItem) => {
    setSelectedFile(file)
  }

  return (
    <div className="flex h-screen bg-white text-gray-800">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">my-project</h2>
            <GitBranch className="h-5 w-5 text-gray-500" />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Find a file..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="overflow-auto flex-grow">
          <FileTree item={fileStructure} onFileClick={handleFileClick} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
              <GitBranch className="mr-2 h-4 w-4" />
              main
            </button>
            <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
              <History className="mr-2 h-4 w-4" />
              2 commits
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md">
              Raw
            </button>
            <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md">
              Blame
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {selectedFile ? (
            <>
              <h2 className="text-2xl font-bold mb-4">{selectedFile.name}</h2>
              <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                <pre className="whitespace-pre-wrap break-words text-sm">
                  <code>{selectedFile.content}</code>
                </pre>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a file to view its content
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page