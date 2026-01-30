import {
  MessageSquare,
  Image,
  Code,
  FileText,
  Film,
  Mic,
  Search,
  Zap,
  Bot,
  Palette,
  Cpu,
  Copy,
  Globe,
  Layout,
  CheckCircle,
  Volume2,
  Clapperboard,
  PenTool,
  Settings,
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Image,
  Code,
  FileText,
  Film,
  Mic,
  Search,
  Zap,
  Bot,
  Palette,
  Cpu,
  Copy,
  Globe,
  Layout,
  CheckCircle,
  Volume2,
  Clapperboard,
  PenTool,
  Settings,
}

export function getIconComponent(iconName: string) {
  return iconMap[iconName] || Settings
}

export function getIconEmoji(iconName: string): string {
  const emojiMap: Record<string, string> = {
    MessageSquare: '💬',
    Image: '🖼️',
    Code: '💻',
    FileText: '📄',
    Film: '🎬',
    Mic: '🎤',
    Search: '🔍',
    Zap: '⚡',
    Bot: '🤖',
    Palette: '🎨',
    Cpu: '🧠',
    Copy: '📋',
    Globe: '🌐',
    Layout: '📝',
    CheckCircle: '✅',
    Volume2: '🔊',
    Clapperboard: '🎥',
    PenTool: '✏️',
    Settings: '⚙️',
  }
  return emojiMap[iconName] || '🔧'
}

export function getCategoryColor(categoryName: string): string {
  const colorMap: Record<string, string> = {
    '图像生成': 'from-pink-500 to-rose-500',
    '代码生成': 'from-blue-500 to-cyan-500',
    '内容写作': 'from-emerald-500 to-teal-500',
    '视频生成': 'from-purple-500 to-violet-500',
    '语音合成': 'from-orange-500 to-amber-500',
    'AI 搜索': 'from-indigo-500 to-blue-500',
    '生产力工具': 'from-green-500 to-emerald-500',
    'AI 对话': 'from-violet-500 to-purple-500',
  }
  return colorMap[categoryName] || 'from-slate-500 to-slate-600'
}
