import Link from 'next/link';

export default function FeaturesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">智能客服系统功能</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          我们的AI驱动客服系统提供全面的功能，帮助您提升客户满意度并降低运营成本
        </p>
      </div>
      
      {/* 核心功能 */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-10 text-center">核心功能</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {coreFeatures.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* 功能详情 */}
      {featureSections.map((section, index) => (
        <div key={index} className={`py-16 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={index % 2 === 0 ? 'order-1' : 'order-1 md:order-2'}>
                <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                <p className="text-gray-600 mb-6">{section.description}</p>
                <ul className="space-y-4">
                  {section.bullets.map((bullet, i) => (
                    <li key={i} className="flex">
                      <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${index % 2 === 0 ? 'order-2' : 'order-2 md:order-1'} bg-gray-200 h-80 rounded-lg`}>
                {/* 这里可以放置功能的屏幕截图或示意图 */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  功能图片示意
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* 集成功能 */}
      <div className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">支持多种平台集成</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            我们的智能客服系统可以无缝集成到您已有的业务平台和工具中
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {integrations.map((integration, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">{integration.icon}</div>
              <h3 className="font-medium">{integration.name}</h3>
            </div>
          ))}
        </div>
      </div>
      
      {/* 号召行动 */}
      <div className="bg-blue-600 text-white rounded-lg p-8 mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">准备好提升您的客户服务体验了吗？</h2>
        <p className="mb-6">现在注册，获得14天免费试用所有功能的机会</p>
        <Link href="/signup" className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100">
          免费开始
        </Link>
      </div>
    </div>
  );
}

// 核心功能数据
const coreFeatures = [
  {
    icon: '🤖',
    title: '智能对话系统',
    description: '基于先进AI技术的对话系统，能够理解客户意图，提供准确回答。'
  },
  {
    icon: '📚',
    title: '知识库管理',
    description: '轻松创建和管理您的业务知识库，AI会从中学习并回答客户问题。'
  },
  {
    icon: '📊',
    title: '数据分析',
    description: '全面的数据分析工具，帮助您了解客户需求和提升服务质量。'
  },
  {
    icon: '🔌',
    title: '多渠道集成',
    description: '支持网站、微信、钉钉等多种渠道集成，统一管理所有客户对话。'
  },
  {
    icon: '📱',
    title: '移动端支持',
    description: '支持移动端访问和管理，随时随地处理客户咨询。'
  },
  {
    icon: '🔒',
    title: '安全与隐私',
    description: '企业级安全保障，确保您的客户数据安全和隐私。'
  }
];

// 功能详情部分
const featureSections = [
  {
    title: '智能对话系统',
    description: '我们的AI客服系统使用最先进的自然语言处理技术，能够准确理解客户问题并提供有针对性的回答。',
    bullets: [
      '先进的自然语言理解技术',
      '语义分析和意图识别',
      '多轮对话管理',
      '上下文感知和记忆功能',
      '情感分析和情绪识别'
    ]
  },
  {
    title: '知识库管理',
    description: '智能知识库系统让您可以轻松管理和更新客服所需的所有信息，AI会从中学习并回答客户问题。',
    bullets: [
      '直观的知识管理界面',
      '支持多种知识类型（文本、图片、链接等）',
      '自动知识提取和更新',
      '知识库版本控制',
      '知识有效性验证'
    ]
  },
  {
    title: '数据分析与报告',
    description: '全面的数据分析工具，帮助您深入了解客户行为和服务效果，持续优化客户体验。',
    bullets: [
      '客户交互数据分析',
      '问题类型统计和分类',
      '客服效率分析',
      '客户满意度监控',
      '可导出的自定义报告'
    ]
  }
];

// 集成平台
const integrations = [
  { icon: '💬', name: '微信' },
  { icon: '📱', name: '微信小程序' },
  { icon: '🔔', name: '钉钉' },
  { icon: '💼', name: '企业微信' },
  { icon: '🌐', name: 'WordPress' },
  { icon: '🛒', name: '电商平台' },
  { icon: '📞', name: '呼叫中心' },
  { icon: '📮', name: 'CRM系统' }
]; 