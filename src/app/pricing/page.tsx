import Link from 'next/link';

// 定义价格方案
const pricingPlans = [
  {
    name: '基础版',
    price: '99',
    description: '适合小型企业或初创团队',
    features: [
      '智能客服机器人',
      '基础知识库管理',
      '每月5000次对话',
      '邮件支持',
      '5个预设回复模板',
      '基础数据分析'
    ],
    cta: '免费试用',
    popular: false
  },
  {
    name: '专业版',
    price: '299',
    description: '适合中型企业和成长中的团队',
    features: [
      '所有基础版功能',
      '高级知识库管理',
      '每月20000次对话',
      '优先邮件支持',
      '20个预设回复模板',
      '高级数据分析',
      '多渠道集成',
      '自定义回复逻辑'
    ],
    cta: '免费试用',
    popular: true
  },
  {
    name: '企业版',
    price: '定制',
    description: '适合大型企业和特殊需求',
    features: [
      '所有专业版功能',
      '无限对话次数',
      '定制化知识库',
      '24/7专属支持',
      '无限回复模板',
      '企业级数据分析',
      '全渠道集成',
      '专属API接口',
      '私有化部署选项',
      'SLA服务保障'
    ],
    cta: '联系我们',
    popular: false
  }
];

export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">透明的价格方案</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          选择最适合您业务需求的方案，所有套餐均提供14天免费试用
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <div 
            key={index}
            className={`border rounded-lg overflow-hidden ${
              plan.popular 
                ? 'border-blue-500 shadow-lg relative' 
                : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="bg-blue-500 text-white text-center py-1 px-4 absolute top-0 right-0 -mt-2 -mr-2 rounded-full text-xs font-semibold">
                最受欢迎
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">¥{plan.price}</span>
                {plan.price !== '定制' && <span className="text-gray-500 ml-2">/月</span>}
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg 
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href={plan.cta === '联系我们' ? '/contact' : '/demo'}
                className={`block w-full text-center py-3 px-4 rounded-lg font-medium ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-blue-600'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">常见问题</h2>
          <p className="text-gray-600">关于我们的价格和服务的一些常见问题</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-2">免费试用包含哪些功能？</h3>
            <p className="text-gray-600">14天免费试用期间，您可以使用所选套餐的全部功能，无需信用卡。</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">如何计算对话次数？</h3>
            <p className="text-gray-600">每次用户发送消息并获得AI回复算作一次对话，无论对话长度如何。</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">可以随时更换套餐吗？</h3>
            <p className="text-gray-600">是的，您可以随时升级或降级套餐，费用会按比例计算。</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">有长期合同折扣吗？</h3>
            <p className="text-gray-600">年付可享受8折优惠，两年付可享受7折优惠。</p>
          </div>
        </div>
      </div>
    </div>
  );
} 
 