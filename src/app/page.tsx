import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      {/* 英雄区域 */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              智能客服解决方案
            </h1>
            <p className="text-xl mb-10">
              基于AI技术，为您的业务提供24/7全天候客户服务支持
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition">
                立即开始免费试用
              </Link>
              <Link href="/demo" className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white/10 transition">
                查看演示
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* 特性展示 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            强大的智能客服功能
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 产品优势 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              为什么选择我们的智能客服
            </h2>
            <p className="text-gray-600">
              我们的AI客服解决方案能够帮助您提升客户满意度，同时降低运营成本
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">24/7全天候服务</h3>
                <p className="text-gray-600">AI客服不休息，为您的客户提供全天候服务支持，无需担心时区或假期问题。</p>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">降低80%客服成本</h3>
                <p className="text-gray-600">通过AI自动化处理常见问题，大幅降低人工客服成本，提高团队效率。</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">提升客户满意度</h3>
                <p className="text-gray-600">快速响应和精准解答，为客户提供更好的服务体验，提升客户满意度。</p>
              </div>
            </div>
            <div className="relative h-80 md:h-96">
              <div className="absolute inset-0 bg-blue-100 rounded-lg"></div>
              {/* 这里可以放置一个产品截图或示意图 */}
            </div>
          </div>
        </div>
      </section>
      
      {/* 号召行动 */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            开始使用 AI 客服，提升您的客户体验
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            立即注册，免费试用我们的智能客服系统
          </p>
          <Link href="/signup" className="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition inline-block">
            免费开始
          </Link>
        </div>
      </section>
    </main>
  );
}

// 特性数据
const features = [
  {
    icon: '💬',
    title: '自动回复',
    description: '基于AI的自动回复系统，智能理解客户问题并提供准确回答。'
  },
  {
    icon: '🔍',
    title: '知识库管理',
    description: '轻松管理您的业务知识库，让AI学习您的产品和服务信息。'
  },
  {
    icon: '📊',
    title: '数据分析',
    description: '深入了解客户交互数据，获取宝贵的业务洞察。'
  }
];
